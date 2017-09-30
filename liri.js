// Include the request npm package
var request = require("request");
var action = process.argv[2];
switch(action) {
	case "movie-this":
		//var movieName = "";
		var movieName = process.argv.slice(3);
		if(movieName.length>0){
			movieDetails(movieName);
		}else {
			movieDetails("Mr.Nobody");
		}
		
}

function movieDetails(name){
	// Run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=40e9cece";
	// This line is just to help us debug against the actual URL.
	//console.log(queryUrl);
	// Create a request to the queryUrl
	request(queryUrl, function(error, response, body){
		if (!error && response.statusCode === 200) {
		    //console.log(body);
		    // Parse the body of the site and recover the movie details
		    console.log("Title of the movie:" + JSON.parse(body).Title);
		    console.log("The movie was released in: " + JSON.parse(body).Year);
		    console.log("IMDB Rating of the movie:" + JSON.parse(body).imdbRating);
		    JSON.parse(body).Ratings.forEach(function(item){
		    	if(item.Source === "Rotten Tomatoes"){
		    		console.log("Rotten Tomatoes Rating of the movie:" + item.Value);
		    	}
		    })
		    //console.log("Rotten Tomatoes Rating of the movie:" + JSON.parse(body).Ratings[1].Source);
		    console.log("Country where the movie was produced:" +JSON.parse(body).Country);
		    console.log("Language of the movie:" + JSON.parse(body).Language);
		    console.log("Plot of the movie:" +JSON.parse(body).Plot);
		    console.log("Actors in the movie:" + JSON.parse(body).Actors);
		}
	});
}



