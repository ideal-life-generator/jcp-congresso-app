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
        "partners/:filter": "partnerFilter",
        "partner/:id": "partner",
        "activities/:eventId": "activities",
        "activity/:id": "activity",
        "profile": "profile",
        "scan": "scan",
        "questions": "questions"
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
    },
    partnerFilter: function(filter) {
        var partners = new App.Collections.Partners();
        partners.fetch({
            success: function() {
                var filterEls = partners.filter(function(partner) {
                    return partner.get('name').toLowerCase().indexOf(filter.toLowerCase()) >= 0;
                });
                var filterCol = new App.Collections.Partners(filterEls);
                var view = new App.Views.PartnersPage({ collection: filterCol });
                $(view.el).find('input').val(filter);
                window.App.changePage(view.el, function() {
                    $('#filter').focus();
                });
            },
            error: function() {
                alert("Please connect to internet !!!");
            }
        });
    },
    profile: function() {
        var profile = new App.Views.MyProfile({ model: App.Auth.User });
        window.App.changePage(profile.el);
    },
    scan: function() {
        cordova.exec(function(resultArray) {

                alert("Scanned " + resultArray[0] + " code: " + resultArray[1]);

                }, function(error) {
                alert("Failed: " + error);
            }, "ScanditSDK", "scan",
            ["ENTER YOUR APP KEY HERE",
                {"beep": true,
                    "1DScanning" : true,
                    "2DScanning" : true}]);
    },
    questions: function() {
        var questions = new App.Views.QuestionsPage();
        window.App.changePage(questions.el);
    }
});

