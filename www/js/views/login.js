app.Views.LoginPage = Backbone.View.extend({
    initialize: function() {
        this.template = _.template(app.tpl.get('login-p'));
        this.render();
    },
    render: function(){
        var layout = new app.Views.Layout();
        this.$el.append(layout.el); // add layout
        this.$el.find("div[data-role='header']").after(this.template({}));

        return this;
    }
});
