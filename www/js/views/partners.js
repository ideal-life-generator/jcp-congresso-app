App.Views.Partners = App.Components.View.extend({
    initialize: function() {
        this.template = _.template(App.tpl.get('page-partner-list'));
        this.render();
    },
    render: function() {
        var layout = new App.Views.Layout();
        this.$el.append(layout.el); // add layout
        this.$el.find("#content").html(this.template({}));
        this.$el.addClass('push-page');

        return this;
    }
});
