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

	var LoadChildrens = app.LoadChildrens;

	app.PersonItem = React.createClass({
		getInitialState: function () {
			return {showChildrens: ''};
		},
		handleClick: function(e) {
			let show = this.state.showChildrens;
			let index = show.indexOf('show');
			if (index != -1) {
		          show = '';
		    } else {
		        show = 'show';
		    }
	      this.setState({ showChildrens: show });
	      event.preventDefault();
		},

		render: function () {
			var loadChildrens; 
			if (this.state.showChildrens) {
				var model = new app.Person({param: this.props.person.get('Id')});
 				var childrenss = model.fetch({async: false, success: function(resp) {
 					
 					loadChildrens = (
						<app.LoadChildrens model={ resp }/>
					);
    		    }}
        );
			
			}

			return (
				<tr>
					<td data-th="Name">{this.props.person.get('Name')}</td>
					<td data-th="Year of birth">{this.props.person.get('YearOfBirth')}</td>
					<td data-th="Children" onClick={this.handleClick}>{this.props.person.get('NumChildren')}
						{this.state.showChildrens  ? loadChildrens : '' }
					</td>
					<td data-th="Profession">{this.props.person.get('Profession')}</td>
				</tr>
			);
		}
	});
})();