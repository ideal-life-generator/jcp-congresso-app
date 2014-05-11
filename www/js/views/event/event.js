/**
 * View for single event item.
 */
App.Views.Event = App.Components.View.extend({
	tagName: 'li',
	/**
	 * Initialize.
	 */
	initialize: function() {
        this.template = _.template(App.tpl.get('event-list-item'));
        this.render();
	},
	/**
	 * Render the view
	 */
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});