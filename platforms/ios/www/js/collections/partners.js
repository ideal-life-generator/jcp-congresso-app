App.Collections.Partners = Backbone.Collection.extend({
    model: App.Models.Partner,
    url: App.homeUrl + '/partners',
    initialize: function(){

    }
});
