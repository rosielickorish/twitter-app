var request = require('request');
var dotenv = require('dotenv').config()

var queryObject = {
  uri: 'https://api.twitter.com/1.1/search/tweets.json?',
  // uri: 'https://api.twitter.com/1.1/search/tweets.json?q=%23freebandnames&count=4',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  oauth: {
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
  },
  qs:{
    'count':100,
  }
};

function getTweets(name, callback){
  console.log('Getting tweets for ' + name);
  queryObject.qs['q'] = '%' + name +' AND -filter:retweets AND -filter:replies';
  queryObject.qs['is:retweet'] = false;
  console.log(queryObject);
  request(queryObject, handleResponse);

  // Callback from request to handle HTTP response
  function handleResponse(err, httpResponse, body){
    if(err){
      return callback(err);
    }
    else{

      var results = [];
      if(body){
        var jsonBody = JSON.parse(body);
        if(jsonBody.statuses){
          results = jsonBody.statuses;
        }
      }
      return callback(false, results);
    }
  }
}

module.exports = {
  getTweets:getTweets
};
