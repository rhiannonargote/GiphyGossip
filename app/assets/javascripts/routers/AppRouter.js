var app = app || {}; // Global namespace


// We extend a core component
app.AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index' // If there is nothing the client-side URL, call the index function (inside router)
  },

  index: function () {
   var appView = new app.AppView();
   // Creates and instance of the appView
   appView.render(); // Calls render on it
 }
});