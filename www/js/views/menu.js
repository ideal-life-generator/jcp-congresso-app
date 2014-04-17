app.Views.Menu = Backbone.View.extend({
    tagName: "nav",
    initialize: function(){
        this.template = _.template(app.tpl.get('menu'));
        this.render();
    },
    render: function() {
        this.$el.append(this.template({}));
        this.$el.addClass('pushy pushy-left');

        return this;
    }
});
