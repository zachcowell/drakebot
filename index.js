var Twit = require('twit')

var T = new Twit({
  consumer_key:         'UBkJG6NZzEAHJoB1FgRowrj4b',
  consumer_secret:      '0DhjeIYu4WRIYxSQZlKUKdlD61mAKT17VZ9zZUP3VB3KSta5Ss',
  access_token:         '726811895542517760-YrIzreQkTVZuqZclQN0w8Y2chRwnfBO',
  access_token_secret:  'IICa3Oy8j6SJQoBLO5JbLEeUoV5hbmNK9UOlRFklzTIKE',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

//
//  tweet 'hello world!'
//

function postDrakeFact(){

}

T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)
})

// var stream = T.stream('statuses/filter', { track: '#DrakeFacts' })
//
// stream.on('tweet', function (tweet) {
//   var userName = tweet.user.screen_name;
//   console.log(userName)
// })
