var BSSliderComponent = BaseComponent.extend({
  update : function() {
    var myself = this;
    
    myself.ph = $("#" + this.htmlObject).empty();

    var sliderValue = 0;

    if(this.parameter != undefined && this.parameter != null){
      var paramVal = Dashboards.getParameterValue(this.parameter);
      if(myself.sliderType==="single"){
        sliderValue = paramVal;
      }else{
        sliderValue = [paramVal[0], paramVal[1]];
      }
    }
    
    var sliderData = {};
    
    if(myself.queryDefinition && Dashboards.objectToPropertiesArray(this.queryDefinition).length > 0){

        // create a query object
        var query = new Query(myself.queryDefinition);
        
        // fire the query objects fetchdata method
        // no params and no callback
        query.fetchData(myself.parameters, function(values) {

            sliderData = values;
            
        });

        if(sliderData.resultset.length>0 && sliderData.resultset[0].length>0){ sliderValue = sliderData.resultset[0][0]; }
        if(myself.sliderType!=="single"){
          if(sliderData.resultset.length>0 && sliderData.resultset[0].length>1){ sliderValue = sliderData.resultset[0][1]; }
        }
    }


    myself.ph.append('<input class="form-control" type="text" style="width:'+myself.ph.width()+'px"/>');
    

    var opt = {
      min: parseInt(myself.minValueSlider),
      max: parseInt(myself.maxValueSlider),
      step: parseInt(myself.stepValueSlider),
      orientation: myself.orientationSlider,
      selection: myself.selectionSlider,
      tooltip: myself.tooltipSlider,
      handle: myself.handleSlider,
	  value: sliderValue
    };

    if(myself.formaterFunction != undefined){
      opt.formater = myself.formaterFunction;
    }


    var extension = {};
    if(myself.extensionPoints != undefined && myself.extensionPoints[0] != undefined){
      for(var i = 0; i < myself.extensionPoints.length; i++){
        extension[myself.extensionPoints[i][0]] = typeof myself.extensionPoints[i][1] === 'function'?myself.extensionPoints[i][1]():myself.extensionPoints[i][1];
      }
    }
    
    opt = $.extend({}, opt, extension);

    myself.s = myself.ph.find('input').slider(opt).on('slideStop', function(ev){
      Dashboards.processChange(myself.name);
    });

    // Work around for responsive purposes
    myself.reRenderSlider = function (){ 
        myself.update();
    }

    var timer;
    $(window).bind('resize', function(){
     timer && clearTimeout(timer);
     timer = setTimeout(myself.reRenderSlider, 150);
    });

  },
  getValue : function() {
    return this.s.slider('getValue');
  }
}); 