var overrideProps = [];

function reRenderCCC(){ 
			for(var z = 0; z < Dashboards.components.length; z++){
		    	if(Dashboards.components[z].type.indexOf("ccc")!=-1 && Dashboards.components[z].chart != null){
		    		Dashboards.components[z].chart.options.width=$("#"+Dashboards.components[z].htmlObject).width();
		    		Dashboards.components[z].chart.render(true,true,false);
		    	}
		    }
	    }


$(function() {

	    
	    var timer;
	    $(window).bind('resize', function(){
	       timer && clearTimeout(timer);
	       timer = setTimeout(reRenderCCC, 100);
	    });


	
	for(var i = 0; i < overrideProps.length; i++){
		for(var z = 0; z < Dashboards.components.length; z++){
			var check = false;
			if(overrideProps[i].genericType!=undefined){
				check=Dashboards.components[z].type.indexOf(overrideProps[i].genericType)!=-1;
			}else{
				check=Dashboards.components[z].type==overrideProps[i].nameType;
			}
			if(check){
				for (var key in overrideProps[i]) {
					if(key=="genericType"||key=="nameType"){
						continue;
					}
					var prop = Dashboards.components[z].chartDefinition[key];
					if( prop != undefined && prop.length != undefined && overrideProps[i][key] != undefined && overrideProps[i][key].length > 0 && typeof overrideProps[i][key][0] == "object"){
						prop = Dashboards.propertiesArrayToObject( prop );
						Dashboards.components[z].chartDefinition[key] = Dashboards.objectToPropertiesArray( $.extend( {}, Dashboards.propertiesArrayToObject(overrideProps[i][key]), prop) );
					}else{
						if( prop != undefined && typeof prop == "object" && typeof overrideProps[i][key] == "object" && typeof overrideProps[i][key][0] == "object"){
							Dashboards.components[z].chartDefinition[key] = $.extend( {}, overrideProps[i][key], prop);
						}else{
							Dashboards.components[z].chartDefinition[key] = overrideProps[i][key];
						}
					}
				}
			}
		}
	}

});

