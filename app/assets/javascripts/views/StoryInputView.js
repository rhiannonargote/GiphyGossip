var app = app || {}; // Global namespace

app.StoryInputView = Backbone.View.extend({
  el: "#storyForm", // Referencing an existing element

  events: { // Add a bunch of events, and tell Backbone what functions to call
    'click button': 'createStory',
    'keypress textarea': 'checkForEnter'
  },

  checkForEnter: function (event) {
    app.ENTER_KEY = 13; // 13 is the key code on most laptops for Enter
    if ( event.which === app.ENTER_KEY ) { 
      // event.which tells us which key was pressed
      event.preventDefault(); // This stops the enter key from doing anything
      this.createStory(); // This calls the createStory function
    }
  },

  createStory: function () {
    
    var currentStory = this.$el.find('textarea').val();
    if ( currentStory.length === 0 ) {
      return;
    }

    var currentTitle = this.$el.find('input').val();
    if ( currentTitle.length === 0 ) {
      return;
    }

    var story = new app.Story(); // Create a new "instance"
    
    // Find the textarea within the el, and saves its value
    story.set({ title: currentTitle, content: currentStory});
    // On the instance of the story, store the content
    var view = this;
    $('.divViewShow').show();
    story.save().done(function () {

      app.stories.add( story ); // Add this story to the main collection

      view.$el.find('textarea').val('').focus();
      view.$el.find('input').val('').focus();
      // Find the text area and remove all the text, and then put our cursor in there

    }); // Send this story up to the server
  },

  render: function () {
   var storyInputViewTemplate = $("#storyInputViewTemplate").html();
   this.$el.html ( storyInputViewTemplate );
  // Select an element with the ID of storyInputViewTemplate
  // And put that inside this views element  
   this.$el.find('textarea').focus(); 
  }
});

