app.Views.Layout = Backbone.View.extend({
    initialize: function() {
        this.template = _.template(app.tpl.get('main-layout'));
        this.render();
    },
    render: function() {
        this.$el.html(this.template({}));
        return this;
    }
});
