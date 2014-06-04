App.Views.ActivityRate = App.Components.View.extend({
    tagName: 'li',
    initialize: function() {
        this.template = _.template(App.tpl.get('activities-item-rate-list'));
        this.render();
    },
    render: function() {
        this.$el.append(this.template(this.model.toJSON()));

        return this;
    }
});
