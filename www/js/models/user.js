App.Models.User = Backbone.Model.extend({
    initialize: function(){},
    defaults: {
        id: 0,
        name: 'user',
        eventId: '0',
        password: '1',
        partnerId: null
    }
});
