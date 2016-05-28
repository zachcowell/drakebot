var Twit = require('twit')
var fs = require('fs');
var readline = require('readline');
var T = new Twit({
  consumer_key:         'UBkJG6NZzEAHJoB1FgRowrj4b',
  consumer_secret:      '0DhjeIYu4WRIYxSQZlKUKdlD61mAKT17VZ9zZUP3VB3KSta5Ss',
  access_token:         '726811895542517760-YrIzreQkTVZuqZclQN0w8Y2chRwnfBO',
  access_token_secret:  'IICa3Oy8j6SJQoBLO5JbLEeUoV5hbmNK9UOlRFklzTIKE'
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
    console.log(data.entities.user_mentions[0].screen_name)
  });
}

initializeDrakeFacts();
