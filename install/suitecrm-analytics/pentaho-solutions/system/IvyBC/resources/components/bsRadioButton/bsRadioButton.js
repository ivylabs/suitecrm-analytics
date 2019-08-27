var BSRadioButtonComponent = InputBaseComponent.extend({
  draw: function(myArray){

	  var myself = this;

    var currentVal = Dashboards.getParameterValue(this.parameter);
    currentVal = (typeof currentVal == 'function') ? currentVal() : currentVal;

    var isSelected = false;

    var currentValArray = [];
    if(currentVal instanceof Array || (typeof(currentVal) == "object" && currentVal.join)) {
      currentValArray = currentVal;
    } else if(typeof(currentVal) == "string"){
      currentValArray = currentVal.split("|");
    }


    var vid = this.valueAsId==false?0:1;
    var hasCurrentVal = false;
      outer:
      for(var i = 0; i < currentValArray.length; i++){
        for(var y = 0; y < myArray.length; y++) {
          if (currentValArray[i] == myArray[y][vid]) {
            hasCurrentVal = true;
            break outer;
          }
        }
      }

    if(!hasCurrentVal && this.defaultIfEmpty){
      currentValArray = [myArray[0][vid]];

      this.currentVal = currentValArray;
      Dashboards.setParameter(this.parameter,currentValArray);
      Dashboards.processChange(this.name);
    }


  	var selectHTML = $('<div class="control-group"></div>');
  	if(this.label != null && this.label !== ""){
  		selectHTML.append('<label class="control-label">' + this.label + '</label>');
  	}
  	selectHTML.append('<div class="controls"></div>');


    for (var i = 0, len = myArray.length; i < len; i++) {
  		isSelected = false;
  		for (var j = 0, valLength = currentValArray.length; j < valLength; j++) {
  			isSelected = currentValArray[j] == myArray[i][vid];
  			if(isSelected) {
  			  break;
  			}
  		}

      var checked = "";
  	  if ((i == 0 && !hasCurrentVal) ||
  	    (hasCurrentVal && (myArray[i][vid] == currentVal ))) {
  	    checked += " checked";
  	  }

      var cssClass = "radio";
      if("horizontal" === this.alignment){
        cssClass += " radio-inline";
      }
      if(this.radioButtonType){
        cssClass += " " + this.radioButtonType;
      }
      var radioDisabled="";
      if(this.radioButtonDisabled){
        radioDisabled = " disabled='disabled' ";
      }

      selectHTML.find(".controls")
        .append('<div class="'+cssClass+'"><input '+radioDisabled+' type="radio" id="'+this.htmlObject+'-radio-'+i+'" class="' + this.name + '" name="' + this.name + '" value="' + myArray[i][vid] + '" ' + checked +
          ' ><label for="'+this.htmlObject+'-radio-'+i+'">' + myArray[i][1] + '</label></div>');
    }

    this.placeholder().append(selectHTML);
    this.placeholder().find(".controls input[type='radio']").click(function(){
		    myself.callAjaxAfterRender(myself.name);
    });
    this.currentVal = null;
    this._doAutoFocus();
  },
  callAjaxAfterRender: function(name){
    setTimeout(function(){
      Dashboards.processChange(name)
    },1);
  },
  getValue : function() {
    if (this.currentVal != 'undefined' && this.currentVal != null) {
      return this.currentVal;
    } else {
      return this.placeholder("."+this.name+":checked").val();
    }
  }
});
