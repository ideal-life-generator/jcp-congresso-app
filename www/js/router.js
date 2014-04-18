AppRouter = Backbone.Router.extend({

	/**
	 * General routing
	 */
    routes:{
        "": "events",
        "home/:id": "home",
        "events": "events",
        "login": "login",
        "qa": "qa",
        "partners": "partners",
        "partners/:id": "partners"
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
        //this.changePage(new EmployeeListPage({model: this.searchResults}));
    },
	/**
	 * This selects an event and shows the main app screen.
	 * @param id
	 */
	home : function(id){
		var event = new App.Models.Event({id: id});
		event.fetch({
            success: function() {
                // fetch successfully completed
                window.App.SelectedEvent = event;

                var view = new App.Views.HomePage();

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
	 * QA page
	 */
    qa: function() {
        var qa = new App.Views.QA();
		window.App.changePage(qa.el);
    },
	/**
	 * List of partners
	 * @param id
	 */
    partners: function(id) {
        if(!id){
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
        } else {
            console.log(id);
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
            /*
            $.ajax({
                type: "GET",
                dataType: "json",
                url: "http://localhost:2403/partners/" + id.toString(),
                complete: function(xhr, textStatus) {
                    var partner = new App.Models.Partner(xhr.responseJSON)
                    var view = new App.Views.PartnerDetails({ model: partner });
                    console.log(view.el);
                    window.App.changePage(view.el);
                }
            });*/
        }
    }
});

