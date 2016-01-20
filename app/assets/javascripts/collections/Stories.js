var app = app || {};

app.Stories = Backbone.Collection.extend({
  model: app.Story,
  url: "/stories",

  initialize: function () {
    console.log( "This ran" );
    // This is where my event handler will be added
    this.on("add", function (story) {
      var storyView = new app.StoryView({ model: story });
      // Create a new StoryView and give it some info to represent
      storyView.render();
      // Call render on it
        console.log( story )
      var galleryView = new app.GalleryView({ model: story });
      // Create a new StoryView and give it some info to represent
      galleryView.render();  
    });
  }
});