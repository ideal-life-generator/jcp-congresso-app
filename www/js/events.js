App.Views.Events = Backbone.View.extend({
	tagName: 'ul',
	attributes: {
		"data-role": "listview",
		"data-inset": "true",
		"id": "events"

	},
	initialize: function() {
		this.render();
	},
	render: function() {
		this.collection.each(function(_event) {
			var eventView = new App.Views.Event({ model: _event });
			this.$el.append(eventView.el);
		}, this);

		return this;
	}
});