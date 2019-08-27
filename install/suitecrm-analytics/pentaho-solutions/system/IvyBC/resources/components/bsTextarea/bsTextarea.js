var BSTextareaComponent = BaseComponent.extend({
	update : function() {
		var myself = this;	
		var ph = $("#" + this.htmlObject);
		
		if(!this.label){
			this.label="";
		}

		var inputHTML = "<textarea placeholder='" + (myself.textAreaPlaceholder?myself.textAreaPlaceholder:"") + "' value='" + (this.parameter?Dashboards.getParameterValue(this.parameter):"") + "' class='form-control' id='"+ this.htmlObject + "_" + this.name + "' rows='"+(myself.numRows?myself.numRows:3)+"' />";
		
		ph.html(inputHTML);
			
		$("body").on('change', ph, function(){
			Dashboards.processChange(myself.name);
		});  

	},
	getValue : function() {
		return $("#"+this.name).val();
	}
}); 
