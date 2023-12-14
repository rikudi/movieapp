const Movie = require('../models/movie')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const moviesInDb = async () => {
  const movies = await Movie.find({})
  return movies.map(movie => movie.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{7,}$/
  return passwordRegex.test(password)
}

//
const hashPassword = async (password) => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds) 
}
module.exports = { moviesInDb, usersInDb, validatePassword, hashPassword }