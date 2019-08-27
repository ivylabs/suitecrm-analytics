var BSButtonGroupComponent = InputBaseComponent.extend({
  indexes: {},
  draw: function(myArray){
	var myself = this;
	var $htmlObject = $("#"+this.htmlObject);

    //default
    var currentVal = Dashboards.getParameterValue(this.parameter);
    currentVal = (typeof currentVal == 'function') ? currentVal() : currentVal;

    var valIdx = this.valueAsId ? 1 : 0;
    var lblIdx = 1;
    var firstVal = currentVal;
    if (this.buttonMultiSelect == undefined) this.buttonMultiSelect = false;

    if(this.buttonGroupBlock){
      myself.buttonGroupBlock = "btn-block";
    } else {
      myself.buttonGroupBlock = "";
    }
    if(this.buttonGroupJustified){
      myself.buttonGroupJustified = "btn-group-justified";
    } else {
      myself.buttonGroupJustified = "";
    }


   	var buttonGroupHTML = $('<div class="' + myself.buttonGroupJustified + ' ' + this.buttonOrientation + ' ' + myself.buttonGroupBlock + ' ' + ((this.buttonGroupSize!=undefined&&this.buttonGroupSize=="Default")?"":this.buttonGroupSize) + '"></div>');
    for(var i = 0; i < myArray.length; i++) {
  		var value = myArray[i][valIdx],
  			label = myArray[i][lblIdx];

  		if(!currentVal && i == 0){
  			firstVal = value;
  		}

      var classSize = "";
      if(myself.buttonGroupBlock && myself.buttonGroupBlock == "btn-block" && myself.buttonSizeClasses!=undefined && myself.buttonSizeClasses.length>=i){
        classSize = myself.buttonSizeClasses[i];
      }

  		var buttonG = $('<button type="button" class="btn ' + classSize + ' ' + this.buttonType + '" data-value="' + value + '">' + label + '</button>');
  		if(currentVal && currentVal == value){
  			buttonG.addClass("active");
  		}

  		(function(index, value){
  			buttonG.click(function(event){
  				BSButtonGroupComponent.prototype.clickButton(event, myself, index, value);
  			});
  		}(i, value));

  		buttonGroupHTML.append(buttonG);
    }

    $htmlObject.html(buttonGroupHTML);

 	Dashboards.fireChange(this.parameter, (this.buttonMultiSelect) ? [firstVal] : firstVal);
  },
  clickButton: function(event, comp, index, value){
    var buttons = $("#" + comp.htmlObject + " button");

    if (comp.buttonMultiSelect) {//toggle button
      if (this.indexes[comp.name] == undefined){
      	this.indexes[comp.name] = [];
      } else if(!$.isArray(this.indexes[comp.name])){
      	this.indexes[comp.name] = [this.indexes[comp.name]];
      }

      var disable = false;
      for (var i = 0; i < this.indexes[comp.name].length; ++i) {
        if (this.indexes[comp.name][i] == value) {
          disable = true;
          this.indexes[comp.name].splice(i, 1);
          break;
        }
      }
      if (!disable){
        this.indexes[comp.name].push(value);
      }
    }else {
      this.indexes[comp.name] = value;
    }
    if(typeof comp.expression === 'function'){
      comp.expression(event, comp);
    }
    this.activeButtons(comp);
    Dashboards.processChange(comp.name);
  },
  activeButtons: function(comp){
	var myself = this;
  	$("#"+comp.htmlObject + ' button').removeClass("active");
  	$("#"+comp.htmlObject + ' button').each(function(index, value){
  		if(comp.buttonMultiSelect && myself.indexes[comp.name].indexOf($(value).attr("data-value"))!=-1){
  			$(this).addClass("active");
  		}else if(!comp.buttonMultiSelect && $(value).attr("data-value") == myself.indexes[comp.name]){
  			$(this).addClass("active");
  		}
  	});
  },
  getValue: function(){
    if(this.buttonMultiSelect){
      var indexes = BSButtonGroupComponent.prototype.getSelectedIndex(this.name);
      var a = new Array();
      // if it is not an array, handle that too
      if (indexes.length == undefined) {
        a.push(indexes);
      } else {
        for(var i=0; i < indexes.length; i++){
          a.push(indexes[i]);
        }
      }
      return a;
    }
    else {
      return BSButtonGroupComponent.prototype.getSelectedIndex(this.name);
    }
  },
  getSelectedIndex: function(name){
    return this.indexes[name];
  }

});
