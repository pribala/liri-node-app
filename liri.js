// Include the request npm package
var request = require("request");
// Include the twitter npm package, spotify npm package and keys.js
var Twitter = require('twitter');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");

var consumerKey = keys.twitterKeys.consumer_key;
var consumerSecret = keys.twitterKeys.consumer_secret;
var accessTokenKey = keys.twitterKeys.access_token_key;
var accessTokenSecret = keys.twitterKeys.access_token_secret;
var id = keys.spotifyKeys.id;
var secret = keys.spotifyKeys.secret;

// Add twitter credentials for user authentication
var client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessTokenKey,
  access_token_secret: accessTokenSecret
});

var spotify = new Spotify({
  id: id,
  secret: secret
});

var action = process.argv[2];

switch(action) {
	case "movie-this":
		var movieName = process.argv.slice(3);
		if(movieName.length>0){
			movieDetails(movieName.join(" "));
		}else {
			movieDetails("Mr.Nobody");
		}
		break;
	case "my-tweets":
		myTweets(client);
		break;
	case "spotify-this-song":
		var songName = process.argv.slice(3);
		if(songName.length>0){
			spotifyThis(spotify, songName.join(" "));
		}else {
			spotifyThis(spotify, "The Sign");
		}
		break;	
	case "do-what-it-says":
		readData();
		break;
}

function movieDetails(name){
	// Run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=40e9cece";
	var logData = "";
	logData += "Last command executed\r\n";
	logData += "node liri.js movie-this " + name+"\r\n";
	// Create a request to the queryUrl
	request(queryUrl, function(error, response, body){
		if (!error && response.statusCode === 200) {
		    // Parse the body of the site and recover the movie details
		    console.log("\n==============================================\n");
		    logData += "\r\n==============================================\r\n";
		    console.log("Title of the movie: " + JSON.parse(body).Title);
		    logData += "Title of the movie: " + JSON.parse(body).Title+"\r\n";
		    console.log("The movie was released in: " + JSON.parse(body).Year);
		    logData += "The movie was released in: " + JSON.parse(body).Year+"\r\n";
		    console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
		    logData += "IMDB Rating of the movie: " + JSON.parse(body).imdbRating+"\r\n";
		    JSON.parse(body).Ratings.forEach(function(item){
		    	if(item.Source === "Rotten Tomatoes"){
		    		console.log("Rotten Tomatoes Rating of the movie: " + item.Value);
		    		logData += "Rotten Tomatoes Rating of the movie: " + item.Value+"\r\n";
		    	}
		    });
		    console.log("Country where the movie was produced: " +JSON.parse(body).Country);
		    logData += "Country where the movie was produced: " +JSON.parse(body).Country+",";
		    console.log("Language of the movie: " + JSON.parse(body).Language);
		    logData += "Language of the movie: " + JSON.parse(body).Language+"\r\n";
		    console.log("Plot of the movie: " +JSON.parse(body).Plot);
		    logData += "Plot of the movie: " +JSON.parse(body).Plot+"\r\n";
		    console.log("Actors in the movie: " + JSON.parse(body).Actors);
		    logData += "Actors in the movie: " + JSON.parse(body).Actors+"\r\n";
		    console.log("\n==============================================\n");
		    logData += "\r\n==============================================\r\n";

		    fs.appendFile("log.txt", logData, function(err) {
				// If an error was experienced we say it.
				  if (err) {
				    console.log(err);
				  }
			  	console.log("Results logged in log file");
			});
		}
	});
}

function myTweets(client) {
	var params = {
		q: 'andubala',
		count: 20
	}
	var logData = "";
	logData += "Last command executed\r\n";
	logData += "node liri.js my-tweets\r\n";
	client.get('search/tweets', params,function(error, tweets, response){
	  if (!error) {
	  	console.log("\n=======================================================\n")
	  	logData += "\r\n=======================================================\r\n";
	  	console.log("My Tweets!\n");
	    for(var i=0; i<tweets.statuses.length; i++){
	       	console.log(tweets.statuses[i].text);
	       	logData += tweets.statuses[i].text + "\r\n";
	    	console.log(tweets.statuses[i].created_at+ "\n");
	    	logData += tweets.statuses[i].created_at+ "\r\n";
	    }
	    console.log("\n=======================================================\n")
	    logData += "\r\n=======================================================\r\n";
	    fs.appendFile("log.txt", logData, function(err) {
				// If an error was experienced we say it.
				  if (err) {
				    console.log(err);
				  }
			  	console.log("Results logged in log file");
			});
	  }
	});  
}

function spotifyThis(spotify, songName) {
	if (songName.charAt(0) === '"' && songName.charAt(songName.length -1) === '"'){
		songName = songName.substr(1,songName.length -2);
	}
	var logData = "";
	logData += "Last command executed\r\n";
	logData += "node liri.js spotify-this-song "+ songName +"\r\n";
	spotify.search({ type: 'track', query: songName }, function(err, data) {
		if (err) {
	    	return console.log('Error occurred: ' + err);
	  	}
 			console.log("\n=======================================================\n");
 			logData += "\r\n=======================================================\r\n";
	 		 for(var i=0; i<data.tracks.items.length; i++){
	 		 	if(data.tracks.items[i].name.toUpperCase() === songName.toUpperCase()){
	 		 		console.log("\nSong Name: "+ data.tracks.items[i].name);
	 		 		logData += "\r\nSong Name: "+ data.tracks.items[i].name;
	 				console.log("Album: "+ data.tracks.items[i].album.name);
	 				logData += "\r\nAlbum: "+ data.tracks.items[i].album.name;
	 				console.log("Preview URL: "+ data.tracks.items[i].preview_url);
	 				logData += "\r\nPreview URL: "+ data.tracks.items[i].preview_url;
	 				console.log("Artists: ");
	 				logData += "\r\nArtists: ";
	 				for(var j=0; j<data.tracks.items[i].artists.length;j++){
	 					console.log(data.tracks.items[i].artists[j].name);
	 					logData += "\r\n" + data.tracks.items[i].artists[j].name;
	 				}
	 		 	}
	 		 }
	 		console.log("\n=======================================================\n");
	 		logData += "\r\n=======================================================\r\n";
	 		fs.appendFile("log.txt", logData, function(err) {
				// If an error was experienced we say it.
				  if (err) {
				    console.log(err);
				  }
			  	console.log("Results logged in log file");
			});
 	});
}

function readData() {
	fs.readFile("random.txt", "utf8", function(err,data){
		if(err){
			return console.log(err);
		}
		var logData = "";
		logData += "Last command executed\r\n";
		logData += "node liri.js do-what-it-says\r\n";
		var dataArr = data.split(",");
		var doThis = dataArr[0];
		var name = dataArr[1];
		if(doThis === "spotify-this-song"){
			logData += "node liri.js spotify-this-song "+ name +"\r\n";
			spotifyThis(spotify, name);
		}
	});
}	





