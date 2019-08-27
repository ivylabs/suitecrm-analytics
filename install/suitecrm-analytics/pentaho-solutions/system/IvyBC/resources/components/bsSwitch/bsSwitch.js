var BSSwitchComponent = BaseComponent.extend({
  update : function() {
    var myself = this;
    
    var ph = $("#" + this.htmlObject);
    var currentVal = Dashboards.getParameterValue(this.parameter);
    currentVal = (typeof currentVal == 'function') ? currentVal() : currentVal;
    currentVal = currentVal != undefined? (typeof currentVal === "string"?eval(currentVal):currentVal) : false;

    var s = $('<input type="checkbox" name="'+this.name+'" id="'+this.htmlObject+'Switch"/>');
    if(currentVal){
      s.attr("checked","checked");
    }
    ph.append(s);
    ph.find("#"+this.htmlObject+'Switch').bootstrapSwitch({
      size: this.switchSize || "normal",
      animate: this.switchAnimate,
      onColor: this.switchOnColor || "default",
      offColor: this.switchOffColor || "default",
      onText: this.switchOnText || "ON",
      offText: this.switchOffText || "OFF",
      labelText: this.switchLableText || "&nbsp;",
      disabled: this.switchDisable,
      onSwitchChange: function(event, state) {
        myself.switchChange(myself.name);
      }
    });

  },
  switchChange: function(name){
    setTimeout(function(){
      Dashboards.processChange(name)
    },1);
  },
  getValue : function() {
    return $("#" + this.htmlObject + " #" + this.htmlObject + "Switch").is(':checked');
  }
}); 