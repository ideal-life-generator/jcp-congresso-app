App.Views.MyProfile = App.Components.View.extend({
    initialize: function() {
        this.template = _.template(App.tpl.get('my-profile'));
        this.render();
    },
    render: function() {
        var layout = new App.Views.Layout();
        this.$el.append(layout.el); // add layout
        this.$el.find('.content').append(this.template(this.model.toJSON())).addClass('container-fluid profile-body');
        this.insertQrCode();
        this.$el.addClass('push-page');

        return this;
    },
    insertQrCode: function() {
        this.$el.find("#qrcode").barcode("1234567890128", "ean13", {
            barWidth: 3,
            barHeight: 150
        });
    }
});
