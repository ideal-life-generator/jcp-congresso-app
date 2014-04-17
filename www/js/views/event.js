App.Views.Event = App.Components.View.extend({
	tagName: 'li',
	attributes: {
	},
	initialize: function() {
        this.template = _.template(App.tpl.get('event-list-item'));
        this.render();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.find('a').addClass("ui-btn ui-btn-icon-right ui-icon-carat-r");
		return this;
	}
});