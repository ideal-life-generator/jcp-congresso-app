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
	    this.loadDictionary();
        this.bindEvents();

		this.tpl.loadTemplates(['event-list-item', 'main-layout', 'page-event-list', 'menu', 'page-login', 'question-item', 'page-event', 'partner-list-item', 'partner-details', 'page-partners', 'activities-item-list', 'page-activity-info', 'collapsible'], function(){});

        this.Router = new AppRouter();
		Backbone.history.start({pushState: false, root: '/'});

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
		$('body').html(page);
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
        $.getJSON('http://localhost:8000/js/dictionary.json',
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

App.tpl = {

    // Hash of preloaded templates for the app
    templates:{},

    // Recursively pre-load all the templates for the app.
    // This implementation should be changed in a production environment. All the template files should be
    // concatenated in a single file.
    loadTemplates: function (names, callback) {

        var loadTemplate = function (index) {
            var name = names[index];
            console.log('Loading template: ' + name);


            $.get('tpl/'+ name +'.html', function (data) {
                App.tpl.templates[name] = data;
                index++;
                if (index < names.length) {
                    loadTemplate(index);
                } else {
                    callback();
                }
            });
        };

        loadTemplate(0);
    },

    // Get template by name from hash of preloaded templates
    get:function (name) {
        return App.tpl.templates[name];
    }

};
