
(function(){
	'use strict';
	
	window.$ = (function(array, document, undefined) {
		
		function $(selector, scope) {
			return $.type(selector, 'Function') ? document.readyState === 'complete' ? selector() : $(document).on('DOMContentLoaded', selector) : new _(selector, scope);
		}
		
		function _(selector, scope) {
			array.push.apply(this, selector && selector.nodeType ? [selector] : $.type(selector, 'String') ? (scope && (scope.nodeType && scope || scope[0].nodeType && scope[0]) || document).querySelectorAll(selector) : undefined);
		}
		
		$.fn = _.prototype = {
			length: 0,
			splice: array.splice,
			
			each: function(fn, scope) {
				array.forEach.call(this, fn, scope);
				return this;
			},
			on: function(event, fn) {
				return this.each(function (item) {
					item.addEventListener(event, fn);
				});
			},
			one: function(event, fn) {
				return this.on(event, function cb(e){
					$(this).off(event, cb);
					fn.call(this, e);
				});
			},
			off: function(event, fn) {
				return this.each(function (item) {
					item.removeEventListener(event, fn);
				});
			},
			addClass: function(classes) {
				return this.toggleClass(classes, true);
			},
			removeClass: function(classes) {
				return this.toggleClass(classes, false);
			},
			toggleClass: function(classes, add) {
				if ($.type(classes, 'String')) classes = classes.split(/\s+/g);
				return this.each(function (item) {
					classes.forEach(function(classname) {
						item.classList[add === undefined ? 'toggle' : add && 'add' || 'remove'](classname);
					});
				});
			},
			attr: function(name, value) {
				if (value === undefined) return this[0] && this[0].getAttribute(name) || '';
				return this.each(function (item) {
					item.setAttribute(name, value);
				});
			},
			prop: function(name, value) {
				if (value === undefined) return this[0] && this[0][name] || '';
				return this.each(function (item) {
					item[name] = value;
				});
			}
		};
		
		$.type = function (object, type) {
			var t = ({}).toString.call(object).slice(8,-1);
			return type ? t === type : t;
		};
		
		$.extend = function (target) {
			target = target || {};
			
			array.slice.call(arguments, 1).forEach(function (source) {
				for (var property in source) {
					if (source.hasOwnProperty(property)) {
						if ($.type(source[property], 'Object')) {
							target[property] = $.extend(target[property] || {}, source[property]);
						} else {
							target[property] = source[property];
						}
					}
				}
			});
			
			return target;
		};
		
		return $;
	}([], document));
	
}());