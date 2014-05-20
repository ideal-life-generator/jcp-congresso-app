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
	    this.bindEvents();
        this.loadDictionary();
		this.initFormatters();
        this.tpl.loadTemplates(['event-list-item', 'main-layout', 'page-event-list', 'menu', 'page-login', 'question-item', 'page-event', 'partner-list-item', 'partner-details', 'page-partners', 'activities-item-list', 'page-activity-info', 'collapsible', 'my-profile', 'page-questions', 'dropdown'], function(){
	        App.Router = new AppRouter();
	        Backbone.history.start({pushState: false, root: '/'});
        });
    },
	/**
	 * Format init
	 */
	initFormatters: function(){
		moment.lang('en', {
			calendar : {
				lastDay : '[Yesterday]',
				sameDay : '[Today]',
				nextDay : '[Tomorrow]',
				lastWeek : '[last] dddd',
				nextWeek : 'dddd',
				sameElse : 'Do MMM.'
			}
		});
	},
	/**
	 * Tells whether application has some event selected.
	 * @return {boolean}
	 */
	hasSelectedEvent: function(){
		return (this.SelectedEvent != null);
	},
	/**
	 * Get home url.
	 * @return {string}
	 */
	getHomeUrl: function(){
		var homeUrl = '';

		if(this.hasSelectedEvent()){
			homeUrl = '#events/'+this.SelectedEvent.get('id');
		}
		else{
			// No event is selected. Home is event list.
			homeUrl = '#events';
		}

		return homeUrl;
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
	changePage: function(page, callBack) {
        $('body').html(page);
        var menu = new App.Views.Menu();
        $('body').append(menu.el);

        if(callBack){
            callBack.call(this);
        }
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
	loadDictionary: function(){
        $.getJSON('js/dictionary.json',
            function(data) {
                window.polyglot = new Polyglot({ phrases: data });
            }
        );
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