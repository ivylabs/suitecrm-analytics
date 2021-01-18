lib('cdf-env.js');

var render_PIE_COUNT_CASE_STATUS = {
  type: "cccPieChart",
  name: "render_PIE_COUNT_CASE_STATUS",
  priority: 5,
  parameters: [["pCaseTypeFilter","pCaseTypeFilter"],["pCasePriorityFilter","pCasePriorityFilter"],["pDateFilter","pDateFilter"],["pShowDeletedRecords","pShowDeletedRecords"]],
  executeAtStart: true,
  htmlObject: "${h:C3}",
  listeners: [],
  clearsBeforePreExecution: true,
  renderMode: "total",
  dataAdditiveMode: false,
  chartDefinition:  {
    dataAccessId: "COUNT_CASE_BY_STATUS",
    path: "/public/SuiteCRM Analytics/System/Resources/REPORTS/CHARTS.cda",
    pushEnabled: false,
    width: 1080,
    height: 450,
    extensionPoints: [],
    colors: [],
    animate: true,
    clearSelectionMode: "emptySpaceClick",
    clickable: false,
    colorPreserveMap: false,
    compatVersion: 3,
    crosstabMode: true,
    ctrlSelectMode: true,
    dataIgnoreMetadataLabels: false,
    dataSeparator: "~",
    explodedSliceRadius: "0",
    groupedLabelSep: " ~ ",
    hoverable: false,
    ignoreNulls: true,
    isMultiValued: false,
    legendClickMode: "toggleVisible",
    legendVisible: true,
    linkHandleWidth: 0.5,
    linkInsetRadius: "5%",
    linkLabelSize: "15%",
    linkLabelSpacingMin: 0.5,
    linkMargin: "2.5%",
    linkOutsetRadius: "2.5%",
    measuresIndexes: [],
    multiChartColumnsMax: 3,
    multiChartIndexes: [],
    multiChartOverflow: "grow",
    multiChartSingleColFillsHeight: true,
    multiChartSingleRowFillsHeight: true,
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
    valuesLabelStyle: "linked",
    valuesOverflow: "hide"
  },
  lifecycle:  {
    silent: false
  }
};

cgg.initParameter
("pCaseTypeFilter", "${pCaseTypeFilter}")
("pCasePriorityFilter", "${pCasePriorityFilter}")
("pDateFilter", "${pDateFilter}")
("pShowDeletedRecords", "${pShowDeletedRecords}")
;

cgg.render(render_PIE_COUNT_CASE_STATUS);
