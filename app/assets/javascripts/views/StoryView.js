var app = app || {}; // Global namespace

app.StoryView = Backbone.View.extend({
  tagName: "p", // this creates a new element
  render: function () {
    var content = this.model.get ( "content" ); // Get the content of the model that was passed in
    var title = this.model.get ( "title" );
    var images = this.model.get ( "images" );
    var html = '';

    html = '<h2 class="divViewShowOutputTitle">' + title + '<p>' + content + '</p></h2>';

    if (images) {
      images.forEach(function(image) {
        html += '<img src="' + image.url + '">';
      });
    }

    

    this.$el.html ( html ); // Set the li's content to be whatever was passed in
    this.$el.prependTo( "#myGoss" ); // Puts in on the HTML page at the start of #myGoss
    this.$el.prependTo( "#stories" ); // Puts in on the HTML page at the start of #stories
  }
});

