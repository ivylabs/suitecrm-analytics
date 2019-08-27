

var BSDateRangePickerComponent = BaseComponent.extend({
  value: [],
  displayBSDateFormat: "YYYY-MM-DD",
  displayDateFormat: "yy-mm-dd",
  update: function(){
    var format = (this.dateFormat == undefined || this.dateFormat == null)? 'yy-mm-dd' : this.dateFormat;
    var myself = this;

    var startDate, endDate;

    if(this.startDate == 'TODAY') startDate = new Date();
    else if(this.startDate) startDate = $.datepicker.parseDate( format, this.startDate);

    if(this.endDate == 'TODAY') endDate = new Date();
    else if(this.endDate) endDate = $.datepicker.parseDate( format, this.endDate);

    //ToDo: stretch interval to catch defaultValue?..
    //Dashboards.getParameterValue(this.parameter))
    if(myself.renderMode == "textinput"){
      this.placeholder().html($('<input type="text" id="'+this.htmlObject+'DateRangePicker" style="text-align: center;" class="form-control" value="" />'));
    }else if(myself.renderMode == "embedded"){
      this.placeholder().html($('<span id="'+this.htmlObject+'DateRangePicker" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc">' +
                  '<i class="glyphicon glyphicon-calendar fa fa-calendar"></i>' +
                  '<b class="caret"></b> <span></span>' +
               '</span>'));
    }

    var setDates = [undefined, undefined];
    if(myself.parameter.length>0){
      setDates[0] = moment($.datepicker.parseDate(format, Dashboards.getParameterValue(myself.parameter[0]))).format(myself.displayBSDateFormat);
      Dashboards.setParameter(myself.parameter[0], setDates[0]);
      if(myself.parameter[1]!=undefined){
        setDates[1] = moment($.datepicker.parseDate(format, Dashboards.getParameterValue(myself.parameter[1]))).format(myself.displayBSDateFormat);
        Dashboards.setParameter(myself.parameter[1], setDates[1]);
      }
    }

    
    myself.placeholder("#"+this.htmlObject+'DateRangePicker').daterangepicker({
      singleDatePicker: myself.viewMode == "singleDatePicker",
      startDate: (setDates[0]?setDates[0]:moment()),
      endDate: (setDates[1]?setDates[1]:moment()),
      timePicker: myself.timePicker,
      timePickerIncrement: myself.timePickerIncrement,
      locale: {
        firstDay: myself.firstDay,
      },
      ranges: (myself.showRanges?{
         'Today': [moment(), moment()],
         'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
         'Last 7 Days': [moment().subtract('days', 6), moment()],
         'Last 30 Days': [moment().subtract('days', 29), moment()],
         'This Month': [moment().startOf('month'), moment().endOf('month')],
         'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
      }:undefined),
      format: myself.displayBSDateFormat,
      minDate: startDate,
      maxDate: endDate,
    }, function(start, end, label){
      if(myself.viewMode == "range"){
        $('#'+myself.htmlObject+'DateRangePicker '+(myself.renderMode=="embedded"?"span":"")).html(start.format(myself.displayBSDateFormat) + ' - ' + end.format(myself.displayBSDateFormat));
      }else{
        $('#'+myself.htmlObject+'DateRangePicker '+(myself.renderMode=="embedded"?"span":"")).html(start.format(myself.displayBSDateFormat));
      }

      if(myself.preChange){
        myself.preChange(start.format(myself.displayBSDateFormat), end.format(myself.displayBSDateFormat));
      }

      if(myself.parameter)
      {
        if( myself.parameter.length == 2) Dashboards.setParameter(myself.parameter[1], end.format(myself.displayBSDateFormat));
        if( myself.parameter.length > 0) Dashboards.fireChange(myself.parameter[0], start.format(myself.displayBSDateFormat));
      }

      if(myself.postChange){
        myself.postChange(start.format(myself.displayBSDateFormat), end.format(myself.displayBSDateFormat));
      }
    });

    if(setDates[0] && setDates[1]){
      if(myself.viewMode == "range"){
        $('#'+myself.htmlObject+'DateRangePicker '+(myself.renderMode=="embedded"?"span":"")).html(setDates[0] + ' - ' + setDates[1]);
      }else{
        $('#'+myself.htmlObject+'DateRangePicker '+(myself.renderMode=="embedded"?"span":"")).html(setDates[0]);
      }
    }

    myself._doAutoFocus();
  },
  getValue : function() {
    return this.value[this.name];
  }
});