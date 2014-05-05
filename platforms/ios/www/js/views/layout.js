App.Views.Layout = App.Components.View.extend({
    events: {
        'click .pull-left': 'toggleMenu'
    },
    toggleMenu: function(e){
        $('.pushy').toggleClass('pushy-left');
        $('.pushy').toggleClass('pushy-open');

        $('.push-page').toggleClass('container-push');

	    e.preventDefault();
    },
    initialize: function() {
        this.template = _.template(App.tpl.get('main-layout'));
        this.render();
    },
    render: function() {
        this.$el.html(this.template({}));

	    return this;
    }
});
