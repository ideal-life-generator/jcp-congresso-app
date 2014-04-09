app.Views.Events = Backbone.View.extend({
	tagName: "ul",
	attributes: {
		"class": "ui-listview",
		"data-role": "listview",
        "data-theme": "c"
	},
	initialize: function() {
		this.render();
	},
	render: function() {
		this.collection.each(function(_event) {
			console.log(_event);
			var eventView = new app.Views.Event({ model: _event });
			this.$el.append(eventView.el);
		}, this);
		return this;
	}
});