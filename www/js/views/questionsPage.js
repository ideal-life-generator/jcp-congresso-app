App.Views.QuestionsPage = App.Components.View.extend({
    initialize: function() {
        this.template = _.template(App.tpl.get('page-questions'));
        //this.render();
    },
    render: function() {
        var layout = new App.Views.Layout();
        this.$el.append(layout.el); // add layout

        this.$el.find('.content').append(this.template({})).addClass('container-fluid');
        this.$el.addClass('push-page');

        this.displayCategories();
        this.displayQuestions();

        return this;
    },
    displayCategories: function() {
        var drop = new App.Views.DropDown({ collection: this.categories });
        this.$el.find('.categories').append(drop.el);
    },
    displayQuestions: function() {
        var questionsView = new App.Views.Questions({ collection: this.collection });
        this.$el.find('.questions').append(questionsView.el);
    }
});
