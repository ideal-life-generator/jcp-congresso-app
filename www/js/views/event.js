App.Views.Event = App.Components.View.extend({
	tagName: 'li',
	initialize: function() {
        this.template = _.template(App.tpl.get('event-list-item'));
        this.render();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
        this.addAttributes();
		return this;
	},
    addAttributes: function() {
        this.$el.addClass("table-view-cell media");
    }
});