var Twit = require('twit')
var fs = require('fs');
var readline = require('readline');
var T = new Twit({
  consumer_key:         'get_your_own',
  consumer_secret:      'get_your_own',
  access_token:         'get_your_own',
  access_token_secret:  'get_your_own',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

var drakeFacts = [];
var config = {
  tagsToTrack : ['#DrakeFacts',
                 '#DrakeTheType',
                 '#DrakeTheTypeOfNigga',
                 '#DrakeFactBot',
                 '#DrakeFact'],
  //The drakefacts are organized by score; the higher the fact in the file, the
  //better it is. This parameter limits the number of facts to rotate, for quality control
  lineCutoff : 200
}

/**
 * Go through the drakefacts text file and parse them into memory
 */
function initializeDrakeFacts(){
  var rd = readline.createInterface({
      input: fs.createReadStream('drakefacts.txt'),
      output: process.stdout,
      terminal: false
  });

  var count = 0;
  rd.on('line', function(line) {
      if (++count <= config.lineCutoff){
        drakeFacts.push(line);
      }
  });

  var stream = T.stream('statuses/filter', { track: config.tagsToTrack })

  stream.on('tweet', function (tweet) {
    var userName = tweet.user.screen_name;
    postDrakeFact(userName);
  });
}

/**
 * Tweet a drake fact to a user
 * @param  {string} username
 */
function postDrakeFact(username){
  var drakeFact = drakeFacts[Math.floor(Math.random()*drakeFacts.length)];
  var drakePost = '.@' + username + ' ' + drakeFact;
  T.post('statuses/update', { status: drakePost }, function(err, data, response) {
    console.log(data)
  });
}

initializeDrakeFacts();
