App.Views.Question = App.Components.View.extend({
    tagName: 'li',
    attributes: {
        "class": "list-group-item"
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
            step: 1,
            value: 5
        };
        var slider = new App.Views.RangeSlider({ model: model });
        this.$el.find('.col-xs-10').append(slider.el);
        var self = this;
        this.$el.find('input').slider().on('slide', function(ev){
            console.log(ev.value);
            self.$el.find('.currentValue').html(ev.value);
        });

        this.$el.find('#' + model.sliderId).css('width', '100%');


        return this;
    }
});