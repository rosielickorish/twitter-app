var twitterQuery = require('./twitterQuery');
var piQuery = require('./piQuery');
var teaPig = require('./processResults');

// Create variables to hold results
var tweets = [];
var contentObject = {};

var name = 'rosielickorish';



twitterQuery.getTweets(name, getInsight);

function getInsight(twitterErr, twitterData){
  if(twitterErr){
    console.log(twitterErr);
  }
  else{
    if(twitterData){
      for(var i=0; i < twitterData.length; i ++){
        var contentObject = {
          content: twitterData[i].text,
        };
        tweets.push(contentObject);
      }
    }
  }
  console.log(tweets)
  // piQuery.getPersonalityInsight(twitterErr, name, tweets, processInsights);
}

function processInsights(err, personalityResult){
  console.dir(personalityResult)
  // processResults.processInsights(personalityResult);
}
