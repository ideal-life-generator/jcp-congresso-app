App.Collections.Events = Backbone.Collection.extend({
	model: App.Models.Event,
	url: App.homeUrl + '/events',
    initialize: function(){

    }
});