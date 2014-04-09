app.Views.Events = Backbne.View.extend({
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
		_.each(this.collection, function(_event) {
			var eventView = new app.Views.Event({ model: _event });
			this.$el.append(eventView.el);
		}, this);

		return this;
	}
});