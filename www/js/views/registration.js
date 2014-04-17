app.Views.RegistrationPage = Backbone.View.extend({
    initialize: function() {
        this.template = _.template(app.tpl.get('registration'));
        this.render();
    },
    render: function() {
        var layout = new app.Views.Layout();
        this.$el.append(layout.el); // add layout
        this.$el.find("div[data-role='header']").after(this.template({})); // add first-event-list-p
        this.$el.addClass('push-page');

        return this;
    }
});
