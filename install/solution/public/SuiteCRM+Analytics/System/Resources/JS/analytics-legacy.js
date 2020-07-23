var analytics = {}


    analytics.objs = {
        
        projectName:"SuiteCRM",
        projectRootDir:"suitecrm"
        
    }

    analytics.functions = {
        
        resizeChart:function(dash){ 
            for(z = 0; z < dash.components.length; z++){
                if(dash.components[z].type.indexOf("ccc")!=-1 && dash.components[z].chart !== null){
                    dash.components[z].chart.options.width=$("#"+dash.components[z].htmlObject).width();
                    dash.components[z].chart.render(true,true,false);
                }
            }
        },
        
        sayHello:function(name){
            alert("Hello "+name);
        },
        
        sayHelloUser:function(dash){
            alert("hello "+dash.context.user);
        },
        
        printHello:function(name){
            return "Hello"+name;
        },
        
        sampleDotExtensionPointFunction:function(dash,cd){
            cd.dot_visible = function(scene){
                if(scene.getCategory == "TEST"){
                    return true;
                } else {
                    return false;
                }
            }
        },
        
        sampleBarExtensionPointFunction:function(dash,cd){
            cd.bar_fillStyle = function(scene){
                if(scene.getCategory() == "Email"){
                    return "blue";
                } else {
                    return "grey"
                }
            }
        },
        
        customLineWidth:function(dash,cd){
          
          cd.line_lineWidth = function(scene){
              return 10;  
          }
        },
        
        
        // RETHINK THIS!
        calculatePerformanceWidget:function(dash,data,widgetName){
            
            var CURRENT = data.resultset[0][0];
            var PREVIOUS = data.resultset[0][1];
            var PERCENTAGE;
            var CARET;
            var TEXT_COLOR;
            var widgetBackgroundName;
            
            if(CURRENT == PREVIOUS){
                PERCENTAGE = 0;
                CARET = 'left';
                TEXT_COLOR = 'yellow';
            } else if(CURRENT > PREVIOUS){
                PERCENTAGE = (PREVIOUS / CURRENT)*100;
                CARET = 'up';
                TEXT_COLOR = 'green';
            } else {
                PERCENTAGE = (CURRENT / PREVIOUS)*100;
                CARET = 'down';
                TEXT_COLOR = 'red';
            }
            
            widgetBackgroundName = widgetName.replace(/\s/g, '')
            
            
            
            $('#'+widgetBackgroundName+'Anchor').html(CURRENT+" "+widgetName);
            //$('#NewLeadsAnchor').html(CURRENT+" "+widgetName);
            $('#Previous'+widgetBackgroundName+'Anchor').html(" <i class='fa fa-caret-"+CARET+"'></i> "+Dashboards.numberFormat(PERCENTAGE,'0')+"%");
            
            $('#Previous'+widgetBackgroundName+'Anchor').addClass('text-'+TEXT_COLOR);
        }
        
    }
    
    analytics.opts = {
        
        charts:{
            
            // Default Chart Properties
            defaultChartComp:{
                colors: ["#f08377","#D1718C","#A36894","#71618D","#475776","#2F4858"],
                plotFrameVisible:false,
                baseAxisGrid:false,
                orthoAxisGrid:false,
                animate:false
            },
            
            // Default Line Chart Properties
            defaultLineChartComp: {
                dotsVisible: true,
                line_lineWidth:2,
                dot_lineWidth:2,
                dot_fillStyle: "#fff",
                line_strokeDasharray: "none"
            },
            
            // Default Pie Chart Properties
            defaultPieChartComp: {
                slice_innerRadiusEx:'60%'
            },
            
            overviewBarWidget:{
                
                contentPaddings:{left: 0, right: 20},
                contentMargins:0,
                
                legend:false,
                titleSize:0,
                
                bar_fillStyle: function(scene) {
                    var color = this.delegate();
                    if(color) {
                        var activeScene = scene.active();
                        if(activeScene && 
                           scene.getCategory() === activeScene.getCategory()) {
                            color = color.brighter(1);
                        }
                    }
                    return this.finished(color);
                }
            },
            
            overviewPieWidget:{
                
                contentPaddings:10,
                contentMargins:0,
                legend:false,
                titleSize:0,
                
                colors: ["#f08377","#DDDDDD"],
                
                slice_innerRadiusEx:'60%',
                
                valuesVisible: true,
                valuesLabelStyle: 'inside',
                valuesFont: '30px sans-serif',
                valuesMask: '{value.percent}',
                
                label_visible: function() { return !this.index; },
                label_left: null,
                label_top: null,
                label_textAngle: 0,
                label_textAlign: 'center',
                label_textBaseline: 'middle',
                label_strokeStyle: 'black'
            },
            
            overviewLineWidget:{
                
                contentPaddings:10,
                contentMargins:0,
                margins:0,
                baseAxisVisible:false,
                orthoAxisVisible:false,
                legend:false,
                dotsVisible:true,
                titleSize:0,
                tooltipFormat:function(scene){
                    var period = scene.atoms.category.value;
                    var value = scene.vars.value.value;
                    
                    var html = "<div>"+value+" Leads -  "+period+"</div>";
                
                    return html;
                },
                
                dot_fillStyle:function(scene){
                    
                    var color = "#ffffff";
                    
                    if(!scene.nextSibling) {
                        
                        if(scene.parent.firstAtoms.value.rawValue > scene.firstAtoms.value.rawValue) {
                            color = "#FF0000";
                        } else {
                            color = "#00a65a";
                            
                        }
                    }
                    
                    return color;
                },
                
                dot_visible:function(scene){
                    
                    var renderDot = false;
                    
                    if(!scene.nextSibling) {
                        renderDot = true;
                    }
                    
                    return renderDot;
                },
                
                dot_lineWidth:5,
                dot_strokeStyle: "#FFF",
                line_lineWidth:2,
                dot_shapeRadius:5,
                line_strokeDasharray: "none"
                //line_strokeStyle: "#6e97aa"
            }
            
        },
        
        tables:{
            overviewTable:{
                info:false,
                paginate:true,
                filter:false,
                lengthChange:false,
                sort:false
                //colHeaders:["AAA","BBB","CCC"]
            }
        }
    }