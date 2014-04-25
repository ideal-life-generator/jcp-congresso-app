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
        this.addAttributes();
        return this;
    },
    addAttributes: function() {
        this.$el.attr({
            "class": "table-view",
            "id": "list"
        });
    }
});
