App.Views.Question = App.Components.View.extend({
    tagName: 'li',
    attributes: {
        "class": "list-group-item"
    },
    initialize: function() {
        this.template = _.template('question-item');
        this.render();
    },
    render: function() {
        this.$el.append(this.template(this.model.toJSON()));
        var model = {
            id: this.model.get('id'),
            sliderId: this.model.get('id').toString() + 'one',
            min: 0,
            max: 10,
            step: 1,
            value: 5
        };
        var slider = new App.Views.RangeSlider({ model: model });
        this.$el.find('.col-xs-10').append(slider.el);

        return this;
    }
});