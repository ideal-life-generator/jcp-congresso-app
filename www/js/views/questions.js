App.Views.Questions = App.Components.View.extend({
    tagName: 'ul',
    attributes: {
        "class": "list-group"
    },
    initialize: function() {
        this.render();
    },
    render: function() {
        this.collection.each(function(question) {
            var questionView = App.Views.Question({ model: question });
            this.$el.append(questionView.el);
        }, this);

        return this;
    }
});