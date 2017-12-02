var friends = require('../data/friends.js');
var server = require('../../server.js');

module.exports = function(app){
	var user;
	app.post("/api/friends", function (req, res) {
		module.exports.user = req.body;
		friends.friendsArray.push(req.body);
		console.log(`${req.body.name} successfully added!`)
	});

	app.get("/bestFriend", function (req,res) {
		var bestFriend = server.lookForFriends();
		res.json(bestFriend);

	});

	app.get("/api/:friends?", function(req, res) {
	  res.json(friends.friendsArray);
	});
}