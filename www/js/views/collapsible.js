App.Views.Collapsible = App.Components.View.extend({
    initialize: function() {
        this.template = _.template(App.tpl.get('collapsible'));
        this.render();
    },
    render: function() {
        this.$el.html(this.template({ "name": this.model }));
        this.addAttributes();

        return this;
    },
    addAttributes: function() {
        this.$el.attr({
            "class": "panel panel-default",
            "id": "accordion"
        });
    }
});
