// Parameters

// &parampCampaignFilter=All Campaigns
// &parampCampaignTypeFilter=All Campaign Types
// &parampCampaignStatusFilter=All Campaign Status
// &paramparampShowDeletedRecords=1

// http://localhost:8080/suitecrmanalytics/plugin/cgg/api/services/draw?script=/public/SuiteCRM+Analytics/System/Resources/RCD/CGGChartGenerator.js&outputType=svg&paramchart=CampaignPerformance&paramchartType=cccMetricDotChart&parampCampaignFilter=All%20Campaigns&parampCampaignTypeFilter=All%20Campaign%20Types&parampCampaignStatusFilter=All%20Campaign%20Status&paramparampShowDeletedRecords=1

var chart =  {
    
    chartType:"cccMetricDotChart",
    chartParameters:[["pCampaignFilter","pCampaignFilter"],["pCampaignTypeFilter","pCampaignTypeFilter"],["pCampaignStatusFilter","pCampaignStatusFilter"],["pShowDeletedRecords","pShowDeletedRecords"]],
    
    chartDefinition:{
        dataAccessId: "campaignPerformanceMetricDotQuery",
        path: "/public/SuiteCRM Analytics/System/Resources/REPORTS/CHARTS.cda",
        crosstabMode: false,
        seriesInRows: false,
        orthoAxisTitle: "Opportunity Average Spend",
        baseAxisTitle: "Total Won Opportunities",
        orthoAxisTitleAlign: "center",
        baseAxisTitleAlign: "middle",
    }
}