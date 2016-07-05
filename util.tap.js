
(function($){
	'use strict';
	
	var lastClick = 0, oldon = $.fn.on, oldoff = $.fn.off;
	
	$.fn.off = function(event, fn) {
		return event !== 'tap' ? oldoff.call(this, event, fn) : this.each(function(item){ item._tap = fn; }).off('touchstart', onTouchStart).off('touchmove', onTouchMove).off('touchend', onTouchEnd).off('click', onClick).each(function(item){ delete item._tap; delete item._x; delete item._y });
	}
		
	$.fn.on = function(event, fn) {
		return event !== 'tap' ? oldon.call(this, event, fn) : this.each(function(item){ item._tap = fn; }).on('touchstart', onTouchStart).on('click', onClick);
	}

	function onTouchStart(e) {
		e.stopPropagation();

		var touch = e.touches[0];

		this._x = touch.clientX;
		this._y = touch.clientY;

		this.addEventListener('touchmove', onTouchMove, false);
		this.addEventListener('touchend', onTouchEnd, false);
	}

	function onTouchMove(e) {
		var touch = e.targetTouches[0];
		if (!touch || Math.sqrt((this._x-touch.clientX)*(this._x-touch.clientX)+(this._y-touch.clientY)*(this._y-touch.clientY)) > 5) {
			$(this).off('touchmove', onTouchMove, false).off('touchend', onTouchEnd, false);
		}
	}

	function onTouchEnd(e) {
		onClick.call(this, e);
		$(this).off('touchmove', onTouchMove).off('touchend', onTouchEnd);
	}

	function onClick(e) {
		e.stopPropagation();
		// avoid ghostclicks
		if (Date.now() - lastClick > 500) {
			lastClick = Date.now();
			this._tap && this._tap.call(this, e);
		}
	}
	
}(window.$));