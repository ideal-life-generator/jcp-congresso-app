var AppRouter = Backbone.Router.extend({

    routes:{
        "":"index",
        "index":"index",
        "employees/:id":"employeeDetails",
        "employees/:id/reports":"directReports"
    },

    initialize:function () {
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
        this.searchResults = new EmployeeCollection();

    },

    index:function () {
        console.log('Hello from index ...');
        //this.changePage(new EmployeeListPage({model: this.searchResults}));
    },

    employeeDetails:function (id) {
        var employee = new Employee({id:id});
        var self = this;
        employee.fetch({
            success:function (data) {
                self.changePage(new EmployeeView({model:data}));
            }
        });
    },

    directReports:function (id) {
        var employee = new Employee({id:id});
        employee.reports.fetch();
        this.changePage(new DirectReportPage({model:employee.reports}));
    },

    changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        // We don't want to slide the first page
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    }

});

Backbone.history.start();
new AppRouter();

