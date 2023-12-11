const config = require('../utils/config')
const axios = require('axios')

//This is the controller that fetches movie data from TMDB API
//URI endpoint set to /movie/popular to test fetch popular movie data.

const fetchMovieData = async (endpoint) => {
  try {
    console.log('fetching movie data from ', endpoint)
    const url = `${config.TMDB_URI}${endpoint}?api_key=${config.TMDB_KEY}`
    const response = await axios.get(url)
    return response.data
  }
  catch(error) {
    console.error('error connecting to API ', error)
    throw error
  } 
}

const transformMovieData = (movies) => {
  return movies.map(movie  => {
    return {
      title: movie.title,
      releaseDate: movie.release_date,
      overview: movie.overview,
      popularity: movie.popularity,
      originalLanguage: movie.original_language,
      posterPath: movie.poster_path
    }
  })
}

module.exports = {fetchMovieData, transformMovieData}