lib('cdf-env.js');

var chart = {
// You can change the chart type below
  type: "cccLineChart",
  name: "chart",
  preExecution: function d(){
    
    if(typeof cgg != 'undefined'){
        load('../JS/analytics-legacy.js');
    }
    
    var dash = Dashboards,
        cd = this.chartDefinition;
    
    $.extend(true,cd,analytics.opts.charts.defaultChartComp);

  },
  chartDefinition:  {
    compatVersion: 3,
    dataAccessId: "DUMMY1",
    path: "/public/SuiteCRM Analytics/System/Resources/SAMPLES/CHARTS.cda",
    width: 1024,
    height: 400,
    legendVisible: false
  },
  lifecycle:  {
    silent: false
  }
};

cgg.render(chart);