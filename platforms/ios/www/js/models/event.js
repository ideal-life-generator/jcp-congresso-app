app.Models = {};
app.Views = {};
app.Collections = {};

app.Models.Event = Backbone.Model.extend({
	initialize: function(){
	},
	defaults: {
		id: '0',
		startDate: '2014',
		endDate: '2015',
		location: 'Oslo',
		eventName: 'Community'
	}
});