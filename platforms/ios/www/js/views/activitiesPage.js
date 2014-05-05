App.Views.ActivitiesPage = App.Components.View.extend({
    initialize: function() {
        this.dayGroups = this.collection.groupBy(function(activity) {
            var date = new Date(activity.get('startTime'));
            return date.getDate();
        });
        this.render();
    },
    render: function() {
        var layout = new App.Views.Layout();
        this.$el.append(layout.el); // add layout
        this.$el.find(".content").append("<div class=\"panel-group\" id=\"accordion\"></div>");
        _.map(this.dayGroups, function(activities, day) { this.renderGroups.call(this, activities, day) }, this);
        this.$el.addClass('push-page');

        return this;
    },
    renderGroups: function(activities, day) {
        var collapsible = new App.Views.Collapsible({ model: activities[0].createDate() });
        var listView = new App.Views.Activities({ collection: new App.Collections.Activities(activities) });
        var el = $(collapsible.el).find('.panel-body').append(listView.el);
        this.$el.find("#accordion").append(collapsible.el);
    }
});
