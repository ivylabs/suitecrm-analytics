

var BSTourComponent = BaseComponent.extend({

  update: function() {
    var myself = this;

    var tourConfObj = this.tourDefinition;
    tourConfObj.name = this.name;
    tourConfObj.container = "body";
    tourConfObj.storage = myself.storageTour?window.localStorage:false;
    tourConfObj.debug = Dashboards.debug!=1;
    tourConfObj.orphan = true;
    tourConfObj.steps = [];
    tourConfObj.duration = tourConfObj.duration==undefined?false:eval(tourConfObj.duration);

    for (var i = 0; i < myself.tourStepsDefinition.stepElements.length; i++) {
      var stepObj = {};
      stepObj.element = this._giveObjValue(myself.tourStepsDefinition.stepElements,i);
      stepObj.title = this._giveObjValue(myself.tourStepsDefinition.stepTitles,i);
      stepObj.content = this._giveObjValue(myself.tourStepsDefinition.stepContents,i);
      if(myself.tourStepsDefinition.stepPositions.length > 0){
        stepObj.placement = this._giveObjValue(myself.tourStepsDefinition.stepPositions,i)||'bottom';
      }
      if(myself.tourStepsDefinition.stepBackdrops.length > 0){
        stepObj.backdrop = this._giveObjValue(myself.tourStepsDefinition.stepBackdrops,i) == 'true';
      }

      var stepExtension = {};
      if(myself.stepExtensionProperties != undefined && myself.stepExtensionProperties[0] != undefined){
        for(var x = 0; x < myself.stepExtensionProperties.length; x++){
          stepExtension[myself.stepExtensionProperties[x][0]] = typeof myself.stepExtensionProperties[x][1] === 'function'?myself.stepExtensionProperties[x][1]():myself.stepExtensionProperties[x][1];
        }
      }

      stepObj = $.extend({}, stepObj, stepExtension);
      
      tourConfObj.steps.push(stepObj);
    };

    var extension = {};
    if(myself.extensionProperties != undefined && myself.extensionProperties[0] != undefined){
      for(var i = 0; i < myself.extensionProperties.length; i++){
        extension[myself.extensionProperties[i][0]] = typeof myself.extensionProperties[i][1] === 'function'?myself.extensionProperties[i][1]():myself.extensionProperties[i][1];
      }
    }

    tourConfObj = $.extend({}, tourConfObj, extension);

    if(Dashboards.debug!=1)Dashboards.log("Final Tour properties: " + JSON.stringify(tourConfObj, function(key, val) { if (typeof val === 'function') {return val.toString();}return val;})||"<no properties>");
    this.tourObj = new Tour(tourConfObj).init();

    if(!this.executeManually){
      this.tourObj.restart();
    }

  },

  _giveObjValue: function(array, index){
    for (var i = 0; i < array.length; i++) {
      if(array[i][0]==index){
        return array[i][1]||"";
      }
    };
    return undefined;
  }
	
});
