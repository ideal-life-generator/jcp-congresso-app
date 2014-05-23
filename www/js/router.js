AppRouter = Backbone.Router.extend({

	/**
	 * Name of the currently active route.
	 */
	currentRoute: null,

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
	 * This runs on router initialization.
	 */
	initialize: function(){
		var router = this;

		// Attach event handler to route change.
		Backbone.history.on('route', function (obj, name) {
			router.currentRoute = name;
		});
	},
	/**
	 * Home action.
	 * If user has previously selected an event, then redirect to this event.
	 * Otherwise redirect to event list.
	 */
	home: function(){
		window.App.Router.navigate(App.getHomeUrl(), {trigger: true});
	},
	/**
	 * Show list of events.
	 */
    events: function () {
        var self = this;
        var events = new App.Collections.Events();

		// Unset selected event.
		App.SelectedEvent = null;

        events.fetch({
            success: function(){
                var view = new App.Views.EventListPage({ collection: events });
                window.App.changePage(view.el);
            },
            error: function(err) {
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
                var view = new App.Views.EventPage({ model: event });
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
	/**
	 * Single partner page
	 */
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
	/**
	 * Single activity page
	 */
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
	/**
	 * My profile
	 */
    profile: function() {
        var profile = new App.Views.MyProfile({ model: App.Auth.User });
        window.App.changePage(profile.el);
    },
	/**
	 * Scanning the barcode
	 */
    scan: function() {
        var self = this;
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                self.questions(result.text);
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    },
    questions: function(id) {
        // load visitor by { id }
        var visitor = new App.Models.User({id: id});
        visitor.fetch({
            success: function(){
                loadCategories(visitor);
            },
            error: function() {
                alert("Please connect to internet !!!");
            }
        });
        var loadCategories = function(visitor) {
            var categories = new App.Collections.Categories();
            categories.fetch({
                success: function() {
                    loadQuestions(categories, visitor);
                },
                error: function() {
                    alert("Please connect to internet !!!");
                }
            });
        };
        var loadQuestions = function(categories, visitor) {
            var questions = new App.Collections.Questions();
            questions.fetch({
                success: function() {
                    var questionsView = new App.Views.QuestionsPage({ collection: questions });
                    questionsView.categories = categories;
                    questionsView.user = visitor;
                    questionsView.render();
                    window.App.changePage(questionsView.el);
                },
                error: function() {
                    alert("Please connect to internet !!!");
                }
            });
        };
    }
});

