app.Views.Event = Backbone.View.extend({
	tagName: 'li',
	attributes: {
	},
	initialize: function() {
		this.render();
	},
	template: '#event_template',
	render: function() {
		var template = _.template($(this.template).html());
		this.$el.html(template(this.model.toJSON()));
		this.$el.find('a').addClass("ui-btn ui-btn-icon-right ui-icon-carat-r");
		return this;
	}
});