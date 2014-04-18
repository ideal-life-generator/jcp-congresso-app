App.Views.HomePage = App.Components.View.extend({

	event : null,

    initialize: function(options){
		this.options = options || {};

        this.template = _.template(App.tpl.get('page-home'));
        this.render();
    },
    render: function(){
        var layout = new App.Views.Layout();
        this.$el.append(layout.el); // add layout
        this.$el.find("#content").html(this.template({}));

        this.$el.addClass('push-page');

        return this;
    }
});
