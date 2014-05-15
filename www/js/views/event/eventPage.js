/**
 * Page view for a single event
 */
App.Views.EventPage = App.Components.View.extend({
    initialize: function(){
        this.template = _.template(App.tpl.get('page-event'));
        this.render();
    },
    render: function(){
        var layout = new App.Views.Layout();
        this.$el.append(layout.el); // add layout
        this.$el.find(".content").html(this.template({
			id : this.model.get('id')
		}));
        this.$el.addClass('push-page');
        return this;
    }
});
