App.Collections.Activities = Backbone.Collection.extend({
    model: App.Models.Activity,
    url : function() {
        return App.homeUrl + '/activities?eventId=' + this.eventId;
    }
});
