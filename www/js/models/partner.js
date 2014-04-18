App.Models.Partner = Backbone.Model.extend({
    initialize: function() {

    },
    defaults: {
        id: 0,
        name: "Atea",
        category: "IT"
    },
    url: App.homeUrl + '/partners'
});
