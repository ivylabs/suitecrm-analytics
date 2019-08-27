var BSAddToFavoritesComponent = BaseComponent.extend({
  favoritesRawData:[],
  update : function() {
    var myself = this;

    this.ph = $("#"+this.htmlObject).empty();
    var myself = this;
    jQuery.ajax({
         url:    webAppPath+"/api/user-settings/favorites",
         method: 'GET',
         success: function(result) {
                    if(result!=undefined&&result!=""){
                      myself.favoritesRawData=JSON.parse(result);
                    }
                  },
         async:   false
    });
    
    if(myself.pageName==undefined||myself.pageName==""){
      myself.pageName = wcdfSettings==undefined?"":wcdfSettings.title;
    }
    
    if(myself.pagePath==undefined||myself.pagePath==""){
      myself.pagePath = Dashboards.context.path;
    }

    var indexFavoritesPage = BSAddToFavoritesComponent.getIndexByPath(myself.favoritesRawData, myself.pagePath);
    var favoritedClass = "";
    if(indexFavoritesPage!=-1){
      favoritedClass = " favorited ";
    }

    var innerButtonHTML = "";

    if(!this.label){
      this.label = "";
    }

    if(this.buttonIcon && this.buttonIcon != "none" && this){
      if(this.prependIcon){
        innerButtonHTML += "<i class='glyphicon "+this.buttonIcon+"'></i> " + this.label;
      }else{
        innerButtonHTML += this.label + " <i class='glyphicon "+this.buttonIcon+"'></i>";
      }
    } else {
      innerButtonHTML += this.label;
    }

    if(this.buttonBlock){
      myself.buttonBlock = "btn-block";
    } else {
      myself.buttonBlock = "";
    }

    var btnDisabled = "";
    if(myself.buttonDisabled){
      btnDisabled = " disabled='disabled'"
    }


    var b = $("<button class='btn "+this.buttonType+" " + (this.buttonSize===undefined?"":this.buttonSize) + " " 
      + myself.buttonBlock + favoritedClass + "' type='button' "+btnDisabled+"/>").html(innerButtonHTML).unbind("click");
    
    b.bind("click", function(event){

      jQuery.ajax({
           url:    webAppPath+"/api/user-settings/favorites",
           method: 'GET',
           success: function(result) {
                      if(result!=undefined&&result!=""){
                        myself.favoritesRawData=JSON.parse(result);
                      }
                    },
           async:   false
      });

      var indexRec = BSAddToFavoritesComponent.getIndexByPath(myself.favoritesRawData, myself.pagePath);
      var newArrayFavorites = $.extend([],myself.favoritesRawData);
      if(indexRec != -1){
        newArrayFavorites.splice(indexRec,1);
      }else{
        newArrayFavorites.push({fullPath: myself.pagePath, title: myself.pageName, lastUse: new Date().getTime()});
      }
      jQuery.ajax({
           url: webAppPath+"/api/user-settings/favorites",
           method: 'POST',
           data: JSON.stringify(newArrayFavorites),
           success: function(result) {
                      if(result!=undefined && result!=""){
                        myself.favoritesRawData = JSON.parse(result);
                        if(indexRec != -1){
                          myself.ph.find("button").removeClass("favorited");
                        }else{
                          myself.ph.find("button").addClass("favorited");
                        }
                      }
                    },
           async:   false
      });

      if (typeof myself.expression === 'function'){
        return myself.expression.apply(event, myself,arguments);
      }
      
    });


    this.ph.html(b);
  }
},{
  getIndexByPath: function(array, path){
    for(i=0;i<array.length;i++){
      if(array[i].fullPath==path){
        return i;
      }
    }
    return -1;
  }
});
