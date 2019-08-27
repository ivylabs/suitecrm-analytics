var BSButtonComponent = BaseComponent.extend({
	update : function() {
		var myself = this;

		var ph = $("#" + this.htmlObject);

		var innerButtonHTML = "";

		if(!this.label){
			this.label = "";
		}

		if(this.buttonIcon && this.buttonIcon != "none" && this){
			if(this.prependIcon){
				innerButtonHTML += "<i class='glyphicon "+this.buttonIcon+"'></i> " + this.label;
			}else{
				innerButtonHTML += this.label + " <i class='glyphicon "+this.buttonIcon+"'></i>";
			}
		} else {
			innerButtonHTML += this.label;
		}

		if(this.buttonBlock){
			myself.buttonBlock = "btn-block";
		} else {
			myself.buttonBlock = "";
		}

		var btnDisabled = "";
		if(myself.buttonDisabled){
			btnDisabled = " disabled='disabled'"
		}


		var b = $("<button class='btn "+this.buttonType+" " + (this.buttonSize===undefined?"":this.buttonSize) + " " + myself.buttonBlock + "' type='button' "+btnDisabled+"/>")
		.html(innerButtonHTML).unbind("click");
		if (typeof myself.expression === 'function'){
			b.bind("click", function(event){
				return myself.expression.apply(event, myself,arguments);
			});
		}


		ph.html(b);
	}
});
