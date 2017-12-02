
var htmlRoutes = require("./app/routing/htmlRoutes.js");
var apiRoutes = require("./app/routing/apiRoutes.js");
var friends = require('./app/data/friends.js');


var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


htmlRoutes(app, path);
apiRoutes(app);

//function that compares user scores to find the closest match
module.exports.lookForFriends = function () {
	var score_array = [];
	var current = apiRoutes.user;

	
	for (var i = 0; i < friends.friendsArray.length; i++) {
		var friendScore = 0;
		if (friends.friendsArray[i].name !== current.name) {

			
			for (var j = 0; j < friends.friendsArray[i]['scores[]'].length; j++) {
				var score = friends.friendsArray[i]['scores[]'][j];
				var difference = Math.abs(score - current['scores[]'][j])
				friendScore+=difference;
			}

			
			var friendObj = {};
			friendObj.friend = friends.friendsArray[i];
			friendObj.score = friendScore;
			score_array.push(friendObj)
		}
	}

	
	score_array.sort(function (a,b) {
		return a.score - b.score;
	});


	return score_array[0]
}

//setting the app to listen on the selected 
app.listen(PORT, function() {
  console.log("App listening on http://localhost:" + PORT);
});