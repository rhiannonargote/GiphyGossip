var app = app || {}; // Global namespace


// Extends the core component (the Backbone.View)
// Extending this gives us stuff like:
// this.el
// this.$el - jQuery represented version
// The ability to listen for events
//
// El references a current element, tagName creates an element
app.AppView = Backbone.View.extend({
  el: "#main",

  render: function () {
    // Go and find a template and get its content
    var appViewTemplate = $("#appViewTemplate").html();
    // Set the HTML of the jQuery version of this views el to be that template
    this.$el.html ( appViewTemplate );

    // Creates a new view for the form
    var storyInputView = new app.StoryInputView();
    storyInputView.render(); // Then it calls render
  }
});