lib('cdf-env.js');

var chart = {
// You can change the chart type below
  type: "cccBarChart",
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
    dataAccessId: "DUMMY1",
    path: "/public/SuiteCRM Analytics/System/Resources/SAMPLES/CHARTS.cda",
    width: 2048,
    height: 800,
    legendVisible: false,
    orthoAxisTitle: "Average Call Duration (Hours)",
    orthoAxisTitleAlign: "center",
    //baseAxisTitle: "Period",
    //baseAxisTitleAlign: "middle",
    compatVersion: 3
  },
  lifecycle:  {
    silent: false
  }
};

cgg.render(chart);
