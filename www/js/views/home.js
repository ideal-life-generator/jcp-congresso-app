app.Views.HomePage = Backbone.View.extend({
    initialize: function(){
        this.template = _.template(app.tpl.get('first-event-list-p'));
        this.render();
    },
    render: function(){
        var layout = new app.Views.Layout();
        this.$el.append(layout.el); // add layout
        this.$el.find("div[data-role='header']").after(this.template({})); // add first-event-list-p

        var eventList = new app.Views.Events({ collection: this.collection });
        this.$el.find('.lists').append(eventList.el);

        this.$el.attr('data-role', 'page');
        this.$el.addClass('push-page');
        this.$el.find("div[data-role='footer']").find("a[href='#']").addClass('menu-btn');
        return this;
    }
});
