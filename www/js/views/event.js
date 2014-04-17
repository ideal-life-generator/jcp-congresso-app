app.Views.Event = Backbone.View.extend({
	tagName: 'li',
	attributes: {
	},
	initialize: function() {
        this.template = _.template(app.tpl.get('event-list-item'));
        this.render();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.find('a').addClass("ui-btn ui-btn-icon-right ui-icon-carat-r");
		return this;
	}
});