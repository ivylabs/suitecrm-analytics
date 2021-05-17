// Parameters
// &pCampaignTypeFilter=All Campaign Types
// &pCampaignFilter=All Campaigns
// &parampShowDeletedRecords=1

// http://localhost:8080/suitecrmanalytics/plugin/cgg/api/services/draw?script=/public/SuiteCRM+Analytics/System/Resources/RCD/CGGChartGenerator.js&outputType=svg&paramchart=AgentLeadPerformance&paramchartType=cccBarChart&parampCampaignTypeFilter=All%20Campaign%20Types&parampCampaignFilter=All%20Campaigns&parampShowDeletedRecords=1

var chart =  {
    
    chartType:"cccBarChart",
    chartParameters:[["pCampaignTypeFilter","pCampaignTypeFilter"],["pCampaignFilter","pCampaignFilter"],["pShowDeletedRecords","pShowDeletedRecords"]],
    
    chartDefinition:{
        dataAccessId: "COUNT_LEAD_BY_STATUS",
        path: "/public/SuiteCRM Analytics/System/Resources/REPORTS/CHARTS.cda",
        legendVisible: true,
        legendPaddings: 10,
        orthoAxisTitle: "Total Leads",
        orthoAxisTitleAlign: "center",
        stacked: true,
        seriesInRows: true,
        crosstabMode: false,
        baseAxisTitleAlign: "middle",
        categoryRole: "category desc"
    }
}