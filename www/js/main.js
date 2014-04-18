window.test = {};
test.AppRouter = Backbone.Router.extend({

    routes:{
        "": "index",
        "index": "index",
        "login": "login",
        "qa": "qa",
        "registration": "registration",
        "partners": "partners",
        "partners/:id": "partners"
    },

    initialize: function() {

    },
    index:function () {
        var menu = new app.Views.Menu();
        $('body').append(menu.el);
        var self = this;
        var events = new app.Collections.Events();
        events.fetch({
            success: function(){
                var view = new app.Views.HomePage({ collection: events });
                self.changePage(view.el);
            },
            error: function() {
                alert("Please connect to internet !!!");
            }
        });
        //this.changePage(new EmployeeListPage({model: this.searchResults}));

        $('.menu-btn').click(function(){
            alert('hello !!!');
        });
    },
    login: function() {
        var login = new app.Views.LoginPage();
        this.changePage(login.el);
    },
    changePage: function(page){
        var transition = $.mobile.defaultPageTransition;
        $('body').append(page);
        $.mobile.changePage($(page), {changeHash:false, transition: transition});
    },
    qa: function() {
        var qa = new app.Views.QA();
        this.changePage(qa.el);
    },
    registration: function() {
        var registration = new app.Views.RegistrationPage();
        this.changePage(registration.el);
    },
    partners: function(id) {
        console.log("Partners");
        if(!id){
            var partners = new app.Collections.Partners();
            partners.fetch({
                success: function() {
                    var view = new app.Views.Partners({ collections: partners });
                    this.changePage(view.el);
                },
                error: function() {
                    alert("Please connect to internet !!!");
                }
            });
        } else {
            console.log(id);
        }
    }
});

Backbone.history.start();
var el = new test.AppRouter();




