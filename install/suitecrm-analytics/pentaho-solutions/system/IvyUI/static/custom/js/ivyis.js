function generateSoltionWidgets(folder){
    
    var widgetHTML = "<div class='row'>";
    var widgetCount = 1;

    $.get( window.location.protocol+"//"+window.location.host+"/@@WEBAPP_NAME@@/api/repo/files/:public:solution:"+folder+"/children?depth=1&showHidden=false&filter=*.wcdf|FILES", function( data ) {
        $(data).find("repositoryFileDto").each(function(index, value){

            if (widgetCount == 5){
                widgetHTML += "</div><div class='row'>"
                widgetCount = 1;
            }

            var dashTitle = $(value).find("title").text();
            var dashImage = "missing";
            var dashURL = "/@@WEBAPP_NAME@@/api/repos/"+$(value).find("path").text().replace(/\//g,":")+"/generatedContent";

            $.get("/@@WEBAPP_NAME@@/api/repos/IvyUI/static/custom/img/"+folder+"/"+dashTitle+".png")
                .done(function() { 
                    dashImage = dashTitle;

            });
                
            var buttonTitle = "";
            
            if(folder == "reports"){
                buttonTitle = "";
            } else {
                buttonTitle = "";
            }

            widgetHTML += "<div class='col-xs-12 col-sm-12 col-md-6 col-lg-3'>"+
                            "<div class='box box-solid'>"+
                            "<div class='box-header with-border'>"+
                            "<i class='fa fa-th'></i>"+
                            "<h3 class='box-title'>"+dashTitle+"</h3>"+
                            "</div>"+
                            "<div class='box-body'>"+
                            "<img src='/@@WEBAPP_NAME@@/api/repos/@@PLUGIN_NAME@@/static/custom/img/"+folder+"/"+dashImage+".png' class='img-responsive'>"+
                            "</div>"+
                            "<div class='box-footer'>"+
                            "<div class='row'>"+
//                             "<div class='col-md-5'><a href='#' class='btn btn-default btn-block' role='button'>Details</a></div>"+
                            "<div class='col-md-6'></div>"+
                            "<div class='col-md-6'><a href='"+dashURL+"' class='btn btn-primary btn-block' role='button'>Open"+buttonTitle+"</a></div>"+
                            "</div>"+
                            "</div>"+
                            "</div>"+ 
                            "</div>";

            widgetCount++;
        });     

        widgetHTML += "</div>"
    });

    $('.content').prepend(widgetHTML); 
}