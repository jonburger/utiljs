
(function($){
	'use strict';

	$.ajax = function(url, options) {
		return new Promise(function(resolve, reject) {
			var req = new XMLHttpRequest();
			
			req.open(options && options.method || 'GET', url);

			req.onload = function() {
				// This is called even on 404 etc
				// so check the status
				if (req.status == 200) {
					// Resolve the promise with the response text
					resolve(req.response);
				}
				else {
					// Otherwise reject with the status text
					// which will hopefully be a meaningful error
					reject(Error(req.statusText));
				}
			};

			// Handle network errors
			req.onerror = function() {
				reject(Error("Network Error"));
			};

			// Make the request
			req.send();
		});
	};

	$.get = function(url, options) {
		return $.ajax(url, $.extend({}, options || {}, { method: 'GET' }));
	};

	$.post = function(url, options) {
		return $.ajax(url, $.extend({}, options || {}, { method: 'POST' }));
	};
	
}(window.$));