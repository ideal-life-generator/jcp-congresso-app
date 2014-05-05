App.Views.ActivityInfo = App.Components.View.extend({
    events: {
        'click .title-bar': 'back'
    },
    initialize: function() {
        this.template = _.template(App.tpl.get('page-activity-info'));
        this.render();
    },
    render: function() {
        var layout = new App.Views.Layout();
        this.$el.append(layout.el); // add layout
        this.model.attributes.fullDate = this.model.createDate();
        this.$el.find('.content').html(this.template(this.model.toJSON()));

        this.$el.addClass('push-page');

        return this;
    },
    back: function() {
        window.history.back();
    }
});
