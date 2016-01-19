var app = app || {}; // Global namespace

app.StoryView = Backbone.View.extend({
  tagName: "p", // this creates a new element
  render: function () {
    var content = this.model.get ( "content" ); // Get the content of the model that was passed in
    var title = this.model.get ( "title" );


    this.$el.html ( '<h2>' + title + '</h2><p>' + content + '</p>'); // Set the li's content to be whatever was passed in
    this.$el.prependTo( "#stories" ); // Puts in on the HTML page at the start of #stories
  }
});