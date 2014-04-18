App.Views.Layout = App.Components.View.extend({
    events: {
        'click .menu-btn': 'toggleMenu'
    },
    toggleMenu: function(e){
        $('.pushy').toggleClass('pushy-left');
        $('.pushy').toggleClass('pushy-open');

        $('.push-page').toggleClass('container-push');

	    e.preventDefault();
    },
    initialize: function() {
        this.template = _.template(App.tpl.get('main-layout'));
        this.render();
    },
    render: function() {
        this.$el.html(this.template({}));

	    var menu = new App.Views.Menu();
	    $('body').append(menu.el);

        return this;
    }
});
