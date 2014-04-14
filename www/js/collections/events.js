app.Collections.Events = Backbone.Collection.extend({
	model: app.Models.Event,
	url: 'http://localhost:2403/events',
    initialize: function(){

    }
});