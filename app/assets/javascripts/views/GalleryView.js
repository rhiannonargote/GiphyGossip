var app = app || {}; // Global namespace

app.GalleryView = Backbone.View.extend({
  tagName: "p", // this creates a new element

  render: function () {
    if (!this.model.get('public')){
      return
    }
    var content = this.model.get ( "content" ); // Get the content of the model that was passed in
    var title = this.model.get ( "title" );
    var images = this.model.get ( "images" );
    var id = this.model.get( "id" );
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


    html = '<h2 class="divViewShowOutputTitle"><a href="/stories/' + id + '">' + title + '</a><a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Check%20out%20this%20gossip%20https%3A//giphygossip.herokuapp.com/' + 'stories/' + id + '">Tweet</a><p>' + content + '</p>';

    if (images) {
      images.forEach(function(image) {
        html += '<img src="' + image.url + '">';
      });
    }

    html += "</h2>";
    this.$el.html ( html ); // Set the p's content to be whatever was passed in
    this.$el.prependTo( "#stories, #myStories" ); // Puts in on the HTML page at the start of #stories

  window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
   
    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };
   
    return t;
  }(document, "script", "twitter-wjs"));


  }



});

