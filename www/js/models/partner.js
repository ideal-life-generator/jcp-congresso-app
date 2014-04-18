App.Models.Partner = Backbone.Model.extend({
    initialize: function() {

    },
    url : function() {
        return App.homeUrl + '/partners/' + this.id;
    }
});
