window.test = {};
test.AppRouter = Backbone.Router.extend({

    routes:{
        "":"index",
        "index":"index"
    },

    index:function () {
        console.log('Hello from index ...');
        alert('hello !!!');
        //this.changePage(new EmployeeListPage({model: this.searchResults}));
    }
});

Backbone.history.start();
var el = new test.AppRouter();




