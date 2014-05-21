App.Views.RangeSlider = App.Components.View.extend({
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.append('<input />');
        this.$el.find('input').attr({
            "id": this.model.id,
            "type": "range",
            "min": this.model.min,
            "max": this.model.max,
            "step": this.model.step,
            "value": this.model.value
        });
        return this;
    }
});