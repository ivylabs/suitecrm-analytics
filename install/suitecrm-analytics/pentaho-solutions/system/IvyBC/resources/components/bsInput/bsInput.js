var BSInputComponent = BaseComponent.extend({
	update : function() {
		var myself = this;	
		var ph = $("#" + this.htmlObject);
		
		if(!this.label){
			this.label="";
		}

		var inputHTML = "<input type='" + this.inputType + "' value='" + (this.parameter?Dashboards.getParameterValue(this.parameter):"") + "' class='form-control " 
			+ (this.inputSize===undefined?"":this.inputSize) + "' id='" + this.htmlObject + "_" + this.name + "' placeholder='" + (myself.textInputPlaceholder?myself.textInputPlaceholder:"") + "'>";
		
		ph.html(inputHTML);

		$("#"+this.htmlObject+" input").on("change", function(){		
			Dashboards.processChange(myself.name);
		});  

	},
	getValue : function() {
		return $("#"+this.htmlObject+" input").val();
	}
}); 
