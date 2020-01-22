# LIRI-BotHW
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a CLI applcattion that uses node.js to take in parameters via the command line and gives you back data. This LIRI bot searches Spotify for songs, Bands in Town for concerts, and OMDB for movies.
Prerequisites
You will need to install several node packages to use this app

spotify, OMDB, Bands in Town, Moment.js, axios
Installing
npm install...
example:

npm install node-spotify-api
USAGE
Navigate to the repository. In the command line, start the application by typing "node liri.js" into the command line and typing one of the for commands after "node liri.js." Commands for LIRI are:

concert-this
spotify-this-song
movie-this
do-what-it-says
How to enter the commands
node liri.js concert-this <band/artist name here>
node liri.js spotify-this-song <song name here>
node liri.js movie this <movie name here>
node liri.js do-what-it-says
