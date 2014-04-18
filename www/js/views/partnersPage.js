App.Views.PartnersPage = App.Components.View.extend({
    initialize: function() {
        this.render();
    },
    render: function() {
        var layout = new App.Views.Layout();
        this.$el.append(layout.el); // add layout
        var list = new App.Views.PartnersList({ collection: this.collection });
        this.$el.find("#content").html(list.el);

        this.$el.addClass('push-page');

        return this;
    }
});
