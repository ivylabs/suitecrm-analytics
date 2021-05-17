lib('cdf-env.js');

// http://localhost:8080/suitecrmanalytics/plugin/cgg/api/services/draw?script=/public/SuiteCRM+Analytics/System/Resources/RCD/CGGChartGenerator.js&outputType=png
// &paramchart=<ChartDefinitionFile>&paramchartType=cccLineChart

var chart = {
	type: "cccBarChart",
	name: "chart",
	preExecution: function d() {
	    
	    that = this;
		
		if (typeof cgg != 'undefined') {
			load('../JS/analytics-legacy.js');
			load(cgg.getParameterValue("chart") + '.js');
		}
		
		var dash = Dashboards,
			cd = this.chartDefinition
			chartType = cgg.getParameterValue("chartType");
		
		// Set the default chart properties
		$.extend(true, cd, analytics.opts.charts.defaultChartComp);
		
		// Set the chart type properties
		switch (chartType) {
            case "cccBarChart":
                $.extend(true, cd, analytics.opts.charts.defaultBarChartComp);
            break;
            case "cccPieChart":
                $.extend(true, cd, analytics.opts.charts.defaultPieChartComp);
            break;
            case "cccLineChart":
                $.extend(true, cd, analytics.opts.charts.defaultLineChartComp);
            break;
            case "cccMetricDotChart":
                //$.extend(true, cd, analytics.opts.charts.defaultLineChartComp);
            break;
    
        }
        
		// Set the Chart Definition
		$.extend(true, cd, chart.chartDefinition);
		
		// Get the chart type from the URL or use the default one
		if(chartType){
		    that.type = cgg.getParameterValue("chartType");
		} else {
		    that.type = chart.chartType;
		}
		
		// Set the chart parameters
		this.parameters = chart.chartParameters;
		
	},
	chartDefinition: {
		dataAccessId: "DUMMY",
		path: "/public/SuiteCRM Analytics/System/Resources/RCD/DUMMY.cda",
		width: 1080,
		height: 450,
		compatVersion: 3
	}
};

cgg.render(chart);