$(document).ready(function () {
  getSongs();

  // respond to submit event on form
  $('#song-form').on('submit', function () {
    event.preventDefault();
    checkEmpty();

    var song = {}; // we will store our song here

    // iterate over form fields
    // populate our song object with title and artist
    $.each($('#song-form').serializeArray(), function (i, field) {
      song[field.name] = field.value;
    });


    // check that the data is getting submitted
    console.log('song submitted is ', song);

    $.ajax({
      type: 'POST',
      url: '/songs',
      data: song,
      success: function (response) {
        console.log('POST /songs works!');
        getSongs();
      },

      error: function (response) {
        console.log('Attempted POST /songs, did not work');
      }
    });
  });

  function checkEmpty(song) {
    var x = document.forms["song-form"]["artist"].value;
     if (x == null || x == "") {
         alert("Artist must be filled out!");
         return false;
     };
  };

function getSongs() {
  $.ajax({
    type: 'GET',
    url: '/songs',
    success: function (songs) {
      $('#song-list').empty();
      songs.forEach(function (song) {
        $('#song-list').append('<div>' + song.title + ' - ' + song.artist + ' - ' + new Date() + '</div>');
      });
    },

    error: function () {
      console.log('GET /songs did not work');
    },
  });
}
});
