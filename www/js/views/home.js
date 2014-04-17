app.Views.HomePage = Backbone.View.extend({
    initialize: function(){
        this.template = _.template(app.tpl.get('page-event-list'));
        this.render();
    },
    render: function(){
        var layout = new app.Views.Layout();
        this.$el.append(layout.el); // add layout
        this.$el.find("#content").html(this.template({}));

        var eventList = new app.Views.Events({ collection: this.collection });
        this.$el.find('.lists').append(eventList.el);

        this.$el.addClass('push-page');

        return this;
    }
});
