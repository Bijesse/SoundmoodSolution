//https://soundcloud-c9-jasondecastro.c9.io/#
//https://preview.c9.io/jasondecastro/soundcloud/index.html

var currentPlayingSong;

SC.initialize({
  client_id: '53e1b5c5885286f94a2f2dbe52932379',
  redirect_uri: 'https://c9.io/jasondecastro/soundcloud/workspace/index.html'
});

// initiate auth popup
SC.connect(function () {
  SC.get('/me', function (me) {
    $('#hello').html('Hello, ' + me.username);
  });
});

function playTrack (trackid) {
  if(currentPlayingSong){
    currentPlayingSong.stop();
  }
  SC.stream('/tracks/' + trackid, function (sound) {
    currentPlayingSong = sound;
    currentPlayingSong.play();
  });
}

function searchTracks (song) {
  SC.get('/tracks', { q: song }, function (tracks) {
    var songs = tracks;
    var randomSongNumber = Math.floor(Math.random() * (songs.length - 1));
    var song = songs[randomSongNumber];
    playTrack(song.id);
    $('#songtitle').html(song.user.username + '' + song.title);
  });
}

$('#random').on('click', function () {
  var mood = giveMeRandomWord();
  changeColor(getColor(mood));
  $('#moodstatus').html('It sounds like you are in a ' + mood + ' mood!!');
  searchTracks(mood);
});

$('#go').on('click', function () {
  var mood=$('#mood').val();
  changeColor(getColor(mood));
  $('#moodstatus').html('It sounds like you are in a ' + mood +  ' mood!!');
  searchTracks(mood);
});
