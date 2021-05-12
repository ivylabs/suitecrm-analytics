lib('cdf-env.js');

// http://localhost:8080/suitecrmanalytics/plugin/cgg/api/services/draw?script=/public/SuiteCRM+Analytics/System/Resources/SAMPLES/CGGCHART.js&outputType=png

var dataAccessId = "KETTLEDUMMY"
var legendVisible = true;

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
    $.extend(true,cd,analytics.opts.charts.defaultBarChartComp);

  },
  chartDefinition:  {
    dataAccessId: dataAccessId,
    path: "/public/SuiteCRM Analytics/System/Resources/SAMPLES/CHARTS.cda",
    width: 2048,
    height: 800,
    legendVisible: legendVisible,
    //legendItemPadding: 10,
    // This padding fixes the legend truncation
    legendPaddings: 10,
    //legendMargins: 10,
    orthoAxisTitle: "Average Call Duration (Minutes)",
    orthoAxisTitleAlign: "center",
    stacked: true,
    seriesInRows: true,
    crosstabMode: false,
    baseAxisTitle: "Period",
    baseAxisTitleAlign: "middle",
    // Override data order
    categoryRole: "category desc",
    compatVersion: 3
  },
  lifecycle:  {
    silent: false
  }
};

cgg.render(chart);
