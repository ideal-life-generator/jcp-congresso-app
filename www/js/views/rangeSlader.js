App.Views.RangeSlider = App.Components.View.extend({
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.append('<input />');
        this.$el.find('input').attr({
            "id": this.model.id,
            "data-slider-id": this.model.sliderId,
            "type": "text",
            "data-slider-min": this.model.min,
            "data-slider-max": this.model.max,
            "data-slider-step": this.model.step,
            "data-slider-value": this.model.value,
            "data-slider-tooltip": "hide"
        });
        return this;
    }
});