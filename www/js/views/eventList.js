App.Views.EventListPage = App.Components.View.extend({
    initialize: function(){
        this.template = _.template(App.tpl.get('page-event-list'));
        this.render();
    },
    render: function(){
        var layout = new App.Views.Layout();
        this.$el.append(layout.el); // add layout
        this.$el.find("#content").html(this.template({}));

        var eventList = new App.Views.Events({ collection: this.collection });
        this.$el.find('.lists').append(eventList.el);

        this.$el.addClass('push-page');

        return this;
    }
});
