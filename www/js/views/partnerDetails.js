App.Views.PartnerDetails = App.Components.View.extend({
    initialize: function(){
        this.template = _.template(App.tpl.get('partner-details'));
        console.log(App.tpl.get('partner-details'));
        this.render();
    },
    render: function() {
        var layout = new App.Views.Layout();
        this.$el.append(layout.el); // add layout
        this.$el.find("#content").html(this.template(this.model.toJSON()));

        this.$el.addClass('push-page');

        return this;
    },
    events: {
        'click .ui-btn': 'postComment'
    },
    postComment: function() {
        var comment = this.$el.find('textarea').val();
        console.log(comment);
        this.model.set('comment', comment);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "http://localhost:2403/partners/",
            data: this.model.toJSON(),
            complete: function(xhr, textStatus) {
                window.history.back();
            }
        });
    }
});
