//required installations
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var axios = require("axios");
// var inquirer = require("inquirer");
var bandsintown = require("bandsintown");
var omdb = require("omdb");
var moment = require("moment");
moment().format();

//global variables
var action = process.argv[2];
var functionDataRaw = process.argv.splice(3, process.argv.length - 1);
var functionData = functionDataRaw.join(" ");

var pick = function(action, functionData) {
  switch (action) {
    case "movie-this":
      movie(functionData);
      break;

    case "concert-this":
      artist(functionData);
      break;

    case "spotify-this-song":
      song(functionData);
      break;

    case "do-what-it-says":
      says();
      break;

    default:
    case "spotify-this-song":
      defaultSearch = "The Sign";
      song(defaultSearch);
  }
};

function song(functionData) {
  // console.log("hi")
  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: "track", query: functionData, limit: 1 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    // console.log(name)
    // console.log(data.tracks)
    for (var key in data.tracks.items) {
      console.log(data.tracks.items[key].artists[0].name);
      console.log(data.tracks.items[key].preview_url);
      console.log(data.tracks.items[key].name);
      console.log(data.tracks.items[key].album.name);
    }
  });
}

function artist() {
  // var args = process.argv;
  var item = functionData;

  axios
    .get(
      "https://rest.bandsintown.com/artists/" + item + "/events?app_id=trilogy"
    )
    .then(function(response) {
      console.log(item + " is playing at: " + response.data[0].venue.name);
      console.log("This is located in: " + response.data[0].venue.city);

      var date = response.data[0].datetime;
      var momentTime = moment(date).format("MM/DD/YYYY");

      console.log("The date of the show is: " + momentTime);
    })

    .catch(function(err) {
      console.log(`Sorry, I don't know that one.`);
    });
}

function movie() {
  var movieChoice = functionData;

  axios
    .get(
      "http://www.omdbapi.com/?t=" +
        movieChoice +
        "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      //title of the movie
      console.log("Title: " + response.data.Title);
      //year the movie came out
      console.log("Year: " + response.data.Year);
      //IMDB rating of the movie
      console.log("IMDB Rating: " + response.data.imdbRating);
      //rotten tomatoes rating of the movie
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      //country where the movie was produced
      console.log("Country: " + response.data.Country);
      //language of the movie
      console.log("Language: " + response.data.Language);
      //plot of the movie
      console.log("Plot: " + response.data.Plot);
      //actors in the movie
      console.log("Actors: " + response.data.Actors);
    });
}

function says() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    // If experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");

    action1 = dataArr[0];
    functionData1 = dataArr[1];

    pick(action1, functionData1);
  });
}

pick(action, functionData);
