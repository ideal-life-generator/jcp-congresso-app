App.Views.QuestionsPage = App.Components.View.extend({
    initialize: function() {
        this.template = _.template(App.tpl.get('page-questions'));
    },
    events: {
        'click .ui-btn-lg': 'saveAnswer'
    },
    render: function() {
        var layout = new App.Views.Layout();
        this.$el.append(layout.el); // add layout

        this.$el.find('.content').addClass('question-body').append(this.template({visitor: this.user.get('username')})).addClass('container-fluid');
        this.$el.addClass('push-page');

        this.displayCategories();
        this.displayQuestions();
        this.$el.find('.alert').hide();

        return this;
    },
    displayCategories: function() {
        var drop = new App.Views.DropDown({ collection: this.categories });
        this.$el.find('.categories').append(drop.el);
    },
    displayQuestions: function() {
        var questionsView = new App.Views.Questions({ collection: this.collection });
        this.$el.find('.questions').append(questionsView.el);
    },
    saveAnswer: function() {
        App.User = App.User || new App.Models.User();
        App.Event = App.Event || new App.Models.Event();

        var comment = this.$el.find('textarea').val();
        var data = {
            comment: comment,
            partnerId: 0,
            eventId: App.Event.get('id') || 0,
            userId: App.User.get('id') || 0
        };
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "http://localhost:2403/answers/",
            data: data,
            error: function( jqXHR, textStatus, errorThrown ){
                m = 0;
                console.log('ERROR !!!');
            },
            complete: function(xhr, textStatus) {
                if(!m){
                    window.history.back();
                }
            },
            success: function(xhr, textStatus) {
                //window.history.back();
            }
        });
    }
});
