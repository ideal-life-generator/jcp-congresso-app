App.Views.Menu = App.Components.View.extend({
    tagName: "nav",
	attributes : {
		id: 'main-menu'
	},
    initialize: function(){
        this.template = _.template(App.tpl.get('menu'));
        this.render();
    },
    render: function() {
        this.$el.append(this.template({}));
        this.$el.addClass('pushy pushy-left');

        return this;
    }
});
