var BSCheckboxButtonComponent = InputBaseComponent.extend({
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
      if ((i == 0 && !hasCurrentVal && this.defaultIfEmpty) ||
        (hasCurrentVal && isSelected)) {
          checked += " checked";
      }

      var cssClass = "checkbox";
      if("horizontal" === this.alignment){
        cssClass += " checkbox-inline";
      }
      if(this.checkboxButtonType){
        cssClass += " " + this.checkboxButtonType;
      }
      if(this.checkboxCircle){
        cssClass += " checkbox-circle";
      }
      var checkDisabled="";
      if(this.checkboxButtonDisabled){
        checkDisabled = " disabled='disabled' ";
      }

  		selectHTML.find(".controls")
  			.append('<div class="'+cssClass+'"><input '+checkDisabled+' type="checkbox" id="'+this.htmlObject+'-checkbox-'+i+'" class="' + this.name + '" name="' + this.name + '" value="' + myArray[i][vid] + '" ' + checked +
          ' ><label for="'+this.htmlObject+'-checkbox-'+i+'">' + myArray[i][1] + '</label></div>');
    }

    this.placeholder().empty().append(selectHTML);
    this.placeholder().find(".controls input[type='checkbox']").click(function(){
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
      var a = new Array()
      this.placeholder("."+this.name + ":checked").each(function(i,val){
        a.push($(this).val());
      });
      return a;
    }
  }
});
