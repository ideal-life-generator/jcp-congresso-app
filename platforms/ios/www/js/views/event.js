app.Views.Event = Backbone.View.extend({
	tagName: 'li',
	initialize: function() {
		this.render();
	},
	template: '#event_template',
	render: function() {
		var template = _.template($(this.template).html());
		this.$el.html(template(this.model.toJSON()));

		return this;
	}
});