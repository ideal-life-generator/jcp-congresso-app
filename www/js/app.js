window.App = {

	/**
	 * Extension classes
	 */
	Components: {},

	/**
	 * Model classes
	 */
	Models: {},

	/**
	 * Collection classes
	 */
	Collections: {},

	/**
	 * View classes
	 */
	Views: {},

	/**
	 * Auth manager.
	 */
	Auth: {},

	/**
	 * AppRouter
	 */
	Router : null,

	/**
	 * Current user.
	 */
	User : null,

	/**
	 * Event selected by a user.
	 */
	SelectedEvent : null,

	/**
	 * Global URL setting for all queries
	 */
	homeUrl : 'http://localhost:2403',

	/**
	 * Application Constructor
	 */
    run: function() {

        this.enableCrossDomain();
	    this.adjustJqueryMobile();
        this.bindEvents();

		this.tpl.loadTemplates(['event-list-item', 'main-layout', 'page-event-list', 'menu', 'page-login', 'question-item', 'page-event'], function(){});

		Backbone.history.start({pushState: false, root: '/'});
		this.Router = new AppRouter();
	},
    /**
     * Enable cross domain requests.
     */
    enableCrossDomain: function(){

        $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
            options.xhrFields = {
                withCredentials: true
            };
       });
    },
	/**
	 * Change page to another one.
	 * @param page
	 */
	changePage: function(page){
		var transition = $.mobile.defaultPageTransition;
		$('body').append(page);
		$.mobile.changePage($(page), {changeHash:false, transition: transition});
	},
	/**
	 * Bind any events that are required on startup. Common events are:
	 * 'load', 'deviceready', 'offline', and 'online'.
	 */
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
	/**
	 * Deviceready Event Handler
	 */
    onDeviceReady: function() {
		App.receivedEvent('deviceready');
    },
	/**
	 * Disable all the
	 */
	adjustJqueryMobile: function(){
		$.mobile.ajaxEnabled = false;
		$.mobile.linkBindingEnabled = false;
		$.mobile.hashListeningEnabled = false;
		$.mobile.pushStateEnabled = false;
		$.mobile.changePage.defaults.changeHash = false;

		// Remove page from DOM when it's being replaced
		$('div[data-role="page"]').on('pagehide', function (event, ui) {
			$(event.currentTarget).remove();
		});
	},
	/**
	 * Update DOM on received event.
	 * @param id
	 */
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
