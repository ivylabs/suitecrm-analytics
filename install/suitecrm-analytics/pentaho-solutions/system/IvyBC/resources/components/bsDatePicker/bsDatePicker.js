

var BSDatePickerComponent = BaseComponent.extend({
  value: [],
  displayBSDateFormat: "yyyy-mm-dd",
  displayDateFormat: "yy-mm-dd",
  update: function(){
    this.dateFormat = (this.dateFormat == undefined || this.dateFormat == null)? 'yy-mm-dd' : this.dateFormat;
    var myself = this;

    var startDate, endDate;

    if(this.startDate == 'TODAY') startDate = new Date();
    else if(this.startDate) startDate = $.datepicker.parseDate( this.dateFormat, this.startDate);

    if(this.endDate == 'TODAY') endDate = new Date();
    else if(this.endDate) endDate = $.datepicker.parseDate( this.dateFormat, this.endDate);

    //ToDo: stretch interval to catch defaultValue?..
    //Dashboards.getParameterValue(this.parameter))
    if(myself.datePickerViewMode == "textinput"){
      this.placeholder().html($('<input type="text" id="'+this.htmlObject+'DatePicker" type="text" class="form-control">'));
    }else if(myself.datePickerViewMode == "range"){
      this.placeholder().html($('<div class="input-daterange input-group" id="'+this.htmlObject+'DatePicker">' +
          '<input type="text" class="input-sm form-control" name="start" />' +
          '<span class="input-group-addon">' + (myself.dateRangeSeparator?myself.dateRangeSeparator:"") + '</span>' +
          '<input type="text" class="input-sm form-control" name="end" />' +
      '</div>'));
    }
    
    myself.placeholder("#"+this.htmlObject+'DatePicker').datepicker({
      format: myself.displayBSDateFormat,
      todayBtn: "linked",
      date: dateValues,
      startDate: startDate,
      endDate: endDate,
      language: myself.datePickerLanguage,
      multidate: false,
      todayHighlight: myself.todayHighlight,
      keyboardNavigation: myself.keyboardNavigation,
      weekStart: myself.weekStart,
      autoclose: myself.autoclose,
      orientation: myself.orientation,
      startView: myself.dateStartViewMode || 0,
      minViewMode: myself.dateMinViewMode || 0
    }).on('changeDate', function(ev, f, r){
        if(myself.datePickerViewMode == "textinput"){
          myself.value[myself.name] = $(this).val();
        }else{
          var dateValues = [];
          for(var i = 0; i < $(this).find("input").length ; i++){
            dateValues.push($($(this).find("input").get(i)).val());
          }
          myself.value[myself.name] = dateValues;
        }
        Dashboards.processChange(myself.name);
    });


    var dateValues = [];
    if(this.parameter != undefined && this.parameter != null){
      var paramVal = Dashboards.getParameterValue(this.parameter);
      if(typeof paramVal == "object"){
        for (var i = 0; i < paramVal.length; i++) {
          dateValues.push( $.datepicker.parseDate( myself.dateFormat, paramVal[i] ) );
        };
      }else{
        dateValues.push( $.datepicker.parseDate( myself.dateFormat, paramVal ) );
      }
      myself.placeholder("#"+this.htmlObject+'DatePicker input, input#'+this.htmlObject+'DatePicker').each(function(index, elem){
        if(dateValues.length>0&&dateValues[index]!=undefined){

          $(elem).val( $.datepicker.formatDate( myself.displayDateFormat, dateValues[index] ) );
          
          if(myself.datePickerViewMode == "textinput"){
            myself.placeholder("#"+myself.htmlObject+'DatePicker').data().datepicker.setDate(dateValues[index]);
          }else{
            myself.placeholder("#"+myself.htmlObject+'DatePicker').data().datepicker.pickers[index].setDate(dateValues[index]);
          }

        }
      });

      if(myself.datePickerViewMode != "textinput"){
        myself.placeholder("#"+this.htmlObject+'DatePicker').data().datepicker.updateDates();
      }
      myself.placeholder("#"+this.htmlObject+'DatePicker').datepicker("update");
    }


    myself._doAutoFocus();
  },
  getValue : function() {
    return this.value[this.name];
  }
});
