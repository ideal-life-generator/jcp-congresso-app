app.Views.Footer = Backbone.View.extend({
    template: '#footer_template',
    initialize: function(){
        this.render();
    },
    render: function(){
        var template = _.template($(this.template).html());
        this.$el.append(template(this.model.toJSON()));

        return this;
    }
});
