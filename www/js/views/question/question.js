App.Views.Question = App.Components.View.extend({
    tagName: 'li',
    attributes: {
        "class": "list-group-item question"
    },
    initialize: function() {
        this.template = _.template(App.tpl.get('question-item'));
        this.render();
    },
    render: function() {
        this.$el.append(this.template(this.model.toJSON()));
        var model = {
            id: this.model.get('id'),
            sliderId: this.model.get('id').toString() + 'one',
            min: 0,
            max: 10,
            step: 0.1,
            value: 5
        };
        var slider = new App.Views.RangeSlider({ model: model });
        $(slider.el).addClass('range range-positive');
        this.$el.find('.col-xs-10').append(slider.el);
        var self = this;
        this.$el.find('input').on('input', function(ev){
            self.$el.find('.currentValue').html(ev.originalEvent.srcElement.value);
        });

        return this;
    }
});