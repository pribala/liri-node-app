# liri-node-app


## Overview
LIRI is a Language Interpretation and Recognition Interface.It is a command line node app that takes in parameters and gives you back data.


## What Each Command Does

1. node liri.js my-tweets

   This will show the last 20 tweets and when they were created at in    the terminal/bash window.

2. node liri.js spotify-this-song '<song name here>'

   This will show the following information about the song in the    terminal/bash window

  * Artist(s)

  * The song's name

  * A preview link of the song from Spotify

  * The album that the song is from

   If no song is provided then the program will default to "The Sign" by    Ace of Base.

3. node liri.js movie-this '<movie name here>'

   This will output the following information to your terminal/bash    window:

  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.

   If the user doesn't type a movie in, the program will output data for    the movie 'Mr. Nobody.'

4. node liri.js do-what-it-says

   Using the fs Node package, LIRI will take the text inside of    random.txt and then use it to call one of LIRI's commands.

   It runs spotify-this-song for "I Want it That Way".

## Enhancements

   In addition to logging the data to the terminal/bash window, it    outputs the data to a .txt file called log.txt.
   The app uses inquirer package to prompt the users for argument    values.

## NPM Packages Used

   To retrieve the data that powers this app, the following Node    packages are used.

  * Twitter

  * Spotify

  * Request

   Request is userd to grab data from the OMDB API.
   Node fs package is used to read and write to an external file.
  
  * Chalk 
   Chalk package is used to style the terminal display. 

  * Inquirer
    Inquirer package is used for providing interactive command line user     interfaces.		
