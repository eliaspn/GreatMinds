/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
var app = app || {};

(function () {
	'use strict';
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

	var PersonDetails = app.PersonDetails;
	app.PersonDetails = React.createClass({
		render: function () {
			return (
				<tr>
					<td data-th="Name">{this.props.personDetails.Name}</td>
					<td data-th="Year of birth">{this.props.personDetails.YearOfBirth}</td>
					<td data-th="Mother">{this.props.personDetails.Mother}</td>
				</tr>
			);
		}
	});

	app.LoadChildrens = React.createClass({
		mixins: [Backbone.React.Component.mixin],
		componentDidMount:function() {
		},
		render: function() {
			//parse model and get only the object
			var personsDetailsObject = this.props.model.attributes;
			var personDetailsOnly = [];
			Object.keys(personsDetailsObject).forEach(function (key){
    			if (_.isObject(personsDetailsObject[key])) {
    				 personDetailsOnly.push(personsDetailsObject[key]);
    			}
    		});
			var personDetailsItem = personDetailsOnly.map(function (details){
    				return (
						<app.PersonDetails
							key = { details.YearOfBirth }
							personDetails = {details}
						/>
					);

			});




		

			return (
			<table>
				<thead>
					<tr>
						<td>Name</td>
						<td>Year of Birth</td>
						<td>Mother</td>
					</tr>
				</thead>
				<tbody>
				{personDetailsItem}
				</tbody>
			</table>
		);
		}
	});

})();	