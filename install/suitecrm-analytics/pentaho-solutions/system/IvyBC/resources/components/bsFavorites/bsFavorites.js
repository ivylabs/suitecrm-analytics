
var FavoritesAddIns = {
  link: {
    name: "hyperlink",
    label: "Hyperlink",
    defaults:{
      openInNewTab: true,
      prependHttpIfNeeded: true,
      regexp: null,
      pattern: null,
      urlReference: 2,
      labelReference: 1
    },
    
    init: function(){
      $.fn.dataTableExt.oSort[this.name+'-asc'] = $.fn.dataTableExt.oSort['string-asc'];
      $.fn.dataTableExt.oSort[this.name+'-desc'] = $.fn.dataTableExt.oSort['string-desc'];
    },
    
    implementation: function(tgt, st, opt){
      
      var ph = $(tgt);
      var link, label;
      if(opt.fromOpValue){
        link = opt.url;
        label = opt.label;
      }else if (opt.pattern) {
        var re = new RegExp(opt.pattern),
          results = re.exec(st.value);
        link = results[opt.urlReference];
        label = results[opt.labelReference];
      } else {
        link = st.value;
        label = st.value;
      }
      if (opt.prependHttpIfNeeded && !/^https?:\/\//.test(link)){
        link = "http://" + link;
      }
      // is this text an hyperlink? 
      if(opt.regexp == null || (new RegExp(opt.regexp).test(st.value))){
        var a = $("<a></a>").attr("href",link).addClass("hyperlinkAddIn");
        a.text(label);
        if(opt.openInNewTab){
          a.attr("target","_blank");
        }
        ph.empty().append(a);
      }
    }
    
  },
  removeFavorites: {
    name: "removeFavorites",
    label: "Remove Favorites",
    defaults: {
      buttons:[{
        name: "removeFile",
        cssClass: "btn btn-link inactive",
        title: "",
        tooltip: "Remove",
        icon:{
          cssClass: "fa fa-trash-o"
        },
        action: function(tgt, st, opt) {
          var indexRec = BSFavoritesComponent.getIndexByPath(st.compoment.favoritesRawData, st.value);
          var newArrayFavorites = $.extend([],st.compoment.favoritesRawData);
          newArrayFavorites.splice(indexRec,1);
          jQuery.ajax({
               url: webAppPath+"/api/user-settings/favorites",
               method: 'POST',
               data: JSON.stringify(newArrayFavorites),
               success: function(result) {
                          if(result!=undefined && result!=""){
                            st.compoment.favoritesRawData = JSON.parse(result);
                            st.compoment.favoritesRawCDAData = BSFavoritesComponent.convertFavoritesToCDADatasource(st.compoment.favoritesRawData);
                            st.compoment.update();
                          }
                        },
               async:   false
          });
        }
      }]
    },
    implementation: function (tgt, st, opt) {
      var $buttonContainer = $('<div/>').addClass('buttonContainer').addClass(opt.cssClass?opt.cssClass:"")
        .addClass('numButtons-' + opt.buttons.length);

      _.each(opt.buttons, function(el,idx){
        if(opt.buttons[idx].preImplementation){
          opt=opt.buttons[idx].preImplementation(tgt, st, opt);
        }
        var $button = $("<button/>").addClass((el.cssClass||"")+" "+el.name).text(el.title||"").attr('title', el.tooltip||"");
        
        if(el.name=="removeFile"){
          var indexFav = BSFavoritesComponent.getIndexByPath(st.compoment.favoritesRawData, st.value);
          if(indexFav == -1){
            $button.addClass("inactive");
          }else{
            $button.removeClass("inactive");
          }
        }
        
        if(el.icon != undefined){
          var $icon = $("<i/>").addClass(el.icon.cssClass);
          if(el.icon.prepend){
            $button.prepend($icon);
          }else{
            $button.append($icon);
          }
        }
        $button.click(function(){
          if (el.action) {
            el.action(tgt, st, opt);
          }
        });
        $buttonContainer.append($button);

        if(opt.buttons[idx].postImplementation){
          opt=opt.buttons[idx].postImplementation(tgt, st, opt);
        }
      });

      if(opt.align === "center"){
        $buttonContainer = $('<center/>').append($buttonContainer);
      }else{
        $buttonContainer.addClass("pull-"+(opt.align||""));
      }

      $(tgt).empty().append($buttonContainer);

      if(opt.postImplementation){
        opt=opt.postImplementation(tgt, st, opt);
      }
    }
  }
};
Dashboards.registerAddIn("bsFavorites", "colType", new AddIn(FavoritesAddIns.removeFavorites));
Dashboards.registerAddIn("bsFavorites", "colType", new AddIn(FavoritesAddIns.link));

 
var BSFavoritesComponent = BaseComponent.extend({

  type: "bsFavorites",
  favoritesRawData:[],

  update: function() {

    this.ph = $("#"+this.htmlObject).empty();
    var myself = this;
    jQuery.ajax({
         url:    webAppPath+"/api/user-settings/favorites",
         method: 'GET',
         success: function(result) {
                    if(result!=undefined&&result!=""){
                      myself.favoritesRawData=JSON.parse(result);
                      myself.favoritesRawCDAData = BSFavoritesComponent.convertFavoritesToCDADatasource(myself.favoritesRawData, myself.valueProperties.showFullPath, 
                        myself.valueProperties.showTitle, myself.valueProperties.showLastExec, myself.valueProperties.dateLastExecFormat);
                    }
                  },
         async:   false
    });

    if(myself.displayType=="table"){
      var cd = myself.chartDefinition;
      myself.extraOptions = myself.extraOptions || [];
      cd["tableId"] = myself.htmlObject + "Table";

      // Set defaults for headers / types
      if(typeof cd.colHeaders === "undefined" || cd.colHeaders.length == 0)
        cd.colHeaders = myself.favoritesRawCDAData.metadata.map(function(i){return i.colName});

      if(typeof cd.colTypes === "undefined" || cd.colTypes.length == 0)
        cd.colTypes = myself.favoritesRawCDAData.metadata.map(function(i){return i.colType.toLowerCase()});

      var dtData = BSFavoritesComponent.getDataTableOptions(cd);

      var bootstrapClasses = "table ";
      if(myself.tableResponsive){
        bootstrapClasses += "table-responsive ";
        $("#"+myself.htmlObject).addClass("table-responsive");
      }
      if(myself.tableStriped){
        bootstrapClasses += "table-striped ";
      }
      if(myself.tableBordered){
        bootstrapClasses += "table-bordered ";
      }
      if(myself.tableHover){
        bootstrapClasses += "table-hover ";
      }
      if(myself.tableCondensed){
        bootstrapClasses += "table-condensed ";
      }

      /* We need to make sure we're getting data from the right place,
       * depending on whether we're using CDA
       */
      if (myself.favoritesRawCDAData!==undefined&&myself.favoritesRawCDAData) {
        if((typeof(myself.postFetch)=='function')){
          myself.favoritesRawCDAData = myself.postFetch(myself.favoritesRawCDAData);
        }
        dtData.aaData = myself.favoritesRawCDAData.resultset;
      }

      /* Configure the table event handlers */
      dtData.fnDrawCallback = _.bind(this.fnDrawCallback,this);
      dtData.fnInitComplete = _.bind(this.fnInitComplete,this);

      var tableClassName =  bootstrapClasses + ' form-inline ';
      myself.ph.html("<table id='" + myself.htmlObject + "Table' class='" + tableClassName +"' width='100%'></table>");

      /* 
       * We'll first initialize a blank table so that we have a
       * table handle to work with while the table is redrawing
       */
      myself.dataTable = $("#"+myself.htmlObject+'Table').dataTable(dtData);
      if (typeof cd.clickAction === 'function'){
        $("#"+myself.htmlObject+'Table tbody tr').css("cursor","pointer");
      }
      myself.ph.find ('table').bind('click',function(e) {
        if (typeof cd.clickAction === 'function' || myself.expandOnClick) { 
          var state = {},
            target = $(e.target),
            results = myself.favoritesRawCDAData; 
          if(!(target.parents('tbody').length)) {
            return;
          } else if (target.get(0).tagName != 'TD') {
            target = target.closest('td');
          }
          var position = myself.dataTable.fnGetPosition(target.get(0));
          state.rawData = myself.favoritesRawCDAData;
          state.tableData = myself.dataTable.fnGetData();
          state.colIdx = position[2];
          state.rowIdx = position[0];
          state.series = results.resultset[state.rowIdx][0];
          
          state.category = results.metadata[state.colIdx].colName;
          state.value =  results.resultset[state.rowIdx][state.colIdx];
          state.colFormat = cd.colFormats[state.colIdx];           

            
          state.target = target;

          
          if ( myself.expandOnClick ) {
            myself.handleExpandOnClick(state);
          }
          if ( cd.clickAction  ){
            cd.clickAction.call(myself,state);
          }
        }
      });

      // Final styling
      this.ph.find(".dataTables_wrapper").each(function(){
        var datatable = $(this);
        datatable.addClass("form-inline");

        datatable.find(".dataTables_filter").css("width","auto");

        // SEARCH - Add the placeholder for Search and Turn this into in-line formcontrol
        var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
        search_input.attr('placeholder', 'Search');
        search_input.addClass('form-control input-small');

        // SEARCH CLEAR - Use an Icon
        var clear_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] a');
        clear_input.html('<i class="icon-remove-circle icon-large"></i>')
        clear_input.css('margin-left', '5px')

        // LENGTH - Inline-Form control
        var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select').clone();
        datatable.closest('.dataTables_wrapper').find('div[id$=_length] select').remove();
        length_sel.addClass('form-control input-small');
        length_sel.css('margin-left',"0.5em");
        datatable.closest('.dataTables_wrapper').find('div[id$=_length] label').after(length_sel);
        datatable.closest('.dataTables_wrapper').find('div[id$=_length]').css("width","100%");
   
      });

    }
  },

  
  /* 
   * Callback for when the table is finished drawing. Called every time there
   * is a redraw event (so not only updates, but also pagination and sorting).
   * We handle addIns and such things in here.
   */
  fnDrawCallback: function(dataTableSettings) {
    var dataTable = dataTableSettings.oInstance,
        cd = this.chartDefinition,
        myself = this,
        handleAddIns = _.bind(this.handleAddIns,this);
    this.ph.find("tbody tr").each(function(row,tr){
      /* 
       * Reject rows that are not actually part
       * of the datatable (e.g. nested tables)
       */
      if (dataTable.fnGetPosition(tr) == null) {
        return true;
      }

      $(tr).children("td").each(function(col,td){

          var foundAddIn = handleAddIns(dataTable, td);
          /* 
           * Process column format for those columns
           * where we didn't find a matching addIn
           */
          if(!foundAddIn && cd.colFormats) {
            var position = dataTable.fnGetPosition(td);
            if(position && typeof position[0] == "number"){
              var rowIdx = position[0],
                colIdx = position[2],
                format = cd.colFormats[colIdx],
                value = myself.favoritesRawCDAData.resultset[rowIdx][colIdx];
              if (format && (typeof value != "undefined" && value !== null)) {
                $(td).text(sprintf(format,value));
              }
            }
          }
      });
    });

    /* Old urlTemplate code. This needs to be here for backward compatibility */
    if(cd.urlTemplate != undefined){
      var td =$("#" + myself.htmlObject + " td:nth-child(1)"); 
      td.addClass('cdfClickable');
      td.bind("click", function(e){
          var regex = new RegExp("{"+cd.parameterName+"}","g");
          var f = cd.urlTemplate.replace(regex,$(this).text());
          eval(f);
          });
    }
    /* Handle post-draw callback the user might have provided */
    if(typeof cd.drawCallback == 'function'){
      cd.drawCallback.apply(myself,arguments);
    }
  },

  /* 
   * Handler for when the table finishes initialising. This only happens once,
   * when the table *initialises* ,as opposed to every time the table is drawn,
   * so it provides us with a good place to add the postExec callback.
   */
  fnInitComplete: function() {
  },

  /* 
   * Resolve and call addIns for the given td in the context of the given 
   * dataTable. Returns true if there was an addIn and it was successfully
   * called, or false otherwise.
   */
  handleAddIns: function(dataTable, td) {
    var cd = this.chartDefinition,
        position = dataTable.fnGetPosition(td);
        if(position && typeof position[0] != "number"){
          return false;
        }
        rowIdx = position[0],
        colIdx = position[2],
        colType = cd.colTypes[colIdx],
        addIn = this.getAddIn("colType",colType),
        state = {},
        target = $(td),
        results = this.favoritesRawCDAData;
    if (!addIn) {
      return false;
    }
    try {
      if(!(target.parents('tbody').length)) {
        return;
      } else if (target.get(0).tagName != 'TD') {
        target = target.closest('td');
      }
      state.rawData = results;
      state.tableData = dataTable.fnGetData();
      state.colIdx = colIdx;
      state.rowIdx = rowIdx;
      state.series = results.resultset[state.rowIdx][0];
      state.category = results.metadata[state.colIdx].colName;
      state.value =  results.resultset[state.rowIdx][state.colIdx];
      state.compoment = this;
      if(cd.colFormats) {
        state.colFormat = cd.colFormats[state.colIdx];
      }
      state.target = target;
      addIn.call(td,state,this.getAddInOptions("colType",addIn.getName()));
      return true;
    } catch (e) {
      Dashboards.log(e,'exception');
      return false;
    }
  },
},{
  getDataTableOptions : function(options) {
    var dtData = {};

    dtData.bInfo = options.info;
    dtData.iDisplayLength = options.displayLength;
    dtData.bLengthChange = options.lengthChange;
    dtData.bPaginate = options.paginate;
    dtData.sPaginationType = options.paginationType;
    dtData.bSort = options.sort;
    dtData.bFilter = options.filter;

    if (typeof options.oLanguage == "string"){
      dtData.oLanguage = eval("(" + options.oLanguage + ")");//TODO: er...
    }
    else {
      dtData.oLanguage = options.oLanguage;
    }

    if (typeof options.language == "string"){
      dtData.language = eval("(" + options.language + ")");//TODO: er...
    } else {
      dtData.language = options.language;
    }

    if(options.colHeaders != undefined){
      dtData.aoColumns = new Array(options.colHeaders.length);
      for(var i = 0; i< options.colHeaders.length; i++){
        dtData.aoColumns[i]={}
        dtData.aoColumns[i].sClass="column"+i;
      };
      $.each(options.colHeaders,function(i,val){
        dtData.aoColumns[i].sTitle=val;
        if(val == "") dtData.aoColumns[i].bVisible=false;
      });  // colHeaders
      if(options.colTypes!=undefined){
        $.each(options.colTypes,function(i,val){
          var col = dtData.aoColumns[i];
          // Specific case: hidden cols
          if(val == "hidden") col.bVisible=false;
          col.sClass+=" "+val;
          col.sType=val;

        })
      };  // colTypes
      if(options.colFormats!=undefined){
        // Changes are made directly to the json

      };  // colFormats

      var bAutoWidth = true;
      if(options.colWidths!=undefined){
        $.each(options.colWidths,function(i,val){
          if (val!=null){
            dtData.aoColumns[i].sWidth=val;
            bAutoWidth = false;
          }
        })
      }; //colWidths
      dtData.bAutoWidth = bAutoWidth;

      if(options.colSortable!=undefined){
        $.each(options.colSortable,function(i,val){
          if (val!=null && ( !val || val == "false" ) ){
            dtData.aoColumns[i].bSortable=false
          }
        })
      }; //colSortable
      if(options.colSearchable!=undefined){
        $.each(options.colSearchable,function(i,val){
          if (val!=null && ( !val || val == "false" ) ){
            dtData.aoColumns[i].bSearchable=false
          }
        })
      }; //colSearchable

    }

    return dtData;
  },
  convertFavoritesToCDADatasource: function(data, showFullPath, showTitle, showLastExec, dateLastExecFormat){
    var result = {
      metadata:[],
      queryInfo: {totalRows: data.length},
      resultset: []
    };

    if(showTitle){
      result.metadata.push({colIndex: 0, colType: "String", colName: "Title"});
    }
    if(showLastExec){
      result.metadata.push({colIndex: 2, colType: "String", colName: "Last Use"});
    }
    if(showFullPath){
      result.metadata.push({colIndex: 1, colType: "String", colName: "Full Path"});
    }

    for(var i=0;i<data.length;i++){
      var row = [];
      if(showTitle){
        row.push(data[i].title);
      }
      if(showLastExec){
        if(dateLastExecFormat!==undefined&&dateLastExecFormat!=""){
          row.push(moment(new Date(data[i].lastUse)).format(dateLastExecFormat));
        }else{
          row.push(data[i].lastUse);
        }
      }
      if(showFullPath){
        row.push(data[i].fullPath);
      }
      result.resultset.push(row);
    }

    return result;
  },
  getIndexByPath: function(array, path){
    for(i=0;i<array.length;i++){
      if(array[i].fullPath==path){
        return i;
      }
    }
    return -1;
  }
  
});
