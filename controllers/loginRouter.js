const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

//HTTP POST LOGIN REQUEST
loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  //find username from database, or null
  const user = await User.findOne({username})
  console.log("user found: ", user)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  // If user && password return false, error
  if (!(user && passwordCorrect)) {
    const errorMessage = 'Invalid username or password';
    console.log(`Login error: ${errorMessage}, Status: 401`);
    
    return response.status(401).json({
      error: errorMessage
    });
  }

  //user data used for token generation
  const userForToken = {
    username: user.username,
    id: user._id
  }
  //generate unique access token for user using secret, 60min timelimit
  const token = jwt.sign(userForToken, config.SECRET, {expiresIn: 60*60})

  response
    .status(200)
    .send({token, username: user.username, name: user.name})
  console.log({token, username})
})

module.exports = loginRouter