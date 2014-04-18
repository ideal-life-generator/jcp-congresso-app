App.Views.PartnerDetails = App.Components.View.extend({
    initialize: function(){
        this.template = _.template(App.tpl.get('partner-details'));
        this.render();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    }
});
