// Parameters
// &parampDateFilter=9999-99
// &parampCaseTypeFilter=All Case Types
// &parampCasePriorityFilter=All Case Priorities
// &parampShowDeletedRecords=1

// http://localhost:8080/suitecrmanalytics/plugin/cgg/api/services/draw?script=/public/SuiteCRM+Analytics/System/Resources/RCD/CGGChartGenerator.js&outputType=svg&paramchart=AgentCasePerformance&paramchartType=cccBarChart&parampDateFilter=9999-99&parampCaseTypeFilter=All%20Case%20Types&parampCasePriorityFilter=All%20Case%20Priorities&parampShowDeletedRecords=1

var chart =  {
    
    chartType:"cccBarChart",
    chartParameters:[["pCaseTypeFilter","pCaseTypeFilter"],["pCasePriorityFilter","pCasePriorityFilter"],["pDateFilter","pDateFilter"],["pShowDeletedRecords","pShowDeletedRecords"]],
    
    chartDefinition:{
        dataAccessId: "COUNT_CASE_BY_STATUS",
        path: "/public/SuiteCRM Analytics/System/Resources/REPORTS/CHARTS.cda",
        legendVisible: true,
        legendPaddings: 10,
        orthoAxisTitle: "Total Cases",
        orthoAxisTitleAlign: "center",
        stacked: true,
        seriesInRows: true,
        crosstabMode: false,
        baseAxisTitleAlign: "middle",
        categoryRole: "category desc"
    }
}