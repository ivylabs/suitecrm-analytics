define(['cdf/lib/jquery'], function($) {
var UIComponent = {}

    UIComponent.functions = {
        
        initPage:function(pageProps){
            
            $('#pageTitle').html(pageProps.pageTitle+"<small>"+pageProps.pageSubTitle+"</small>");
            $('#pageTitleProperty').html(pageProps.pageTitle);
            
            var pageBreadcrumb = "<li><a href='#'><i class='fa fa-home'></i> Home</a></li>";
            
            $.each(pageProps.pageBreadcrumb,function(idx,val){
                pageBreadcrumb += "<li><a href='#'>"+val+"</a></li>";
            });
            
            $('#pageBreadcrumb').html(pageBreadcrumb);
            $('.pageUsername').html("Harris")
        },
        
        populateNotifications:function(data){
            
            var resultset = data.resultset, totalRows = data.queryInfo.totalRows;
            
            var pageNotifications = "";
            
            $.each(resultset,function(idx,message){
                pageNotifications += "<li>"+
                                     "<a href='#'>"+
                                     "<div class='pull-left'><img src='/pentaho/api/repos/suitecrm/static/custom/img/blankprofile.jpg' class='img-circle' alt='User Image'></div>"+
                                     "<h4>"+message[0]+"<small><i class='fa fa-clock-o'></i> "+message[3]+"</small></h4>"+
                                     "<p>"+message[1]+"</p>"+
                                     "</a>"+
                                     "</li>"
            });
            
            $('#pageNotifications').html(pageNotifications);
            $('#pageNotificationsCount').html(totalRows);
            
            var messageText = "messages";
            
            if(totalRows == 1){
                messageText = "message";
            }
            
            $('#pageNotificationsCountMessage').html("You have "+totalRows+" "+messageText);
            
        }
        
    }
    
    return UIComponent;
});