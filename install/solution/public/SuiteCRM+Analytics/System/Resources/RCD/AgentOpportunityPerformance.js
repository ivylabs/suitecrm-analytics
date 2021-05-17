// Parameters
// &parampOpportunityCreatedDateFilter=9999-99
// &parampOpportunityClosedDateFilter=9999-99
// &parampOpportunityLeadSourceFilter=All Opportunity Lead Sources
// &parampOpportunitySalesStageFilter=All Opportunity Sales Stages
// &parampOpportunityTypeFilter=All Opportunity Types
// &paramparampShowDeletedRecords=1

// http://localhost:8080/suitecrmanalytics/plugin/cgg/api/services/draw?script=/public/SuiteCRM+Analytics/System/Resources/RCD/CGGChartGenerator.js&outputType=svg&paramchart=AgentOpportunityPerformance&paramchartType=cccMetricDotChart&parampOpportunityCreatedDateFilter=9999-99&parampOpportunityClosedDateFilter=9999-99&parampOpportunityLeadSourceFilter=All%20Opportunity%20Lead%20Sources&parampOpportunitySalesStageFilter=All%20Opportunity%20Sales%20Stages&parampOpportunityTypeFilter=All%20Opportunity%20Types&parampShowDeletedRecords=1
var chart =  {
    
    chartType:"cccMetricDotChart",
    chartParameters:[],
    
    chartDefinition:{
        dataAccessId: "performanceMetricDotQuery",
        path: "/public/SuiteCRM Analytics/System/Resources/REPORTS/CHARTS.cda",
        crosstabMode: false,
        seriesInRows: false,
        orthoAxisTitle: "Opportunity Amount",
        baseAxisTitle: "Total Opportunities",
        orthoAxisTitleAlign: "center",
        baseAxisTitleAlign: "middle",
    }
}