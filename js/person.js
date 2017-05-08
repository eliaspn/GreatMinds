/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	app.Person = Backbone.Model.extend({
		defaults: {
			Name: '',
			YearOfBirth: '',
			NumChildren: 0,
			Profession: '',
		},
		initialize: function(options){
			this.id = options.param;
		},
		idAttribute: 'Id',
		urlRoot: function(){
			return "http://assignment.siteimprove.com/api/persondetails/" + this.id;
		 }

	});
})();
