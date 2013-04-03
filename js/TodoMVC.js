/*global Backbone, JST */
'use strict';

// Override the Marionette rendering process to use the JST compiled templates
Backbone.Marionette.Renderer.render = function(template, data){
  if (!JST['templates/' + template]) throw "Template '" + template + "' not found!";
  return JST['templates/' + template](data);
};

var TodoMVC = new Backbone.Marionette.Application();

TodoMVC.addRegions({
	header: '#header',
	main: '#main',
	footer: '#footer'
});

TodoMVC.on('initialize:after', function () {
	Backbone.history.start();
});
