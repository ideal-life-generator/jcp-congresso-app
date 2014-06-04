App.Views.ActivitiesRate = App.Components.View.extend({
    tagName: 'ul',
    initialize: function() {
        this.render();
    },
    render: function() {
        this.collection.each(function(activity) {
            var rateView = new App.Views.ActivityRate({ model: activity });
            this.$el.append(rateView.el);
        }, this);
        this.addAttributes();
        return this;
    },
    addAttributes: function() {
        this.$el.attr({
            "id": "event-list"
        });
    }
});
