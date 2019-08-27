overrideProps.push({
//    genericType: "ccc",
//    colors: ['#6e97aa','#52717f','#29383f','#b7cbd5','#374b55']
    //colors: ['#80cc28']
});

overrideProps.push({
//    nameType: "cccPieChart",
//    extensionPoints: [
//        ["slice_innerRadiusEx","60%"]
//    ],
//    animate: false
});

overrideProps.push({
//    nameType: "cccLineChart",
//	extensionPoints: [
//		["line_lineWidth","2"],["dot_lineWidth","2"],["dot_fillStyle","#fff"]
//	],
//    dotsVisible: true,
//    baseAxisGrid:true,
//    orthoAxisGrid:true,
//    plotFrameVisible:false
});

overrideProps.push({
//    nameType: "cccBarChart",
//    baseAxisGrid:true,
//    orthoAxisGrid:true,
//    plotFrameVisible:false
});  


Dashboards.setAddInDefaults("Table","colType","dataBar",
{
    startColor:"#6e97aa",
	endColor:"#6e97aa",
	widthRatio:0.7
}
); 
