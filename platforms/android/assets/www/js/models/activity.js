App.Models.Activity = Backbone.Model.extend({
    initialize: function() {
        this.initializeDate();
    },
    url: function() {
        return App.homeUrl + '/activities/' + this.id;
    },
    createDate: function() {
        this.initializeDate();
        var month = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        var days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

        return moment(this.get('startTime')).format('dddd Do MMM YYYY');//(days[this.startDate.getDay()] + " " + this.startDate.getDate() + "th" + " " + month[this.startDate.getMonth()] + " " + this.startDate.getFullYear());
    },
    createTime: function() {
        this.initializeDate();
        var from = this.getTime(this.startDate);
        var to = this.getTime(this.endDate);

        return from.hours + ":" + from.minutes + " - " + to.hours + ":" + to.minutes;
    },
    getTime: function(date) {
        var hours = date.getHours();
        if(hours < 10) {
            var h = "0" + hours.toString();
        }
        var minutes = date.getMinutes();
        if(minutes < 10) {
            var m = "0" + minutes.toString()
        }
        return { hours: h || hours, minutes: m || minutes  };
    },
    initializeDate: function() {
        this.startDate = new Date(this.get('startTime'));
        this.endDate = new Date(this.get('endTime'));
    }
});
