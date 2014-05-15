/**
 * General Layout View
 */
App.Views.Layout = App.Components.View.extend({
    events: {
        'click #left-navbar-item': 'toggleMenu'
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
		// Default way to go home.
		var homeUrl = App.getHomeUrl();

		if(App.Router.currentRoute == 'event'){
			// For this page specifically, there's an exception
			homeUrl = '#events';
		}

		var options = {
			hasSelectedEvent : App.hasSelectedEvent(),
			homeUrl : homeUrl
		};

        this.$el.html(this.template(options));

	    return this;
    }
});
