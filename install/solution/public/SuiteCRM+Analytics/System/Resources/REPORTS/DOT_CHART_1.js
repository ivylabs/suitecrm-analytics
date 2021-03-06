lib('cdf-env.js');

var render_DOT_CHART_1 = {
  type: "cccMetricDotChart",
  name: "render_DOT_CHART_1",
  priority: 5,
  parameters: [],
  executeAtStart: true,
  htmlObject: "${h:C1}",
  listeners: [],
  clearsBeforePreExecution: true,
  renderMode: "total",
  dataAdditiveMode: false,
  chartDefinition:  {
    dataAccessId: "QUERY_AGENT_PERFORMANCE",
    path: "/public/SuiteCRM Analytics/System/Resources/REPORTS/CHARTS.cda",
    pushEnabled: false,
    width: 1080,
    height: 450,
    extensionPoints: [],
    colors: [],
    animate: true,
    baseAxisDomainAlign: "center",
    baseAxisDomainRoundMode: "tick",
    baseAxisDomainScope: "global",
    baseAxisMinorTicks: true,
    baseAxisOffset: 0,
    baseAxisTicks: true,
    baseAxisTickUnitMax: "Infinity",
    baseAxisTickUnitMin: "0",
    baseAxisTitleMargins: "0",
    baseAxisVisible: true,
    baseAxisZeroLine: true,
    clearSelectionMode: "emptySpaceClick",
    clickable: false,
    color2AxisColors: [],
    color2AxisLegendClickMode: "toggleVisible",
    color2AxisLegendVisible: true,
    color2AxisPreserveMap: false,
    colorDomain: [],
    colorMissing: "lightgray",
    colorPreserveMap: false,
    colorScaleType: "linear",
    colorUseAbs: false,
    compatVersion: 3,
    crosstabMode: false,
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
    nullShape: "cross",
    orientation: "vertical",
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
    pointingMode: "near",
    preserveLayout: false,
    readers: [],
    selectable: false,
    seriesInRows: false,
    sizeAxisDomainAlign: "center",
    sizeAxisUseAbs: false,
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
    trendColorAxis: 2,
    trendDotsVisible: false,
    trendLinesVisible: true,
    trendShape: "circle",
    trendValuesAnchor: "right",
    trendValuesVisible: false
  },
  lifecycle:  {
    silent: false
  }
};



cgg.render(render_DOT_CHART_1);
