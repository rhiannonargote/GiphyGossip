var app = app || {}; // Global namespace

//                                  .   .,,,...
//                               . .=7??I?IIII???++.
//                             ..=O7II77I$$OO$7$7I7+?+.
//                            .~N7$7IZO$7$$7$ZDDNNMMOII+
//                           ,ZO7$7D8ZOZZ778DDO$?+?7DMO87.
//                        . =IO7$8O8Z$878O$I+=~::,,,:~$DD7..
//                         +?DZDM888D8OZ?+~::,,,,,,,,,,~O7?:..
//                        ~$$ZNND88N88I=~::,,,,,,,,,,,,,+O+?~
//                      .:7$8NDNDNN8I+~::,,,,,,,,,,,,::::$7++,.
//                      .$OODMNDNDZI+:,,,,,,,,,,,,,.,,,,::$7?+.
//                      =$ZZMNDDN7+~~:,,,,,,,,,,,,,,,,,,,:?Z$?~
//                      ZZDMMDMN+~~~=~::,,,,,,,,,:=++=~,,:+$$7+.
//                    ..ZODDDNN+=II7II+=~::,:::=I7I~~=?~,:~7787= .
//                    .,Z8MMDNI+7I++?7$7I+~:~:~====~~::~::=$8NO?=
//                     ~NMDNMM+?++???II77I=:,,~+???::=~:::~8NNN$+  .
//                     +M8DNN$+??7?~~?IZZZI:,,=I$$O8O~=~:,:$DMMD$:
//                    .+N8DNM+++?I778NOZD7=:,::=?=7Z~++~:::+NMMM8+,.
//                    .:NND87===++???++===+~,:,,:~~:,,,,,,::7+IMN7
//                      Z+7O+=~:::~~~~~~~==:,::,,,,,,,,..,::IIZNMZ
//                      ,7?7+=~~:::~~:~~==~:,,::,,,,,,,,,,::?:7NZ,
//                       ?+7==~~~~::~~:=?ODI+IN~::,,,,,,,,::I:=I
//                       ,=I==~~~~~~~~~+7$$$+=++:::,,,,,,,,:+:..
//                        ~=====~~~~~=~=+??+I=~~:,,::,,,,,,::: .
//                        .+=======~=~=+=?+=?=~:::,,::,,,,,,,..
//                        ..~====+===+++++7~+++,::::::::,:,,..
//                         ..==+++=~+IZD$I??7?+?OOI=:,,::,,.
//                         ..~=+++=====?II??7?+~:,:~:,,::,,.
//                         ...==+++==~~~~+??==~:,,::~::::,. ..
//                         ...,=++++=+=~::::,,:,,,,,:::::,..
//                         .....=????+++==~::::,::::~~~:,...
//                          .....?II777III?++++=~===+==:,...
//                          .....+?7$$ZZZZ$$777III???=~::..
//                         ......+??I77$$$$$77I??++=~~~::...
//                         ......=??I77$$$$77I??+==~~~::,..
//                         . ....=??III77$$$7II+==~~~:::,..
//                           ....=+?I?III777I?+=~~::::::,...
//                        .  . .,=????II7II?+====:::::::,,..
//                         .....=++???IIIII?+===~~:::::::,,...
//                      .....7:~=++?+??II??+++=~~:::::::,,,,:=
//                    ...,8D$~~==+??????++====~~~:::::::,,,,,ZOO=
//                 ...=DDMMND~~~==????++==+=====~~::::~:,,,,,DDDNOO  .
//             .. .ONDNNNMMMM=~===++??+=========~::::::,,,,,8NNNDDDD8Z. ..
//            ,88DNNNNNNMNMMMN~=~==++??========~~::::,,,,,~DNNN8NNNNDDN8Z+
//         =O8NDNNNNNNNNNMNMMMN+~~~~=++=~~~~==~~::,,,,::~NNNNNDDDNNNNNNNDDDOI.
//    . .ODNNNDNNNNNNNMNNMMMMMMNN:::~~~=~::~~~~::,,,::=NNDNNNNNNNNNMNNNNNNNDDDO= ..
//     ZDNNNNNNNNNMNNNMMMMMMMNMMMNNN?::::::::::,:,:DNNNNNMMNNNNNNNNNNDNNNNNNNDDD8~
//   Z8DDNNNNMNNNNNNNNMMNMMMMMMNMMMMMMNMMNNNNNNNNNNMNNNNDNNNNNNNNNMNNDNNNNNNNNDNNDO
//  ZDNNNNNNMNMNNNNNNNMMNMMMNMMNMMDMMNNNNMNNNNMNNNNNNNDNNNNNNNNNNNNMMNNNNNNNMNNDDND
// 8NNNNNNNMMMNNNNNNNMMMNNNNNNNMMNNNMMMNDDDNNNDNMMNNNNDNNNNNNNNNNNNMMDNNNNMNMMNNNNN
// DNNMNNNNMNNNNNNNNNNNMNNMNMNNNMNNNNNNNNNDNNNDNNNDNNDNNNDNDNDNNNNNMMDNNNNNNMMDNNNN
// NNNMDNDNNDDDDDNDDDDNNDDDDNDD8DDND8DDDD8DDDDD888DDDDDDDDDDDDDDDDDNNDDDNDNNNN8DDDD

app.StoryView = Backbone.View.extend({
  tagName: "p", // this creates a new element

  events: {
    'click img' : 'refreshImage',
    'click button' : 'publish',
  },

  publish: function () {
    var id = this.model.get('id');
    $.post('/stories/' + id + '/publish').done(function () {
      app.stories.fetch();
    });
    this.$el.fadeOut();
    $(".divViewShow, p#myGoss, div.bottomLine").fadeOut();
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


    html = '<h2 class="divViewShowOutputTitle">' + title + '<p>' + content + '</p>';

    if (images) {
      images.forEach(function(image) {
        html += '<div class="refresher"><img src="' + image.url + '"></div>';
      });
    }


    // Adds a publish button to unpublished stories
    // TODO: Only shown this button to the actual owner of this story
    if (! this.model.get('public') || Backbone.history.location.pathname.match(/\/users\/\d/)) {
      console.log(this.model.get('user_id'));
      if (app.USER_ID == this.model.get('user_id')) {
        html += $('#StoryViewTemplate').html(); // Owners get a button to publish stories.
      } else {
        console.log('skipping unpublished story', this.model.get('title'));
        return; // Skip unpublished stories.
      }
    } else {
      return; // Skip published stories.
    }

    this.$el.html( html ); // Set the p's content to be whatever was passed ins
    $("#myGoss").html(this.$el); // Puts in on the HTML page at the start of #stories
    $("#myGoss img").hover(function(){
      var $that = $(this)
      $that.parent().addClass('hoverText').append('<h2 class="refreshHTML">click to refresh image</ah2>')
    }, function(){
      var $that = $(this)
      $that.parent().removeClass('hoverText')
      $that.parent().children('h2').fadeOut();
    })
  }


});

