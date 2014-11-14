var listOfEmotions = ['sad', 'afraid', 'abandoned', 'acceptance', 'adoration', 'affection', 'aggravated', 'agitated', 'aggressive', 'alert', 'amazed', 'ambitious', 'amused', 'anger', 'animosity', 'annoyed', 'anticipation', 'anxiousness', 'appreciative', 'apprehensive', 'ardent', 'aroused', 'ashamed', 'astonished', 'attraction', 'awed', 'betrayed', 'bewildered', 'bitter', 'bliss', 'blue', 'boastful', 'bored', 'breathless', 'bubbly', 'calamitous', 'calm', 'camaraderie', 'cautious', 'cheerful', 'cocky', 'cold', 'collected', 'comfortable', 'compassionate', 'concerned', 'confident', 'confused', 'contempt', 'content', 'courageous', 'cowardly', 'crafty', 'cranky', 'crazy', 'cruelty', 'crummy', 'crushed', 'curious', 'cynic', 'dark', 'dejected', 'delighted', 'delirious', 'denial', 'depression', 'desire poem', 'despair', 'determined', 'devastated', 'disappointed', 'discouraged', 'disgust', 'disheartened', 'dismal', 'dispirited', 'distracted', 'distressed', 'dopey', 'down', 'dreadful', 'dreary', 'eager', 'ecstatic', 'embarrassed', 'emotional-detest', 'empathic', 'emptiness', 'enchanted', 'enigmatic', 'enlightened', 'enraged', 'enthralled', 'enthusiastic', 'envy', 'euphoric', 'excited', 'exhausted', 'expectation', 'exuberance', 'fascinated', 'fear', 'flabbergasted', 'fight-or-flight', 'foolish', 'frazzled', 'frustrated', 'fulfillment', 'furious', 'giddy', 'gleeful', 'gloomy', 'goofy', 'grateful', 'gratified', 'greedy', 'grouchy', 'grudging', 'guilty', 'happy', 'hate', 'heartbroken', 'homesick', 'hopeful', 'hopeless', 'horrified', 'hostile', 'humiliated', 'humored', 'hurt', 'hyper', 'hysterical', 'indignation', 'infatuation', 'infuriated', 'inner peace', 'innocent', 'insanity', 'insecure', 'insecure', 'inspired poem', 'interest', 'intimidated', 'invidious', 'irate', 'irritability', 'irritated', 'jaded', 'jealousy', 'joy', 'jubilant', 'kind', 'lazy', 'left out', 'liberated', 'lively', 'loathsome', 'lonely', 'longing', 'love', 'lovesick', 'loyal', 'lust', 'mad', 'mean', 'melancholic', 'mellow', 'mercy', 'merry', 'mildness', 'miserable', 'morbid', 'mourning', 'needed', 'needy', 'nervous', 'obscene', 'obsessed', 'offended', 'optimistic', 'outraged', 'overwhelmed', 'pacified', 'pain', 'panicky', 'paranoia', 'passion', 'pathetic', 'peaceful', 'perturbation', 'pessimistic', 'petrified', 'pity', 'playful', 'pleased', 'pleasure', 'possessive', 'pride', 'provoked', 'proud', 'puzzled', 'rage', 'regretful', 'relief', 'remorse', 'resentment', 'resignation', 'resolved', 'sadness', 'satisfied', 'scared', 'Schadenfreude', 'scorn', 'selfish', 'sensual', 'sensitive', 'sexy', 'shame', 'sheepish', 'shocked', 'shy', 'sincerity', 'solemn', 'somber', 'sorrow', 'sorry', 'spirited', 'stressed', 'strong', 'submissive', 'superior', 'surprised', 'sweet', 'sympathetic', 'temperamental', 'tense', 'terrified', 'threatened', 'thrilled', 'tired', 'tranquil', 'troubled', 'trust', 'tormented', 'uncertainty', 'uneasiness', 'unhappy', 'upset', 'vengeful', 'vicious', 'warm', 'weary', 'worn-out', 'worried', 'worthless', 'wrathful', 'yearning', 'zesty'];

var moodMap = {
  'happy': 'happy',
  'joy': 'happy',
  'excited': 'happy',
  'sweet': 'happy',
  'sad': 'sad',
  'worried': 'sad',
  'scared': 'sad',
  'afraid': 'sad'
};

var colorMap = {
  'happy': ['ffff33', 'cc3333', '33ff33', '3366cc'],
  'sad': ['330000', '000033', '003300']
};

$(document).ready(function () {
  $('#mood').typeahead({ source:listOfEmotions });
  var button = document.getElementById('go');
  button.addEventListener('click', rndm);
});

function changeColor (x) {
  $('.jumbotron').css('background-color', x);
}

function rndm () {
  var text = document.getElementById('mood').value;
  if (text.length > 1){
    changeColor(getColor(text));
  }
}

function getColor (word) {
  if (moodMap[word]) {
    var feeling = moodMap[word];
    var listLength = colorMap[feeling].length;
    var randomNumber = Math.floor(Math.random() * (listLength - 1));
    return '#' + colorMap[feeling][randomNumber];
  } else {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

function giveMeRandomWord() {
  var listLength = listOfEmotions.length;
  var randomNumber = Math.floor(Math.random() * (listLength - 1));
  return listOfEmotions[randomNumber];
}

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
