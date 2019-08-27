
var BSSelectBaseComponent = InputBaseComponent.extend({
	visible: false,

	draw: function (myArray) {
		var myself = this;
		var $htmlObject = $("#"+this.htmlObject);
		this.buttonSize = this.buttonSize||"";
		var buttonBlock = this.buttonBlock ? "btn-block" : "";

		var firstVal,
		currentVal = Dashboards.ev(Dashboards.getParameterValue(this.parameter)),
		currentIsValid = false;

		var hasCurrentVal = currentVal != null; //typeof currentVal != undefined;
		//var vid = this.valueAsId == false ? false : true;
		var vid = !!this.valueAsId;
		var hasValueSelected = false;
		var isSelected = false;

		var currentValArray = [];
		if(currentVal instanceof Array || (currentVal != null && typeof(currentVal) == "object" && currentVal.join)) {
			currentValArray = currentVal;
		} else if(typeof(currentVal) == "string"){
			currentValArray = currentVal.split("|");
		}

    var multiSel = "";
    if(myself.multipleSelectMode){
      multiSel="multiple";
    }
    var maxMultiSelectItens="";
    if(myself.maxMultiSelect && myself.maxMultiSelect>0){
      maxMultiSelectItens="data-max-options='"+myself.maxMultiSelect+"'";
    }
    var countFormatText="";
    if(myself.multipleSelectTextFormat){
      countFormatText="data-selected-text-format='count";
      if(myself.maxMultiSelectTextFormat && myself.maxMultiSelectTextFormat>0){
        countFormatText+=">"+myself.maxMultiSelectTextFormat+"'";
      }else{
        countFormatText+="'";
      }
    }
    var multiSelectTitle ="";
    if(myself.multiSelectTitle){
      multiSelectTitle="title='"+myself.multiSelectTitle+"'";
    }
    var styleClasses="";
    if(myself.showTickIcon){
      styleClasses+=" show-tick";
    }
    if(myself.showMenuArrow){
      styleClasses+=" show-menu-arrow";
    }

		selectHTML = "<select class='selectpicker "+styleClasses+"' data-live-search='"+myself.buttonLiveSearch+"' "+multiSel+" "+maxMultiSelectItens+" "+countFormatText+" "+multiSelectTitle+">";


		var values = {};
		for (var i = 0, len = myArray.length; i < len; i++) {
			if (myArray[i] != null && myArray[i].length > 0) {
				var ivid = vid || myArray[i][0] == null;
				var value, label;
				if (myArray[i].length > 1) {
					value = "" + myArray[i][ivid ? 1 : 0];
					label = "" + myArray[i][1];
					values[value] = label;
				} else {
					value = "" + myArray[i][0];
					label = "" + myArray[i][0];
					values[value] = label;
				}
				if (i == 0) {
					firstVal = value;
					firstLabel = label;
				}
				if (jQuery.inArray(""+ value, currentValArray.map(function (v) {return "" + v;})) > -1) {
					currentIsValid = true;
				}else{
					currentIsValid = false;
				}
				selectHTML += "<option " + (currentIsValid?"selected":"") + " value='" + Dashboards.escapeHtml(value) + "'>" + Dashboards.escapeHtml(label) + "</option>";
			}
		}

		selectHTML += "</select>";





		$htmlObject.html(selectHTML);

		$htmlObject.find("select.selectpicker").selectpicker({
			style: myself.buttonType + " " + myself.buttonSize + " " + buttonBlock,
			size: myself.itemsSize?myself.itemsSize.toLowerCase():"false"
		});
		if(myself.multipleSelectMode){
			$htmlObject.find(".selectpicker").selectpicker('val', currentValArray);
		}else{
			$htmlObject.find(".selectpicker").selectpicker('val', currentValArray[0]);
		}
	  	$htmlObject.find(".selectpicker").selectpicker('render');
		$htmlObject.find("div.btn-group.bootstrap-select").addClass(buttonBlock);
		$htmlObject.find("button.selectpicker .filter-option").removeClass("pull-left");
		if(this.prependIcon){
			$htmlObject.find("button.selectpicker .filter-option").before(" <i class='glyphicon "+this.buttonIcon+"'></i> ");
		}else{
			$htmlObject.find("button.selectpicker .filter-option").after(" <i class='glyphicon "+this.buttonIcon+"'></i> ");
		}


		var currentParameter = Dashboards.getParameterValue(this.parameter);

		if (currentParameter) {
			// set the default value to the first item in the data source. This needs to be changed to use the value of the parameter
			$("#" + this.htmlObject+" .btn:first-child .select-label").html( (values[currentParameter]?values[currentParameter]:firstLabel));
			$("#" + this.htmlObject+" .btn:first-child").attr('#' + (values[currentParameter]?currentParameter:firstVal));
		} else {
			var replacementValue = firstVal;
			var replacementLabel = firstLabel;
			$("#" + this.htmlObject+" .btn:first-child").attr('href', '#' + replacementValue);
			$("#" + this.htmlObject+" .btn:first-child .select-label").html(replacementLabel);

			Dashboards.fireChange(this.parameter,firstVal);

		}


		var myself = this;

    $htmlObject.find("select.selectpicker").change(function(e){
	  	$htmlObject.find(".selectpicker").selectpicker('render');
      var objs = $htmlObject.find("select.selectpicker option:selected");
      // var currVal = $($htmlObject.find("select.selectpicker option").get($(this).parent().attr("rel"))).val();

      var v = "";
      if(myself.multipleSelectMode || objs.size()>1){
        v = [];
        for(i=0;i<objs.size();i++){
          v.push($(objs[i]).val());
        }
        /*if(v.indexOf(currVal)>=0){
          v.splice(v.indexOf(currVal),1);
        }else{
          v.push(currVal);
        }*/
      }else if(objs.size()==0){
        return;
      }else{
        v = $(objs[0]).val();
        /*if(v==currVal){
          v="";
          return;
        }else{
          v=[v,currVal];
        }*/
      }


      myself.setValue(v);
      Dashboards.processChange(myself.name);

      e.preventDefault();
    });

	},

	_currentValue: undefined,

        setValue: function(v){
                this._currentValue = v;
        },
        getValue : function(){
                return this._currentValue;
        }

});
