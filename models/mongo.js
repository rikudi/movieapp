const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: String,
  releaseDate: Date,
  overview: String,
  popularity: Number,
  originalLanguage: String,
  posterPath: String // Storing the path to the poster image
})

movieSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Movie', movieSchema)