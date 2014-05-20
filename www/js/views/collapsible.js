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
            "class": "panel panel-default"
        });
        this.$el.find('.panel-title a').attr({
            "href": "#" + this.model.toString().replace(" ", "_").replace(" ", "_").replace(" ", "_")
        });
        this.$el.find('.panel-collapse').attr({
            "id": this.model.toString().replace(" ", "_").replace(" ", "_").replace(" ", "_")
        });
    },
    makeCollapse: function() {
        this.$el.collapse({
            parent: "#partner-list",
            toggle: false
        });
    }
});
