/**
 * View for event list.
 *
 */
App.Views.EventListPage = App.Components.View.extend({
	/**
	 * Prepare template
	 */
    initialize: function(){
        this.template = _.template(App.tpl.get('page-event-list'));
        this.render();
    },
	/**
	 * Render. Split events into previous and upcoming events.
	 */
    render: function(){
        var layout = new App.Views.Layout();
        this.$el.append(layout.el); // add layout
        this.$el.find(".content").html(this.template({}));

        var upcomingEventList = new App.Views.Events({ collection: this.getUpcomingEvents() });
        var previousEventList = new App.Views.Events({ collection: this.getPreviousEvents() });
        this.$el.find('#events-upcoming .panel-body').append(upcomingEventList.el);
        this.$el.find('#events-previous .panel-body').append(previousEventList.el);

        this.$el.addClass('push-page');

        return this;
    },
	/**
	 * Helper method. Return events that were presetn before that.
	 * @returns {App.Collections.Events}
	 */
    getPreviousEvents: function() {
        var list = new App.Collections.Events();
        var currentDate = new Date();
        this.collection.each(function(event){
            var date = new Date(event.get('startDate'));
            if(date < currentDate) {
                list.add(event);
            }
        }, this);

        return list;
    },
	/**
	 * Helper method to get upcoming and current events.
	 * @returns {App.Collections.Events}
	 */
    getUpcomingEvents: function() {
        var list = new App.Collections.Events();
        var currentDate = new Date();
        this.collection.each(function(event){
            var date = new Date(event.get('startDate'));
            if(date >= currentDate) {
                list.add(event);
            }
        }, this);

        return list;
    }
});
