/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Backbone */
var app = app || {};

(function () {
	'use strict';

	var Person = app.Person;
	var PersonItem  = app.PersonItem;
	
	var BackboneMixin = {
		componentDidMount: function() {
			// Whenever there may be a change in the Backbone data, trigger a
			// reconcile.
			this.getBackboneCollections().forEach(function (collection) {
				// explicitly bind `null` to `forceUpdate`, as it demands a callback and
				// React validates that it's a function. `collection` events passes
				// additional arguments that are not functions
				collection.on('add remove change', this.forceUpdate.bind(this, null));
			}, this);
		},
		componentWillUnmount: function() {
			// Ensure that we clean up any dangling references when the component is
			// destroyed.
			this.getBackboneCollections().forEach(function (collection) {
				collection.off(null, null, this);
			}, this);
		}
	};

	var GmApp = React.createClass({
		mixins: [BackboneMixin],
		getBackboneCollections: function() {
			return [this.props.persons]
		},


		componentDidMount: function(){
			var Router = Backbone.Router.extend({
				routes: {
					'': 'all'
				},
				all: ''
			});
			new Router();
			Backbone.history.start();
			this.props.persons.fetch();
		},
		render: function() {
			var persons = this.props.persons;
			var personItem = persons.map(function(person) {
				return (					
					<PersonItem
						key = {person.get('Id')}
						person = {person}
					/>
				);
			});
			return (
				<table aria-labelledby="gm-caption" aria-describedby="gm-summary">
				<thead>
					<tr>
						<th>Name</th>
						<th>Year of birth</th>
						<th>Children</th>
						<th>Profession</th>
						</tr>
					</thead>
					<tbody>
						{personItem}
					</tbody>
				</table>
			);	
		}
	});
	setTimeout(function(){
		ReactDOM.render(
			<GmApp persons={app.persons} />,
			document.getElementsByClassName('greatmindapp')[0]
		);
	},3000);
})();
