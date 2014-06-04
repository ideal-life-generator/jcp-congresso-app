App.Views.ActivitiesRatePage = App.Components.View.extend({
    initialize: function() {
        this.template = _.template(App.tpl.get('page-rate-sessions'));
        this.render();
    },
    events: {
        'input input': 'updateActivities'
    },
    render: function() {
        var layout = new App.Views.Layout();
        this.$el.append(layout.el); // add layout

        var list = new App.Views.ActivitiesRate({ collection: this.collection });
        this.$el.find(".content").append(this.template({}));
        this.$el.find(".panel-list").append(list.el);

        this.$el.addClass('push-page');

        return this;
    },
    updateActivities: function(e) {
        var filterEls = this.collection.filter(function(activity) {
            return activity.get('name').toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) >= 0;
        });
        var filterCol = new App.Collections.Activities(filterEls);
        var list = new App.Views.ActivitiesRate({ collection: filterCol });
        this.$el.find(".panel-list").html(list.el);
    }
});
