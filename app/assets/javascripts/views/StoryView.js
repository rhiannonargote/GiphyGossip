var app = app || {}; // Global namespace

app.StoryView = Backbone.View.extend({
  tagName: "li", // this creates a new element
  render: function () {
    var content = this.model.get ( "content" ); // Get the content of the model that was passed in
    this.$el.text ( content ); // Set the li's content to be whatever was passed in
    this.$el.prependTo( "#stories" ); // Puts in on the HTML page at the start of #secrets
  }
});