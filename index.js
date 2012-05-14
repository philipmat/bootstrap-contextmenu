
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

		, show: function() {
			this.closeAllMenus()

			var $tip
				, inside
				, pos
				, actualWidth
				, actualHeight
				, placement
				, tp

			if (this.hasContent() && this.enabled) {
				$tip = this.tip()

				if (this.options.animation) {
					$tip.addClass('fade')
				}

				placement = typeof this.options.placement == 'function' ?
					this.options.placement.call(this, $tip[0], this.$element[0]) :
						this.options.placement

				inside = /in/.test(placement)


				$tip
					.remove()
					.css({ top: 0, left: 0, display: 'block' })
					.appendTo(inside ? this.$element : document.body)

				this.setContent()

				pos = this.getPosition(inside)

				actualWidth = $tip[0].offsetWidth
				actualHeight = $tip[0].offsetHeight
				switch (inside ? placement.split(' ')[1] : placement) {
					case 'bottom':
						tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
						break
					case 'top':
						tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
						break
					case 'left':
						tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
						break
					case 'right':
						tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
						break
				}

			$tip
				.css(tp)
				.addClass(placement)
				.addClass('in')
			}
		}

		, setContent: function () {
			var $tip = this.tip()
				, contentId
				, $e = this.$element
				, o = this.options

			contentId = $e.data().target
				|| (typeof o.target == 'function' ? o.content.call($e[0]) :	o.target)

			var el = $e.siblings('#' + contentId).first();
			el = el.clone(true, true).removeClass('hide')

			$tip.find('.contextmenu-content > *').replaceWith(el)

			var close = this.closeAllMenus;
			$('.btn', $tip).each(function(ix, aLink) {
				$(aLink).on('click', function() { close() })
			})

			$tip.removeClass('fade top bottom left right in')
		}

		, hasContent: function () {
			return true
			//return this.$element.data().target || (this.$element.Y
		}

		, tip: function () {
			if (!this.$tip) {
				this.$tip = $(this.options.template)
			}
			return this.$tip
		}
		, closeAllMenus: function() {
			$('.contextmenu').remove()
		}
	})

	/* CONTEXT PLUGIN DEFINITION
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
		, trigger: 'manual'
		, content: ''
		, template: '<div class="contextmenu"><div class="arrow"></div><div class="contextmenu-inner"><div class="contextmenu-content"><p></p></div></div></div>'
	})

	$(function() {
	   $('html')
		   .on('click.contextmenu.data-api', ContextMenu.prototype.closeAllMenus)
	   $('body')
		   .on('click.contextmenu.data-api', ContextMenu.prototype.closeAllMenus)
	})

}(window.jQuery);
