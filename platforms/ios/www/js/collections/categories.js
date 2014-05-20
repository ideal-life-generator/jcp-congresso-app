App.Collections.Categories = Backbone.Collection.extend({
    model: App.Models.Category,
    url: App.homeUrl + '/categories',
    initialize: function(){

    }
});