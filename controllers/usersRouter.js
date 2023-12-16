const usersRouter = require('express').Router()
const User = require('../models/user')
const helper = require('../utils/helper')

//HTTP GET USER DATA
usersRouter.get('/', async (req, res, next) => {
  const users = await User.find({}).populate('collection', )
  res.json(users)
})
  
//HTTP POST USER
usersRouter.post('/', async (request, response, next) => {
  console.log(request.body)
  const {username, name, password} = request.body

  if(!helper.validatePassword(password)) {
    console.log('Invalid password requirements')
    return response.status(400).json({error: 'invalid password requirements'})
  }
  //hash password
  const passwordHash = await helper.hashPassword(password)
  //new user object
  const newUser = new User({
    username,
    name,
    passwordHash
  })

  try {
    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter