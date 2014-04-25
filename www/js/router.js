AppRouter = Backbone.Router.extend({

	/**
	 * General routing
	 */
    routes:{
		"":"home",
		"home":"home",
        "events/:id": "event",
        "events": "events",
        "login": "login",
        "qa": "qa",
        "partners": "partners",
        "partners/:id": "partner",
        "activities/:eventId": "activities",
        "activity/:id": "activity"
    },
	/**
	 * Home action.
	 * If user has previously selected an event, then redirect to this event.
	 * Otherwise redirect to event list..
	 */
	home: function(){
		if(window.App.SelectedEvent){
			window.App.Router.navigate('#events/'+window.App.SelectedEvent.get('id'), true);
		}
		else{
			window.App.Router.navigate('#events', true);
		}
	},
	/**
	 * Show list of events.
	 */
    events: function () {
        var self = this;
        var events = new App.Collections.Events();
        events.fetch({
            success: function(){
                var view = new App.Views.EventListPage({ collection: events });
                window.App.changePage(view.el);
            },
            error: function() {
                alert("Please connect to internet !!!");
            }
        });
    },
	/**
	 * This selects an event and shows the main app screen.
	 * @param id
	 */
	event : function(id){
		var event = new App.Models.Event({id: id});
		event.fetch({
            success: function() {
                // fetch successfully completed
                window.App.SelectedEvent = event;
                var view = new App.Views.EventPage({ model: event.get('id') });
                window.App.changePage(view.el);
            }
        });
	},
	/**
	 * Login page
	 */
    login: function() {
        var login = new App.Views.LoginPage();
		window.App.changePage(login.el);
    },
	/**
	 * Logout user and redirect back.
	 */
	logout: function() {
		window.App.Auth.logout();

		window.App.Auth.navigate('home', true);
	},
	/**
	 * QA page
	 */
    qa: function() {
        var qa = new App.Views.QA();
		window.App.changePage(qa.el);
    },
	/**
	 * List of partners
	 */
    partners: function() {
        var partners = new App.Collections.Partners();
        partners.fetch({
            success: function() {
                var view = new App.Views.PartnersPage({ collection: partners });
                window.App.changePage(view.el);
            },
            error: function() {
                alert("Please connect to internet !!!");
            }
        });
    },
    partner: function(id) {
        var partner = new App.Models.Partner({ id: id });
        partner.fetch({
            success: function(){
                var view = new App.Views.PartnerDetails({ model: partner });
                window.App.changePage(view.el);
            },
            error: function() {
                alert("Please connect to internet !!!");
            }
        });
    },
    /**
     * List of activities
     */
    activities: function(eventId) {
        var activities = new App.Collections.Activities();
        activities.eventId = eventId;
        activities.fetch({
            success: function() {
                var view = new App.Views.ActivitiesPage({ collection: activities });
                window.App.changePage(view.el);
            },
            error: function() {
                alert("Please connect to internet !!!");
            }
        });
    },
    activity: function(id) {
        var activity = new App.Models.Activity({ id: id });
        activity.fetch({
            success: function() {
                var view = new App.Views.ActivityInfo({ model: activity });
                window.App.changePage(view.el);
            },
            error: function() {
                alert("Please connect to internet !!!");
            }
        });
    }
});

