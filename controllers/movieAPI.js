const config = require('../utils/config')
const axios = require('axios')

//Function that fetches movie data from TMDB API
//URI endpoint set to /movie/popular to test fetch popular movie data.
//This function was used for testing and might be deleted
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
//function that will transform data to desired format
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
//delete this?
const fetchSearchData = async (endpoint) => {
  try {
    console.log('fetching data from tmdb ', endpoint)
    const url = `${config.TMDB_URI}${endpoint}?api_key=${config.TMDB_KEY}`
    const response = await axios.get(url)
    return response.data
  }  catch(error) {
    console.error('error connecting to API ', error)
    throw error
  } 
}
//function that fetch data from TMDB based on endpoint and parameters
const fetchTMDBData = async (endpoint, params = {}) => {
  try {
    const url = `${config.TMDB_URI}${endpoint}`
    console.log('fetching from TMDB ', url)
    const response = await axios.get(url, {
      params: {
        api_key: config.TMDB_KEY,
        ...params
      }
    })
    return response.data
  } catch(error) {
    console.error('Error connecting to TMDB API:', error)
    throw error
  }
}

module.exports = {fetchMovieData, transformMovieData, fetchSearchData, fetchTMDBData}