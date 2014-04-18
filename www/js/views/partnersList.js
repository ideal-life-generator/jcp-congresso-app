App.Views.PartnersList = App.Components.View.extend({
    tagName: 'ul',
    initialize: function() {
        this.render();
    },
    render: function() {
        this.collection.each(function(partner) {
            var partnerView = new App.Views.Partner({ model: partner });
            this.$el.append(partnerView.el);
        }, this);
        this.$el.attr({
            "data-role": "listview",
            "data-filter":"true",
            "data-filter-placeholder":"Search partner...",
            "data-inset": "true"
        });

        return this;
    }
});
