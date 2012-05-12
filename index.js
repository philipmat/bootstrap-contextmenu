
!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var ContextMenu = function ( element, options ) {
    this.init('contextmenu', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  ContextMenu.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: ContextMenu

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.contextmenu-content > *')[this.isHTML(content) ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = $e.attr('data-content')
        || (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  $.fn.contextmenu = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('contextmenu')
        , options = typeof option == 'object' && option
      if (!data) $this.data('contextmenu', (data = new ContextMenu(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.contextmenu.Constructor = ContextMenu

  $.fn.contextmenu.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , content: ''
  , template: '<div class="contextmenu"><div class="arrow"></div><div class="contextmenu-inner"><div class="contextmenu-content"><p></p></div></div></div>'
  })

}(window.jQuery);
