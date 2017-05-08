/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	var Persons = Backbone.Collection.extend({
		model: app.Person,
		initialize: function(options) {
		},
		url: function() {
			return 'http://assignment.siteimprove.com/api/persons';
		},
	});
	
	app.persons = new Persons();
	
})();
