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
        this.$el.find(".content").append("<div class=\"panel-group minus-side-margin\" id=\"activity-list\"></div>");
        _.map(this.dayGroups, function(activities, day) { this.renderGroups.call(this, activities, day) }, this);
        this.$el.addClass('push-page');

        return this;
    },
    renderGroups: function(activities, day) {
        var collapsible = new App.Views.Collapsible({ model: activities[0].createDate() });
        var listView = new App.Views.Activities({ collection: new App.Collections.Activities(activities) });
        var el = $(collapsible.el).find('.panel-body').append(listView.el);
        $(collapsible.el).addClass('panel-list');
        this.addTime(activities[0], collapsible);
        this.$el.find("#activity-list").append(collapsible.el);
    },
    addTime: function(day, collapsible) {
        var currentDate = new Date();
        var date = new Date(day.get('startTime'));
        if(currentDate > date) {
            $(collapsible.el).addClass('previous');
        } else {
            $(collapsible.el).addClass('upcoming').find('.panel-collapse').addClass('in');
        }
    }
});
