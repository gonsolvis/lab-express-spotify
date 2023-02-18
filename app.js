require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();



app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));


app.get("/", (req,res,next)=>{
   res.render("home")
})


app.get("/artist-search", (req,res,next)=>{
const artistSearch = req.query.artist
spotifyApi.searchArtists(artistSearch)
  .then(data => {
    console.log('The received data from the API: ', data.body.artists);
    res.render("artist-search-results", data.body.artists)
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));
})


app.get("/albums/:id", (req,res,next)=>{
  const albumId = req.params.id
  spotifyApi.getArtistAlbums(albumId)
    .then(data => {
      console.log('The received data from the API: ', data.body.id);
      res.render("album", data.body)
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));
  })

  app.get("/track-information/:trackId", (req,res,next)=>{
    const albumTrack = req.params.trackId
    spotifyApi.getAlbumTracks(albumTrack)
      .then(data => {
        console.log('The received data from the API: ', data.body);
        res.render("track-information", data.body)
      })
      .catch(err => console.log('The error while searching artists occurred: ', err));
    })
  
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
