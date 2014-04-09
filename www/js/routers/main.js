app.Routers.Main = Backbone.Router.extend({
    routes: {
        '': 'index',
        'events/:dateControl': 'dateControl'
    },
    dateControl: function(dateControl){
        $('body').html(dateControl);
    },
    index: function(){
        console.log('hello 111');
    }
});
//Backbone.history.start();
//new app.Routers.Main();
