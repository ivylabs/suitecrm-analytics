 

$.fn.pageMe = function(opts){
    var $this = this,
        defaults = {
            perPage: 7,
            showPrevNext: false,
            numbersPerPage: 5,
            hidePageNumbers: false
        },
        settings = $.extend(defaults, opts);
    
    var listElement = $this;
    var perPage = settings.perPage; 
    var children = listElement.children();
    var pager = $('.pagination');
    
    if (typeof settings.childSelector!="undefined") {
        children = listElement.find(settings.childSelector);
    }
    
    if (typeof settings.pagerSelector!="undefined") {
        pager = $(settings.pagerSelector);
    }
    
    var numItems = children.size();
    var numPages = Math.ceil(numItems/perPage);

    pager.data("curr",0);
    
    if (settings.showPrevNext){
        $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
    }
    
    var curr = 0;
    while(numPages > curr && (settings.hidePageNumbers==false)){
        $('<li><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo(pager);
        curr++;
    }
  
    if (settings.numbersPerPage>1) {
       $('.page_link').hide();
       $('.page_link').slice(pager.data("curr"), settings.numbersPerPage).show();
    }
    
    if (settings.showPrevNext){
        $('<li><a href="#" class="next_link">»</a></li>').appendTo(pager);
    }
    
    pager.find('.page_link:first').addClass('active');
    pager.find('.prev_link').hide();
    if (numPages<=1) {
        pager.find('.next_link').hide();
    }
    if (settings.showPrevNext){
      pager.children().eq(1).addClass("active");
    }else{
      pager.children().eq(0).addClass("active");
    }
    
    children.hide();
    children.slice(0, perPage).show();
    
    pager.find('li .page_link').click(function(){
        var clickedPage = $(this).html().valueOf()-1;
        goTo(clickedPage,perPage);
        return false;
    });
    pager.find('li .prev_link').click(function(){
        previous();
        return false;
    });
    pager.find('li .next_link').click(function(){
        next();
        return false;
    });
    
    function previous(){
        var goToPage = parseInt(pager.data("curr")) - 1;
        goTo(goToPage);
    }
     
    function next(){
        goToPage = parseInt(pager.data("curr")) + 1;
        goTo(goToPage);
    }
    
    function goTo(page){
        var startAt = page * perPage,
            endOn = startAt + perPage;
        
        children.css('display','none').slice(startAt, endOn).show();
        
        if (page>=1) {
            pager.find('.prev_link').show();
        }
        else {
            pager.find('.prev_link').hide();
        }
        
        if (page<(numPages-1)) {
            pager.find('.next_link').show();
        }
        else {
            pager.find('.next_link').hide();
        }
        
        pager.data("curr",page);
       
        if (settings.numbersPerPage>1) {
          $('.page_link').hide();
          $('.page_link').slice(page, settings.numbersPerPage+page).show();
      }
      
        pager.children().removeClass("active");
        if (settings.showPrevNext){
          pager.children().eq(page+1).addClass("active");
        }else{
          pager.children().eq(page).addClass("active");
        }
    
    }
};

var BSTableComponent = UnmanagedComponent.extend({

  ph: undefined,

  type: "Table",

  update: function() {
    if(!this.preExec()){
      return;
    }
    if(!this.htmlObject) {
      return this.error("BSTableComponent requires an htmlObject");
    }
    try{
      	this.setup();

	    /* The non-paging query handler only needs to concern itself
	     * with handling postFetch and calling the draw function
	     */
	    var success = _.bind(function(data){
	      this.rawData = data;
	      this.processTableComponentResponse(data)
	    },this);
      var handler = this.getSuccessHandler(success);

	    this.queryState.setAjaxOptions({async:true});
	    this.queryState.fetchData(this.parameters == undefined ? [] : this.parameters, handler);
    } catch (e) {
      /*
       * Something went wrong and we won't have handlers firing in the future
       * that will trigger unblock, meaning we need to trigger unblock manually.
       */
      this.dashboard.error(e);
    }
  },

  processTableComponentResponse : function(json) {
    var myself = this,
        cd = this.chartDefinition,
        extraOptions = {};

    this.ph.trigger('cdfBSTableComponentProcessResponse');

    // Set defaults for headers / types
    if(typeof cd.colHeaders === "undefined" || cd.colHeaders.length == 0)
      cd.colHeaders = json.metadata.map(function(i){return i.colName});

    if(typeof cd.colTypes === "undefined" || cd.colTypes.length == 0)
      cd.colTypes = json.metadata.map(function(i){return i.colType.toLowerCase()});

    var htmlObj = $('<div class="' + (this.tableResponsive?"table-responsive":"table") + '"><table id="' + this.htmlObject + 'Table" class="bsTableComponent table '+
      (this.tableStriped?"table-striped":"") + " " + (this.tableBordered?"table-bordered":"") + " " + (this.tableHover?"table-hover":"") + " " + (this.tableCondensed?"table-condensed":"") + " " + 
      '"><thead><tr></tr></thead></table></div>'+
      (this.tablePaginate?('<div class="col-md-12 text-center"><ul class="pagination" id="' + this.htmlObject + 'TablePaginate"></ul></div>'):""));
    
    for(var i = 0; i < json.metadata.length; i++){
      var widthStyle = (cd.colWidths[i]?' style="width: ' + cd.colWidths[i] + ';"':'');
      htmlObj.find('thead tr').append('<th' + widthStyle + '>' + cd.colHeaders[i] + '</th>');
    }

    if(!this.chartDefinition.headerEnabled){
      htmlObj.find("thead").hide();
    }
    
    htmlObj.find('table.table').append('<tbody id="' + this.htmlObject + 'TableBody"></tbody>');
    for(var i = 0; i < json.resultset.length; i++){
      htmlObj.find('tbody').append('<tr></tr>');
      for(var j = 0; j < json.resultset[i].length; j++){
        htmlObj.find('tbody tr:last').append('<td>'+(json.resultset[i][j]==null?"":json.resultset[i][j])+'</td>');
      }
    }
    
    htmlObj.find("thead tr th").each(function(index,value){
      var widthCSS = $(value).css("width");
      if(value.style != undefined && value.style.width != undefined){
        widthCSS = value.style.width;
      }
      var l = htmlObj.find("tbody tr").size();
      for(i=0; i < l; i++){
        $($(htmlObj.find("tbody tr").get(i)).find("td").get(index)).css("width",widthCSS);
      }
    });
    
    this.ph.empty();
    this.ph.append(htmlObj);

    this.fnDrawCallback();

    if(this.tablePaginate){
      $('#'+this.htmlObject + 'TableBody').pageMe({
        pagerSelector: '#' + this.htmlObject + 'TablePaginate',
        showPrevNext: this.tablePaginateShowPrevNext,
        hidePageNumbers: this.tablePaginateHidePageNumbers,
        perPage: this.tablePaginateRowPerPage,
        numbersPerPage: this.tableNumbersPerPage
      });
    }

    myself.ph.find ('table').bind('click',function(e) {
      if (typeof cd.clickAction === 'function' || myself.expandOnClick) { 
        var state = {},
          target = $(e.target),
          results = myself.rawData; 
        if(!(target.parents('tbody').length)) {
          return;
        } else if (target.get(0).tagName != 'TD') {
          target = target.closest('td');
        }
        var position = [$(this).find("tbody").find(target).parent().parent().children().index(target.parent()), $(this).find("tbody").find(target).parent().children().index(target)];
        state.rawData = myself.rawData;
        state.colIdx = position[1];
        state.rowIdx = position[0];
        state.series = results.resultset[state.rowIdx][0];
        
        state.category = results.metadata[state.colIdx].colName;
        state.value =  results.resultset[state.rowIdx][state.colIdx];
        state.colFormat = cd.colFormats[state.colIdx];           

          
        state.target = target;

        if ( cd.clickAction  ){
          cd.clickAction.call(myself,state);
        }
      }
    });


    this.fnInitComplete();


    myself.ph.trigger('cdfBSTableComponentFinishRendering');
  },

  setup: function() {
    var cd = this.chartDefinition;
    if (cd == undefined){
      Dashboards.log("Fatal - No chart definition passed","error");
      return;
    }
    cd["tableId"] = this.htmlObject + "Table";

    // Clear previous table
    this.ph = $("#"+this.htmlObject).empty();
    // remove drawCallback from the parameters, or
    // it'll be called before we have an actual table...
    var croppedCd = $.extend({},cd);
    croppedCd.drawCallback = undefined;
    this.queryState = Dashboards.getQuery(croppedCd);
    this.query = this.queryState; // for analogy with ccc component's name
    // make sure to clean sort options
    var sortBy = this.chartDefinition.sortBy || [],
      sortOptions = [];
    for (var i = 0; i < sortBy.length; i++) {
      var col = sortBy[i][0];
      var dir = sortBy[i][1];
      sortOptions.push( col + (dir == "asc" ? "A" : "D"));
    }
    this.queryState.setSortBy(sortOptions);
  },

  /* 
   * Resolve and call addIns for the given td in the context of the given 
   * dataTable. Returns true if there was an addIn and it was successfully
   * called, or false otherwise.
   */
  handleAddIns: function(position, td) {
    var cd = this.chartDefinition,
        rowIdx = position[0],
        colIdx = position[1],
        colType = cd.colTypes[colIdx],
        addIn = this.getAddIn("colType",colType),
        state = {},
        target = $(td),
        results = this.rawData;

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
      state.tableData = results.resultset;
      state.colIdx = colIdx;
      state.rowIdx = rowIdx;
      state.series = results.resultset[state.rowIdx][0];
      state.category = results.metadata[state.colIdx].colName;
      state.value =  results.resultset[state.rowIdx][state.colIdx];
      if(cd.colFormats) {
        state.colFormat = cd.colFormats[state.colIdx];
      }
      state.target = target;
      addIn.call(td,state,this.getAddInOptions("colType",addIn.getName()));
      return true;
    } catch (e) {
      this.dashboard.error(e);
      return false;
    }
  },
  
  /* 
   * Callback for when the table is finished drawing. Called every time there
   * is a redraw event (so not only updates, but also pagination and sorting).
   * We handle addIns and such things in here.
   */
  fnDrawCallback: function() {
    var cd = this.chartDefinition,
        myself = this,
        handleAddIns = _.bind(this.handleAddIns,this);
    this.ph.find("tbody tr").each(function(row,tr){

      var position = [row];

      $(tr).children("td").each(function(col,td){
          position = [position[0], col];

          var foundAddIn = handleAddIns(position, td);
          /* 
           * Process column format for those columns
           * where we didn't find a matching addIn
           */
          if(!foundAddIn && cd.colFormats) {
            var rowIdx = position[0],
                colIdx = position[1],
                format = cd.colFormats[colIdx],
                value = myself.rawData.resultset[rowIdx][colIdx];
            if (format && (typeof value != "undefined" && value !== null)) {
              $(td).text(sprintf(format,value));
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
    this.postExec();
  },
	
});
