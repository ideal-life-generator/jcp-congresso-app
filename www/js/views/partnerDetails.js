app.Views.PartnerDetails = Backbone.View.extend({
    initialize: function(){
        this.template = _.template(app.tpl.get('partner-details'));
        this.render();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    }
});
