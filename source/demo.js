$(function() {

	'use strict';

	var motify = window.motify;

	$('body').on('click', '.js-fn-test', function(event) {
		event.preventDefault();

		var el = $(event.target);
		var fnName = el.data('fn-name');
		var fnArgs = el.data('fn-args') || '';

		motify[fnName](fnArgs);
		console.log('Fn:' + fnName + '() is called!');
	});
});
