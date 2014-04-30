App.Views.Activity = App.Components.View.extend({
    tagName: 'li',
    attributes: {
        "class": "list-group-item"
    },
    initialize: function() {
        this.template = _.template(App.tpl.get('activities-item-list'));
        this.render();
    },
    render: function() {
        this.$el.append(this.template(this.model.toJSON()));

        return this;
    }
});
