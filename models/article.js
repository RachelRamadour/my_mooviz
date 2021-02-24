var mongoose = require('mongoose')

var Schema = mongoose.Schema({
    movieName : String,
    movieDesc : String,
    movieImg : String,
});

var movieModel = mongoose.model('movies', movieSchema);

module.exports = movieModel