const mongoose = require('mongoose')
const User = require('../models/user')
const helper = require('../utils/helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('USER_API', () => {
  beforeAll(async () => {
    //format users
    await User.deleteMany({})
  })

  test('new user can be added if requirements are met', async () => {
    //example user
    const newUser = {
      username: 'SysAdmin',
      name: 'System admin',
      password: 'Secret123!'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const userCount = await helper.usersInDb()
    expect(userCount.length).toBe(1)
    console.log(userCount)
  })

  test('new user cannot be added if password requirements arent met', async () => {
    //example user
    const newUser = {
      username: 'SysAdmin',
      name: 'System admin',
      password: 'Secret123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const userCount = await helper.usersInDb()
    expect(userCount.length).toBe(1)
    console.log(userCount)
  })

  test('new user cannot be added if username requirements arent met', async () => {
    //example user
    const newUser = {
      username: 'Sys',
      name: 'System admin',
      password: 'Secret123!'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const userCount = await helper.usersInDb()
    expect(userCount.length).toBe(1)
    console.log(userCount)
  })

  test('new user cannot be added if username is already in use', async () => {
    const newUser = {
      username: 'SysAdmin',
      name: 'System admin',
      password: 'Secret123!'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const userCount = await helper.usersInDb()
    expect(userCount.length).toBe(1)
    console.log(userCount)
  })
})

describe('MOVIE_API', () => {
  test('movie can be added to collection by authorized user', async () => {
    const requestData = { tmdbId: 55234 }
    await api
      .post('/api/movies')
      .send(requestData)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  afterAll(() => {
    mongoose.connection.close()
  })
})

