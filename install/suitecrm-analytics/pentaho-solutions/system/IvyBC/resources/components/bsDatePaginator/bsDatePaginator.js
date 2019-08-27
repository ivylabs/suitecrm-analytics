

var BSDatePaginatorComponent = BaseComponent.extend({
  value: [],
  datePag: {},
  update: function(){
    this.dateFormat = (this.dateFormat == undefined || this.dateFormat == null)? 'yy-mm-dd' : this.dateFormat;
    var myself = this;
    
    this.datePag.showOffDays = myself.showOffDays;
    this.datePag.highlightSelectedDate = myself.highlightSelectedDate;
    this.datePag.offDays = myself.offDays||"Sat,Sun";
    this.datePag.showCalendar = myself.showCalendar;
    this.datePag.size = myself.datePaginatorSize||"normal";
    this.datePag.showStartOfWeek = myself.datePaginatorShowStartOfWeek;
    this.datePag.startOfWeek = myself.datePaginatorStartOfWeek||"Mon";
    this.datePag.squareEdges = myself.squareEdges;
    this.datePag.text = myself.datePaginatorText;
    this.datePag.textSelected = myself.datePaginatorTextSelected;

    if(myself.startDate != undefined && myself.startDate != ""){
      var startDate;
      if(this.startDate == 'TODAY') startDate = new Date();
      else if(this.startDate) startDate = $.datepicker.parseDate( this.dateFormat, this.startDate);
      myself.datePag.startDate = $.datepicker.formatDate("yy-mm-dd", startDate);
    }

    if(myself.endDate != undefined && myself.endDate != ""){
      var endDate;
      if(this.endDate == 'TODAY') endDate = new Date();
      else if(this.endDate) endDate = $.datepicker.parseDate( this.dateFormat, this.endDate);
      myself.datePag.endDate = $.datepicker.formatDate("yy-mm-dd", endDate);
    }

    myself.datePag.onSelectedDateChanged = function(event, date) {
        myself.value[myself.name] = $.datepicker.formatDate(myself.dateFormat, date.toDate());
        Dashboards.processChange(myself.name);
    };

    $("#"+this.htmlObject).datepaginator(myself.datePag);

    if(this.parameter != undefined && this.parameter != null){
      var paramVal = Dashboards.getParameterValue(this.parameter);
      var paramDate = $.datepicker.parseDate( myself.dateFormat, paramVal );
      $("#"+this.htmlObject).datepaginator('setSelectedDate', $.datepicker.formatDate("yy-mm-dd", paramDate));
    }
    
  },
  getValue : function() {
    return this.value[this.name];
  }
});