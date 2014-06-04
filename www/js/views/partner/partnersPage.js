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
        var filterEls = this.collection.filter(function(partner) {
            return partner.get('name').toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) >= 0;
        });
        var filterCol = new App.Collections.Partners(filterEls);
        var list = new App.Views.PartnersList({ collection: filterCol });
        this.$el.find(".panel-list").html(list.el);
    }
});
