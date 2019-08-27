
;(function (){

  /*
    Sample with all possible properties:
      {
        cssClass: ["btn-group"],
        align: "center",
        buttons:[
          {
            cssClass: ["btn", "btn-default"],
            icon: {
              cssClass: ["glyphicon", "glyphicon-plus"],
              prepend: true
            },
            title: "View",
            tooltip: "View",
              action: function(tgt, st, opt) {
                Dashboards.log(tgt);
              }
          }
        ]
      }
  */

  var actionButtonsOpts = {
    name: "bsButtons",
    label: "Action Buttons",
    defaults: {
      cssClass: ["btn-group"],
      buttons:[
        {
          cssClass: ["btn", "btn-default"],
          title: "View",
          tooltip: "View",
            action: function(tgt, st, opt) {
              Dashboards.log(tgt);
            }
        }
      ]
    },

    init: function(){
        $.fn.dataTableExt.oSort[this.name+'-asc'] = $.fn.dataTableExt.oSort['string-asc'];
        $.fn.dataTableExt.oSort[this.name+'-desc'] = $.fn.dataTableExt.oSort['string-desc'];
    },
    
    implementation: function(tgt, st, opt){
      var $buttonContainer = $('<div/>').addClass('buttonContainer').addClass(opt.cssClass?opt.cssClass.join(" "):"")
        .addClass('numButtons-' + opt.buttons.length);
        var val = [st.value||""];
        if(st.value){val = st.value.split(",");}

      _.each(opt.buttons, function(el,idx){
        var $button = $("<button/>").addClass(el.cssClass.join(" ")||"").text(el.title||"").attr('title', el.tooltip||"");
        if(el.icon != undefined){
          var $icon = $("<i/>").addClass(el.icon.cssClass.join(" "));
          if(el.icon.prepend){
            $button.prepend($icon);
          }else{
            $button.append($icon);
          }
        }
        $button.click(function(){
          if (el.action) {
            el.action(val[idx]||"",tgt, st, opt);
          }
        });
        $buttonContainer.append($button);
      });

      if(opt.align === "center"){
        $buttonContainer = $('<center/>').append($buttonContainer);
      }else{
        $buttonContainer.addClass("pull-"+opt.align||"");
      }

      $(tgt).empty().append($buttonContainer);
    }

    };
    Dashboards.registerAddIn("Table", "colType", new AddIn(actionButtonsOpts));
  
})(); 