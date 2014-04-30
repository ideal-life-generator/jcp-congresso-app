App.Views.Activities = App.Components.View.extend({
    tagName: 'ul',
    initialize: function() {
        this.groups = this.collection.groupBy(function(activity) {
            return activity.get('startTime');
        });
        this.render();
    },
    render: function() {
        _.map(this.groups, function(activities, startTime) { this.renderGroups.call(this, startTime, activities) }, this);
        this.addAttributes();
    },
    makeDivider: function(name) {
        var value = "<li data-role=\"table-view-cell table-view-divider\">" + name + "</li>";
        return $(value);
    },
    renderGroups: function(startTime, activities) {
        this.$el.append(this.makeDivider(activities[0].createTime()));
        _.each(activities, function(activity) {
            var viewActivity = new App.Views.Activity({ model: activity });
            this.$el.append(viewActivity.el);
        }, this);
    },
    addAttributes: function() {
        this.$el.attr({
            "class": "list-group"
        });
    }
});
