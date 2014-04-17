app.Collections.Partners = Backbone.Collection.extend({
    model: app.Models.Partner,
    url: 'http://localhost:2403/partners',
    initialize: function(){

    }
});
