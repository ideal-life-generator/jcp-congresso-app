/**
 * Auth manager.
 */
window.App.Auth = {

    /**
     * User model if logged in.
     */
    User : null,

    /**
     * Tells if there's an currently active user.
     * @returns {boolean}
     */
    isGuest : function(){
        return (this.User == null);
    },

    isPartner: function(){
        return (this.User.get('role') == 'partner');
    },

    isRegularUser: function() {
        return (this.User.get('role') == 'regular');
    },
    /**
     * Load session.
     */
    loadSession: function(){
        // TODO query localstorage here
    },

    /**
     * Save session.
     */
    saveSession: function(){
        // TODO query localstorage here
    },
    /**
     * Sends a request to server to login user.
     *
     * @param credentials {object} Data to send to server to make an auth.
     * @param callback Callback will be called with two parameters.
	 * First is {boolean}, whether request was succesful, second is error message if any.
     */
    login: function(credentials, callback){
        var Auth = this;
        console.log('login ...');
        $.ajax({
            type: "POST",
            dataType: "json",
            url: window.App.homeUrl + "/users/login",
            data: credentials,
            success: function(data, xhr, textStatus) {
                Auth.User = new window.App.Models.User({ name: data.email, password: data.password, id: data.uid });

                callback(true);
            },
			error: function(response, xhr, textStatus){
				var data = jQuery.parseJSON(response.responseText);
				callback(false, data.message);
			}
        });

    },
    /**
     * Clears internal data.
     */
    logout: function(){
        this.User = null;
        // TODO delete localstorage session
    }

};