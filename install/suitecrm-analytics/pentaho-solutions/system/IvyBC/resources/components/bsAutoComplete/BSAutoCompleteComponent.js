var BSAutoCompleteComponent = BaseComponent.extend({
  update : function() {
    var myself = this;
    
    myself.ph = $("#" + this.htmlObject).empty();

    myself.query = Dashboards.getQuery(this.queryDefinition);

    myself.ph.append('<input class="typeahead form-control ' + (myself.inputTextSize===undefined?"":myself.inputTextSize) 
      + '" type="text" placeholder="'+(myself.placeHolderValue||"")+'" autocomplete="off">');

    myself.ph.find('.typeahead').typeahead({
      minLength: myself.minTextLenght||1,
      scrollHeight: myself.scrollHeight||0,
      items: myself.maxResults||"all",
      source: function (query, process) {
        if(myself.searchParam){
          myself.triggerQuery(query);
        }else{
          QueryComponent.makeQuery(myself);
        }
        var finalData = [];
        $.each(myself.result, function (i, data) {
            finalData.push(data[0]);
        });
     
        process(finalData);
      },
      highlighter: function (item) {
        myself.highlight=myself.highlight==undefined?true:myself.highlight;
        if(myself.highlight){
          var regex = new RegExp( '(' + this.query + ')', 'gi' );
          return item.replace( regex, "<strong>$1</strong>" );
        }else{
          var regex = new RegExp( '(' + item + ')', 'gi' );
          return item.replace( regex, "$1" );
        }
      },
      sorter: function (items) {
        return items.sort();
      },
      matcher: function (item) {
        if(myself.matchType==="fromStart"){
          if (item.toLowerCase().indexOf(this.query.trim().toLowerCase()) === 0) {
            return true;
          }
        }else{
          if (item.toLowerCase().indexOf(this.query.trim().toLowerCase()) != -1) {
            return true;
          }
        }
      }
    });


    $("body").on('change', myself.ph, function(){
      Dashboards.processChange(myself.name);
    });  

  },
  triggerQuery: function(term){
    var params = $.extend([],this.parameters);
    var termVal = "'" + term+ "'";
    if(this.searchParam){
      params.push([this.searchParam, termVal]);
    }
    else if (params.length > 0){
      this.parameters[0][1] = termVal;
    }
    if(term.length >= this.minTextLength) {
      this.query.setAjaxOptions({async: false});
      QueryComponent.makeQuery(this);
    }
  },
  autoCompleteChange: function(name){
    setTimeout(function(){
      Dashboards.processChange(name)
    },1);
  },
  getValue : function() {
    return $("#" + this.htmlObject + " .typeahead").val();
  }
}); 