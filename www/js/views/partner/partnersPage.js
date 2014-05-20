App.Views.PartnersPage = App.Components.View.extend({
    initialize: function() {
        this.template = _.template(App.tpl.get('page-partners'));
        this.render();
    },
    events: {
        'input input': 'updatePartners'
    },
    render: function() {
        var layout = new App.Views.Layout();
        this.$el.append(layout.el); // add layout
        var list = new App.Views.PartnersList({ collection: this.collection });
        this.$el.find(".content").append(this.template({}));
        this.$el.find(".panel-list").append(list.el);

        this.$el.addClass('push-page');

        return this;
    },
    updatePartners: function(e) {
        window.App.Router.partnerFilter(e.currentTarget.value);
    }
});
