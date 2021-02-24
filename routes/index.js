var express = require('express');
var router = express.Router();
var request = require('sync-request');
var mongoose = require ('mongoose');
var movieModel = require('../models/movies')



/* GET home page. */
router.get('/new-movie', function(req, res, next) {
var result = request("GET", 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=aa5e6b8638ff586388c7c421b161f705&language=fr');
var resultJSON = JSON.parse(result.getBody());


res.json({feedback: true, movies: resultJSON.results});
});



router.post('/wishlist', async function(req, res, next) {
var movieWishlist = new movieModel ({
  movieName : req.body.movieName,
  movieImg : req.body.movieImg

})

var newSavedWishList = await movieWishlist.save()

var feedback = false
if (newSavedWishList.movieName) {
  feedback = true
}

movieList = await movieModel.find()
console.log (movieList)
  res.json({feedback});
});


router.delete('/wishlist/:movieName', async function(req, res, next) {

var suppressionFilm = await movieModel.deleteOne({ movieName: req.params.movieName})

var feedback = false;

if(suppressionFilm.deletedCount == 1){
  feedback = true;
}

res.json({feedback, suppressionFilm});
});

router.get('/wishlist', async function(req, res, next) {
  var movieList = await movieModel.find()

  res.json(movieList);
});

module.exports = router;

