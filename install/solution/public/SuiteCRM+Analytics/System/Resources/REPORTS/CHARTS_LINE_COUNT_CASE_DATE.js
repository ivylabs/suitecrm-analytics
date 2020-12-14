lib('cdf-env.js');

var render_LINE_COUNT_CASE_DATE = {
  type: "cccLineChart",
  name: "render_LINE_COUNT_CASE_DATE",
  priority: 5,
  parameters: [["pCaseTypeFilter","pCaseTypeFilter"],["pCasePriorityFilter","pCasePriorityFilter"],["pDateFilter","pDateFilter"]],
  executeAtStart: true,
  htmlObject: "${h:C5}",
  preExecution: function d(){
    
    // Use this if we are requesting a CGG chart direct
    if(typeof cgg != 'undefined'){
        load('../JS/analytics-legacy.js');
    }
    
    /*
    if(typeof cgg != 'undefined'){
        load('../System/Resources/JS/analytics-legacy.js');
    }
    */
    
    var dash = Dashboards,
        cd = this.chartDefinition;
    
    $.extend(true,cd,analytics.opts.charts.defaultChartComp);
    $.extend(true,cd,analytics.opts.charts.defaultLineChartComp);
    
    

} ,
  listeners: [],
  clearsBeforePreExecution: true,
  renderMode: "total",
  dataAdditiveMode: false,
  chartDefinition:  {
    dataAccessId: "COUNT_CASE_BY_DATE",
    path: "/public/SuiteCRM Analytics/System/Resources/REPORTS/CHARTS.cda",
    pushEnabled: false,
    extensionPoints: [],
    colors: [],
    animate: true,
    areasFillOpacity: 0.5,
    areasVisible: true,
    baseAxisDomainAlign: "center",
    baseAxisDomainRoundMode: "tick",
    baseAxisDomainScope: "global",
    baseAxisLabelDesiredAngles: [],
    baseAxisMinorTicks: true,
    baseAxisOffset: 0,
    baseAxisTicks: true,
    baseAxisTickUnitMax: "Infinity",
    baseAxisTickUnitMin: "0",
    baseAxisTitleMargins: "0",
    baseAxisTooltipAutoContent: "value",
    baseAxisTooltipEnabled: true,
    baseAxisVisible: true,
    baseAxisZeroLine: true,
    clearSelectionMode: "emptySpaceClick",
    clickable: false,
    color2AxisColors: [],
    color2AxisLegendClickMode: "toggleVisible",
    color2AxisLegendVisible: true,
    color2AxisPreserveMap: false,
    colorPreserveMap: false,
    compatVersion: 3,
    crosstabMode: true,
    ctrlSelectMode: true,
    dataIgnoreMetadataLabels: false,
    dataSeparator: "~",
    groupedLabelSep: " ~ ",
    hoverable: false,
    ignoreNulls: true,
    isMultiValued: false,
    leafContentOverflow: "auto",
    legendClickMode: "toggleVisible",
    legendVisible: true,
    measuresIndexes: [],
    multiChartColumnsMax: 3,
    multiChartIndexes: [],
    multiChartOverflow: "grow",
    multiChartSingleColFillsHeight: true,
    multiChartSingleRowFillsHeight: true,
    nullInterpolationMode: "none",
    orientation: "vertical",
    ortho2AxisDomainAlign: "center",
    ortho2AxisDomainRoundMode: "tick",
    ortho2AxisDomainScope: "global",
    ortho2AxisMinorTicks: true,
    ortho2AxisOffset: 0,
    ortho2AxisTicks: true,
    ortho2AxisTickUnitMax: "Infinity",
    ortho2AxisTickUnitMin: "0",
    ortho2AxisTitleMargins: "0",
    ortho2AxisVisible: true,
    ortho2AxisZeroLine: true,
    orthoAxisDomainAlign: "center",
    orthoAxisDomainRoundMode: "tick",
    orthoAxisDomainScope: "global",
    orthoAxisOffset: 0,
    orthoAxisTicks: true,
    orthoAxisTickUnitMax: "Infinity",
    orthoAxisTickUnitMin: "0",
    orthoAxisTitleMargins: "0",
    orthoAxisVisible: true,
    orthoAxisZeroLine: true,
    plot2: false,
    plot2AreasFillOpacity: 0.5,
    plot2AreasVisible: false,
    plot2ColorAxis: 2,
    plot2DotsVisible: true,
    plot2LinesVisible: true,
    plot2NullInterpolationMode: "none",
    plot2OrthoAxis: 1,
    plot2Series: [],
    plot2SeriesIndexes: -1,
    plot2Stacked: false,
    plot2ValuesMask: "{value}",
    plot2ValuesVisible: false,
    pointingMode: "near",
    preserveLayout: false,
    readers: [],
    selectable: false,
    seriesInRows: false,
    slidingWindow: false,
    smallContentMargins: "0",
    smallContentPaddings: "0",
    smallMargins: "2%",
    smallPaddings: "0",
    smallTitleMargins: "0",
    smallTitlePaddings: "0",
    smallTitlePosition: "top",
    timeSeries: false,
    timeSeriesFormat: "%Y-%m-%d",
    titleMargins: "0",
    titlePaddings: "0",
    tooltipEnabled: true,
    tooltipFade: true,
    tooltipFollowMouse: false,
    tooltipHtml: true,
    tooltipOpacity: 0.9,
    trendAreasFillOpacity: 0.5,
    trendAreasVisible: false,
    trendColorAxis: 2,
    trendDotsVisible: false,
    trendLinesVisible: true,
    trendOrthoAxis: 1,
    trendStacked: false,
    trendValuesAnchor: "right",
    trendValuesVisible: false
  },
  lifecycle:  {
    silent: false
  }
};

cgg.initParameter
("pCaseTypeFilter", "${pCaseTypeFilter}")
("pCasePriorityFilter", "${pCasePriorityFilter}")
("pDateFilter", "${pDateFilter}")
;

cgg.render(render_LINE_COUNT_CASE_DATE);
