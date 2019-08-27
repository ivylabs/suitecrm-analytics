
var BSPopOver = BaseComponent.extend({

  ph: undefined,
  content: undefined,
  $overlay: undefined,
  toShow: false,
  options: {},

  update: function(){
    var myself = this;
    
    this.ph = $("#" + this.htmlObject);
    this.ph = this.ph || $('<div>').appendTo($('body'));

    this.options = {
      html: true,
      placement: this.popOverGravity || "auto",
      trigger: this.popOverTrigger || "click",
      title: this.popOverTitle || "",
      content: this.popOverContent || "",
      container: 'body'
    };

    this.options.content = this.ph.find("[data-content]").attr("data-content") || this.options.content;

    if($("#" + this.htmlObject).size() === 0){
      this.toShow = true;
      return;
    }

    if(this.popOverTrigger !== "manual"){
      this.popover(this.ph, this.options);
    }
  },
  popover: function(target,options) {
    var myself = this;
    this.ph = target;
    options = options || this.options;
    options = $.extend({}, this.options, options);
    target.popover(options);

    /* Close on click outside */
    var closeOnClickOutside = typeof this.closeOnClickOutside === "undefined"?false:this.closeOnClickOutside;

    if(this.toShow){
      target.popover("show");
      if(closeOnClickOutside){
        // Define an overlay so that we can click
        if(!this.$overlay){
          this.$overlay = $('<div class="BSPopOverComponentOverlay"></div>');
        }
        this.$overlay.appendTo("body").click(function(event){
          myself.hide();
        })
      }

      return;
    }

    target.on('show.bs.popover', function () {
      if(closeOnClickOutside){
        // Define an overlay so that we can click
        if(!myself.$overlay){
          myself.$overlay = $('<div class="BSPopOverComponentOverlay"></div>');
        }
        myself.$overlay.appendTo("body").click(function(event){
          myself.hide();
        })
      }
    });

  },

  hide: function() {
    this.ph.popover('hide');
    if(this.$overlay){
      this.$overlay.unbind('click');
      this.$overlay.detach();
    }
  },

  destroy: function() {
    this.ph.popover('destroy');
    if(this.$overlay){
      this.$overlay.unbind('click');
      this.$overlay.detach();
    }
  }

});