App.Views.LoginPage = App.Components.View.extend({
    events : {
        'click #login-btn' : 'login'
    },
    initialize: function() {
        this.template = _.template(App.tpl.get('page-login'));
        this.render();
    },
    render: function(){
        var layout = new App.Views.Layout();
        this.$el.append(layout.el); // add layout
        this.$el.find("#content").html(this.template({}));
        this.$el.attr('data-role', 'page');

        this.$el.addClass('push-page');

        return this;
    },

    /**
     * Try logging in.
     */
    login: function(e){
        var credentials = {
            username : this.$el.find('[name=email]').val(),
            password : this.$el.find('[name=password]').val()
        };

		e.preventDefault();

		window.App.Auth.login(credentials, function(result, message){
			if(result){
				window.App.Router.navigate('events', true);
			}
			else{
				// TODO Change this to something better.
				alert(message);
			}
		});
    }
});
