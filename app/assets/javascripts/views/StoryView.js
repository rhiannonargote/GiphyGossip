var app = app || {}; // Global namespace

app.StoryView = Backbone.View.extend({
  tagName: "p", // this creates a new element

  events: {
    'click img' : 'refreshImage',
    'click button' : 'publish'
  },

  publish: function () {
    var id = this.model.get('id');
    $.post('/stories/' + id + '/publish');
    this.$el.fadeOut();
  },

  refreshImage: function (event) {
    var images = this.model.toJSON().images;
    var $image = $(event.currentTarget);
    $image.fadeOut();

    $.ajax({
      url: "/refresh",
      method: "POST",
      dataType: "JSON",
      data: {
        images: images,
        image_url: $image.attr("src") // On the server this is params[:image_url]
      },
      success: function (data) {
        $image.attr("src", data.url);
        $image.fadeIn();
      },
      error: function (data) {
        console.log( data );
      }
    })
    // $(event.currentTarget).remove();

    // Make an AJAX request to some URL
  },

  render: function () {
    var content = this.model.get ( "content" ); // Get the content of the model that was passed in
    var title = this.model.get ( "title" );
    var images = this.model.get ( "images" );
    // debugger;
    var html = '';


    // Store all the words that start with a hashtag in an array
    var contentHashTags = content.match( /(#\w+)/g ); // /g means global (don't just select the first match). () tell the Regular Expression which things to store. \w is any word character. + means one or more

    for (var i = 0; i < contentHashTags.length; i++) {
      var word = contentHashTags[i]; // Store the current word as word (from the hash tags array)
      var wordWithSpan = "<span class='tag'>" + word + "</span>"; // Change the value of that word by adding the html tag span around it
      
      var toMatch = word; // Match the uneffected word (the one that doesn't have the span around it)
      var re = new RegExp(toMatch, "g"); // Create a regular expression that does the global search

      content = content.replace(re, wordWithSpan); // Replace that word with the word surrounded by the span tag and save the altered value as content
    }


    html = '<h2 class="divViewShowOutputTitle">' + title + '<p>' + content + '</p></h2>';

    if (images) {
      images.forEach(function(image) {
        html += '<img src="' + image.url + '">';
      });
    }


    // Adds a publish button to unpublished stories
    // TODO: Only shown this button to the actual owner of this story
    if (! this.model.get('public')) {
      console.log(this.model.get('user_id'));
      if (app.USER_ID == this.model.get('user_id')) {
        html += '<button>Publish</button>'; // Owners get a button to publish stories.
      } else {
        console.log('skipping unpublished story', this.model.get('title'));
        return; // Skip unpublished stories.
      }
    }

    this.$el.html ( html ); // Set the p's content to be whatever was passed ins
    $("#myGoss").html(this.$el); // Puts in on the HTML page at the start of #stories
  }


});

