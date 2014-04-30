App.Models.User = Backbone.Model.extend({
    initialize: function(){},
    urlRoot : App.homeUrl + '/users',
    defaults: {
        id: 0,
        username: 'user',
        eventId: '0',
        password: '1',
        partnerId: null,
        role: 'guest'
    }
});
