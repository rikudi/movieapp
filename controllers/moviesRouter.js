const moviesRouter = require('express').Router()
const Movie = require('../models/movie')
const User = require('../models/user')
const logger = require('../utils/logger')
const middlewares = require('../utils/middlewares')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { fetchMovieData, transformMovieData, fetchTMDBData } = require('./movieAPI')

//function that saves multiple movies to database
const saveMoviesToDatabase = async (movies) => {
  try {
    await Movie.insertMany(movies)
    console.log('movies saved to database')
  } catch (error) {
    console.error('error saving movies to database', error)
  }
}

/*endpoint that fetches popular movie data from API, transforms it to desired format
and saves it to mongodb*/
moviesRouter.get('/fetch-popular', async (req, res) => {
  try {
    const moviesData = await fetchMovieData('/movie/popular') // Adjust the endpoint as necessary
    const updatedMoviesData = transformMovieData(moviesData.results) //transform data to desired format
    await saveMoviesToDatabase(updatedMoviesData)
    res.json(updatedMoviesData)
  } catch (error) {
    console.error('Failed to fetch & save movie data:', error)
    res.status(500).send('Error fetching movie data')
  }
})

//HTTP GET ALL REQUEST
moviesRouter.get('/', async (request, response) => {
  const movies = await Movie.find({})
  response.json(movies)
})

//HTTP TMDB GET REQUEST by title
moviesRouter.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.title
    const data = await fetchTMDBData('/search/movie', {query: searchTerm}) //connect to endpoint with searchTerm as query
    const newData = transformMovieData(data.results) //get the data and remove unwanted attributes
    console.log(newData)
    res.json(newData)
  } catch (error) {
    res.status(500).send('Error fetching data from TMDB: ' + error.message)
  }
})
//HTTP TMDB GET REQUEST by id
moviesRouter.get('/movie/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const movieData = await fetchTMDBData(null, {}, movieId);
    console.log(movieData);
    res.json(movieData);
  } catch (error) {
    res.status(500).send('Error fetching movie details from TMDB: ' + error.message);
  }
});

//fetch the user movie id's
moviesRouter.get('/collection', async (request, response, next) => {
  try {
    console.log('request body', request.body)
    const decodedToken = jwt.verify(request.token, config.SECRET)
            //check if id matches the data
            if(!decodedToken.id) {
              return response.status(401).json({error: 'invalid token'})
            }
            //find user from database using id attribute provided by the decodedToken and store it to user
            const user =  await User.findById(decodedToken.id)
            console.log(user)
            if(!user) {
              return response.status(404).json({error: 'user not found'})
            }
    
            const userCollection = user.collection
            return response.status(200).json(userCollection)
      } catch(error) {
      console.error(error)
      next(error)
    }
})

//HTTP POST TO MOVIE COLLECTION
moviesRouter.post('/', async (request, response, next) => {
  try {
    console.log('request body:', request.body)
    const data = request.body
    console.log(data.id)
    console.log('request token: ', request.token)
    //decode user id and name from access token
    const decodedToken = jwt.verify(request.token, config.SECRET)
    console.log(decodedToken.id, decodedToken.username)
    //check if id matches the data
    if(!decodedToken.id) {
      return response.status(401).json({error: 'invalid token'})
    }
    //find user from database using id attribute provided by the decodedToken and store it to user
    const user =  await User.findById(decodedToken.id)
    console.log(user)
    if(!user) {
      return response.status(404).json({error: 'user not found'})
    }
    // Check if the tmdbId already exists in the user's collection
    const movieExists = user.collection.some(movie => movie.id === data.id)
    if (movieExists) {
      return response.status(400).json({ error: 'Movie already in collection' })
    }

    //add TMDB movieid to user collection
    user.collection.push(data)
    await user.save()
    response.status(201).json(user)
  } catch (error) {
    next(error)
  }
})
//HTTP DELETE REQUEST
moviesRouter.delete('/:tmdbId', middlewares.userExtractor, async (request, response, next) => {
  const tmdbId = parseInt(request.params.tmdbId)
  const user = request.user
  console.log(tmdbId, user)
  try {
    //find movie index from collection
    const movieIndex = user.collection.findIndex(m => m.tmdbId === tmdbId)
    if (movieIndex === -1) {
      return response.status(404).json({ error: 'Movie not found in collection' })
    }
    user.collection.splice(movieIndex, 1)
    await user.save()
    
    response.status(200).json({ message: 'movie removed from collection'})

  } catch (error) {
    next(error)
  }
})
//HTTP PUT REQUEST -- needs rework
moviesRouter.put('/:id', (request, response, next) => {
  const body = request.body
  console.log(body)
  //fix
  const movie = {
    title: body.title,
    releaseDate: body.releaseDate,
  }

  Movie.findByIdAndUpdate(request.params.id, movie, { new: true })
    .then(updatedMovie => {
      response.json(updatedMovie)
    })
    .catch(error => next(error))
})

module.exports = moviesRouter