/* Bootstrap style pagination control */
$.extend( $.fn.dataTableExt.oPagination, {
  "bootstrap_two_buttons": {
    "fnInit": function( oSettings, nPaging, fnCallbackDraw ) {
      var oLang = oSettings.oLanguage.oPaginate;
      var fnClickHandler = function (e) {
        if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
          fnCallbackDraw(oSettings);
        }
      };

      $(nPaging).append(
        '<ul class="pagination">'+
          '<li class="prev disabled"><a class="btn" tabindex="' + oSettings.iTabIndex + '" role="button">&larr; '+oLang.sPrevious+'</a></li>'+
          '<li class="next disabled"><a class="btn" tabindex="' + oSettings.iTabIndex + '" role="button">'+oLang.sNext+' &rarr; </a></li>'+
        '</ul>'
      );
      var els = $('a', nPaging);
        var nPrevious = els[0],
          nNext = els[1];

        oSettings.oApi._fnBindAction(nPrevious, {
          action: "previous"
        }, fnClickHandler);
        oSettings.oApi._fnBindAction(nNext, {
          action: "next"
        }, fnClickHandler);

        /* ID the first elements only */
        if (!oSettings.aanFeatures.p) {
          nPaging.id = oSettings.sTableId + '_paginate';
          nPrevious.id = oSettings.sTableId + '_previous';
          nNext.id = oSettings.sTableId + '_next';

          nPrevious.setAttribute('aria-controls', oSettings.sTableId);
          nNext.setAttribute('aria-controls', oSettings.sTableId);
        }
    },

      "fnUpdate": function (oSettings, fnCallbackDraw) {
        if (!oSettings.aanFeatures.p) {
          return;
        }

        var oClasses = oSettings.oClasses;
        var an = oSettings.aanFeatures.p;
        var nNode;

        /* Loop over each instance of the pager */
        for (var i = 0, iLen = an.length; i < iLen; i++) {
          nNode = an[i].firstChild.firstChild;
          if (nNode) {
            /* Previous page */
            nNode.className = (oSettings._iDisplayStart === 0) ? "disabled" : "";

            /* Next page */
            nNode = nNode.nextSibling;
            nNode.className = (oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay()) ? "disabled" : "";
          }
        }
      }
  }
} );


var BSDataGridBaseComponent = TableComponent.extend({
  
  beforeProcessTableComponentResponse: TableComponent.prototype.processTableComponentResponse,
  beforeUpdate: TableComponent.prototype.update,
  type: "Table",

  update: function() {

    this.extraOptions.push(["sPaginationType",this.chartDefinition.bsPaginationType]);
    this.chartDefinition["tableStyle"] = "classic";
    this.chartDefinition["sDom"] = "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-6'i><'col-md-6'p>>";

    try {
      this.beforeUpdate();
    } catch (e) { console.log(e); }

  },
  

  processTableComponentResponse: function(json) {
    var myself = this;
    try {
      this.beforeProcessTableComponentResponse(json);
    } catch (e) { console.log(e); }

    if(this.tableResponsive){
      this.ph.find("table").wrap( document.createElement( "div" ) );
      this.ph.find("table").parent().addClass((this.tableResponsive?"table-responsive":"table"));
    }

    this.ph.find("table").addClass('table ' + (this.tableStriped?"table-striped":"") + 
      " " + (this.tableBordered?"table-bordered":"") + 
      " " + (this.tableHover?"table-hover":"") + 
      " " + (this.tableCondensed?"table-condensed":""));

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

    if(!this.chartDefinition.headerEnabled){
      this.ph.find("thead tr th").each(function(index,value){
        var widthCSS = $(value).css("width");
        if(value.style != undefined && value.style.width != undefined){
          widthCSS = value.style.width;
        }
        var l = myself.ph.find("tbody tr").size();
        for(i=0; i < l; i++){
          $($(myself.ph.find("tbody tr").get(i)).find("td").get(index)).css("width",widthCSS);
        }
      });
      this.ph.find("thead").hide();
    }

  }

});