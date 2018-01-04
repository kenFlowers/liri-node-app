var request = require("request");


var spotify = require("node-spotify-api");
var spotifyKeys = new spotify({
	id: "21b74791631d4f7cb24a100bea09212b",
	secret: "52f849ef58d141cb88bc0a975e2d5a91",
});

var twitterClient = require("./keys.js");

var fs = require("fs");

var newLine = "\n";

var userCommand = process.argv[2];

function spotifyFunction(string){

	spotifyKeys.search({
		type: "track",
		query: string },
		function(err, data){
			if(err){
				console.log(err);
			}

			var songData = data.tracks.items[0];

			var previewURL = "";

			if(songData.preview_url === null){
				previewURL = "Sorry no preview URL available";
			}else{

				previewURL = songData.preview_url;
			}
			var allMusicData = "======================" + newLine +
				"===== MUSIC DATA =====" + newLine + 
				"======================" + newLine +
				"Artist: " + songData.album.artists[0].name + newLine +
				"Song: " + songData.name + newLine +
				"Preview song: " + previewURL + newLine + 
				"Album: " + songData.album.name + newLine;

			console.log(allMusicData);

			fs.appendFile("log.txt", allMusicData, "utf8", (err)=>{
				if (err) throw err;
				console.log("Song data added to log.txt file");
			})
		})
}

function omdbFunction(movieTitle){
	request("http://www.omdbapi.com/?apikey=40e9cece&t=" + movieTitle, function(error, response, body){
		if(error){
			console.log(err);
		}

		var movieInfo = JSON.parse(body);

		var allMovieData = "======================" + newLine +
			"===== MOVIE DATA =====" + newLine + 
			"======================" + newLine + 
			"Title: " + movieInfo.Title + newLine +
			"Year: " + movieInfo.Year + newLine +
			"IMDB Rating: " + movieInfo.Ratings[0].Value + newLine +
			"Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value + newLine +
			"Country: " + movieInfo.Country + newLine +
			"Langauge: " + movieInfo.Language + newLine +
			"Plot: " + movieInfo.Plot + newLine +
			"Actors: " + movieInfo.Actors + newLine;

		console.log(allMovieData);

		fs.appendFile("log.txt", allMovieData, "utf8", (err) => {
			if (err) throw err;
			console.log("Movie data added to log.txt file");
		});
	})
}

//--------TWITTER

if (userCommand === "my-tweets"){
	var userName = {screen_name: "code_hw"};
	twitterClient.get("statuses/user_timeline", userName, function(error, tweets, response){
		if(error){
			console.log(error);
		}
		for(var i = 0; i < 20 ; i++){
			console.log("Created at: " + tweets[i].created_at);
			console.log("Tweet text: " + tweets[i].text);
			console.log("==============");
			console.log("==============");
		}
	});
}

//----------SPOTIFY

if(userCommand === "spotify-this-song"){
	var string = " ";
	if(process.argv[3] === undefined){
		string = "The Sign";
	}else{
		var queryArr = [];
		for(var k = 3; k < process.argv.length; k++){
			var query = process.argv[k];
			queryArr.push(query); 
		}
		string = queryArr.join(" ");
	}


	spotifyFunction(string);
}

//---------OMDB

var movieKey = "40e9cece";

if(userCommand === "movie-this"){
	if(process.argv[3] === undefined){
		var movieString = "Mr. Nobody";
		omdbFunction(movieString);

	}else{

		var movieArray = [];
		for(var j = 3; j < process.argv.length; j++){
			movieArray.push(process.argv[j]);
		}

		var movieTitle = movieArray.join("+");

		omdbFunction(movieTitle);
	}

}	

if(userCommand === "do-what-it-says"){

	fs.readFile("random.txt", "utf8", function(error, data){
		if(error){
			console.log(error);
		}

		if(command[0] === "spotify-this-song"){
			spotifyFunction(command[1]);
		}
		if(command[0] === "movie-this"){
			omdbFunction(command[1]);
		}
		
	})
}