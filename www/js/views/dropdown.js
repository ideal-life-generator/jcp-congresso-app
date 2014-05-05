App.Views.DropDown = App.Components.View.extend({
    attributes: {
        "class": "btn-group"
    },
    initialize: function() {
        this.template = _.template(App.tpl.get('dropdown'));
        this.selectedCategory = this.selectedCategory || this.collection.at(0);
        this.render();
    },
    render: function() {
        this.$el.append(this.template({ "selected": this.selectedCategory.get('name').toString() }));
        this.collection.each(function(category) {
            var el = $('<li><a href="#">' + category.get('name').toString() +'</a></li>');
            el.click(function(){
                this.selectedCategory = category;
                this.$el.find('button').html(category.get('name').toString() + ' <span class="caret"></span>');
            });
            this.$el.find('ul').append(el);
        }, this);
    }
});