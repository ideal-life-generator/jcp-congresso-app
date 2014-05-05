App.Views.QuestionsPage = App.Components.View.extend({
    initialize: function() {
        this.template = _.template(App.tpl.get('page-questions'));
        this.render();
    },
    render: function() {
        var layout = new App.Views.Layout();
        this.$el.append(layout.el); // add layout
        this.$el.find('.content').append(this.template({})).addClass('container-fluid profile-body');
        this.$el.addClass('push-page');

        return this;
    }
});
