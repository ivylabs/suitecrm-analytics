

var BSGrowlComponent = BaseComponent.extend({

  update: function() {
    this.clear();
    var myself = this;
    this.growlOptions ={
    	type: this.growlType||"info",
    	position:{
	        from: this.growlPositionFrom||"top",
	        align: this.growlPositionAlign||"right"
    	},
    	delay: parseInt(this.growlDelay||5e3),
    	offset: 20,
    	z_index: 1031,
		  slideOutOnClose: true,
    	pause_on_mouseover: this.growlPauseOnMouseOver?true:false,
    	allow_dismiss: this.growlAllowDismiss||true,
    };

    this.growMsg = {
		icon: this.growlIcon||"",
		title: this.growlTitle||"",
		message: this.growlMessage||""
    };

    if(!this.growlExecuteManually){
      this.execute();
    }

  },

  execute: function(){
    if(Dashboards.debug!=1)Dashboards.log("Final Growl Message Options: " + JSON.stringify(this.growMsg, function(key, val) { if (typeof val === 'function') {return val.toString();}return val;})||"<no properties>");
    if(Dashboards.debug!=1)Dashboards.log("Final Growl Options: " + JSON.stringify(this.growlOptions, function(key, val) { if (typeof val === 'function') {return val.toString();}return val;})||"<no properties>");
  	var r = $.growl(this.growMsg, this.growlOptions);
  }
	
});
