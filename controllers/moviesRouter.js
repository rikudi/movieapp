const moviesRouter = require('express').Router()
const Movie = require('../models/mongo')
const { fetchMovieData, transformMovieData } = require('./movieAPI')

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
    const moviesData = await fetchMovieData('/movie/popular'); // Adjust the endpoint as necessary
    const updatedMoviesData = transformMovieData(moviesData.results) //transform data to desired format
    await saveMoviesToDatabase(updatedMoviesData)
    res.json(updatedMoviesData)
  } catch (error) {
    console.error('Failed to fetch & save movie data:', error);
    res.status(500).send('Error fetching movie data');
  }
});

//HTTP GET ALL REQUEST
moviesRouter.get('/', (request, response) => {
  Movie.find({}).then(movie => {
    response.json(movie)
  })
})

//HTTP GET REQUEST BY ID
moviesRouter.get('/:id', (request, response, next) => {
  Movie.findById(request.params.id)
    .then(movie => {
      if (movie) {
        response.json(movie)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
//HTTP POST REQUEST
moviesRouter.post('/', (request, response, next) => {
  const body = request.body
  //movie data format???
  const movie = new Movie({
    title: body.title,
    releaseDate: body.releaseDate
  })

  movie.save()
    .then(savedMovie => {
      response.json(savedMovie)
    })
    .catch(error => next(error))
})

moviesRouter.delete('/:id', (request, response, next) => {
  Movie.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
//HTTP PUT REQUEST
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