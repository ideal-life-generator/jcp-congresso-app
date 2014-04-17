app.Views.Layout = Backbone.View.extend({
    events: {
        'click .menu-btn': 'toggleMenu'
    },
    toggleMenu: function(){
        $('.pushy').toggleClass('pushy-left');
        $('.pushy').toggleClass('pushy-open');

        $('.push-page').toggleClass('container-push');
    },
    initialize: function() {
        this.template = _.template(app.tpl.get('main-layout'));
        this.render();
    },
    render: function() {
        this.$el.html(this.template({}));

        return this;
    }
});
