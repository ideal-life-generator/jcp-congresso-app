app.Views.Partners = Backbone.View.extend({
    initialize: function() {
        this.template = _.template(app.tpl.get('partner-list-p'));
        this.render();
    },
    render: function() {
        var layout = new app.Views.Layout();
        this.$el.append(layout.el); // add layout
        this.$el.find("#content").html(this.template({})); // add first-event-list-p
        this.$el.addClass('push-page');

        return this;
    }
});
