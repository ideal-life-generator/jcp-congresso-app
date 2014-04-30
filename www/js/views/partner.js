App.Views.Partner = App.Components.View.extend({
    tagName: 'li',
    attributes: {
        "class": "list-group-item"
    },
    initialize: function() {
        this.template = _.template(App.tpl.get('partner-list-item'));
        this.render();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    }
});
