App.Views.PartnerDetails = App.Components.View.extend({
    initialize: function(){
        this.template = _.template(App.tpl.get('partner-details'));
        this.render();
    },
    render: function() {
        var layout = new App.Views.Layout();
        this.$el.append(layout.el); // add layout
        this.$el.find(".content").html(this.template(this.model.toJSON()));

        this.$el.addClass('push-page');

        return this;
    },
    events: {
        'click .ui-btn': 'postComment'
    },
    postComment: function() {
        App.User = new App.Models.User();
        App.Event = new App.Models.Event();

        var comment = this.$el.find('textarea').val();
        var data = {
            message: comment,
            partnerId: this.model.get('id'),
            eventId: App.Event.get('id') || 0,
            userId: App.User.get('id') || 0
        };
        this.model.set('comment', comment);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "http://localhost:2403/messages/",
            data: data,
            complete: function(xhr, textStatus) {
                window.history.back();
            }
        });
    }
});
