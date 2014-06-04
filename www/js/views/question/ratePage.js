App.Views.RatePage = App.Components.View.extend({
    initialize: function() {
        this.template = _.template(App.tpl.get('page-rate-session'));
        this.render();
    },
    events: {
        'click .ui-btn-lg': 'saveRate'
    },
    render: function() {
        var layout = new App.Views.Layout();
        this.$el.append(layout.el); // add layout

        this.$el.find('.content').addClass('question-body').append(this.template({sessionName: "sessionName"})).addClass('container-fluid');
        this.$el.addClass('push-page');

        this.displayQuestions();
        this.$el.find('.alert').hide();

        return this;
    },
    displayQuestions: function() {
        var questionsView = new App.Views.Questions({ collection: this.collection });
        this.$el.find('.questions').append(questionsView.el);
    },
    saveRate: function() {
        // save Rate ...
    }
});
