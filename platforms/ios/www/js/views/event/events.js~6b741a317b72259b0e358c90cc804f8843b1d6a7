App.Views.Events = App.Components.View.extend({
	tagName: "ul",
	attributes: {
		"class": ""
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