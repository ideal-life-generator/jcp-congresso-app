App.Collections.Questions = Backbone.Collection.extend({
    model: App.Models.Partner,
    url: App.homeUrl + '/questions',
    initialize: function(){

    }
});
