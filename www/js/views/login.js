app.Views.LoginPage = Backbone.View.extend({
    initialize: function() {
        this.template = _.template(app.tpl.get('page-login'));
        this.render();
    },
    render: function(){
        var layout = new app.Views.Layout();
        this.$el.append(layout.el); // add layout
        this.$el.find("#content").html(this.template({}));
        this.$el.attr('data-role', 'page');

        this.$el.addClass('push-page');

        return this;
    }
});
