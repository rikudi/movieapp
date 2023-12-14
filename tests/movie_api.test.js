const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Movie = require('../models/movie')
const helper = require('../utils/helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('MOVIE_API', () => {
  beforeAll(async () => {
    //format movie db before test
    await Movie.deleteMany({})
    //create example movie
    const movie = new Movie({
      title: 'Movie 1',
      releaseDate: '1988',
      overview: 'Very good, a classic',
      popularity: 120,
      originalLanguage: 'en',
      posterPath: 'none'
    })
        
    await movie.save()
  })

  test('Movie can be added to database', async () => {
    const moviesAtStart = await helper.moviesInDb()
    console.log('movies at start ', moviesAtStart)

    await api
      .post('/api/movies')
      .expect(201)
      .expect('Content-Type', /application\/json/)
        
    const moviesAtEnd = await helper.moviesInDb()

    expect(moviesAtEnd).toHaveLength(moviesAtStart.length + 1)
  })

  test('Movies can be fetched from database with status 200 OK', async () => {
    const moviesAtStart = await helper.moviesInDb()

    await api
      .get('/api/movies')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('TMDB_API', () => {
  test('user search query returns movie data', async () => {
    const searchTerm = 'batman'
    await api
      .get('/api/movies/search')
      .query({title: searchTerm})
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})