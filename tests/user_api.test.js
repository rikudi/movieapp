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
  beforeAll(async () => {
    //format users
    await User.deleteMany({})
    //make new test user
    const testUser = {
      username: 'rikurdi',
      name: 'riku kaartoaho',
      password: 'Secret123!'
    }

    await api
      .post('/api/users')
      .send(testUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

  })
  let token
  test('user can log in with correct credentials', async () => {
    const users = await helper.usersInDb()
    console.log('USERS IN DB ', users)
    const loginData = {username: 'rikurdi', password: 'Secret123!'}
    //login with login data
    const response = await api
      .post('/api/login')
      .send(loginData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    token = response.body.token
  })

  test('movie can be added to collection by authorized user', async () => {
    const tmdbId = 55234
    await api
      .post('/api/movies')
      .set('Authorization', `Bearer ${token}`)
      .send({tmdbId})
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const user = await User.findOne({username: 'rikurdi'})
    console.log('collection: ' + user.collection)
  })

  test('movie cannot be added to collection by unauthorized user', async () => {
    const tmdbId = 55234
    await api
      .post('/api/movies')
      .set('Authorization', 'Bearer wrongtoken_asdasdsadasd23123123')
      .send({tmdbId})
      .expect(401)
      .expect('Content-Type', /application\/json/)
    
    const user = await User.findOne({username: 'rikurdi'})
    console.log('collection: ' + user.collection)
  })

  test('returns 404 Not found if incorrect id paramater', async () => {
    const tmdbId = 55232 //<-- incorrect movie id
    await api
      .delete(`/api/movies/${tmdbId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
      .expect('Content-Type', /application\/json/)
  })

  test('movie can be deleted from collection if id is found', async () => {
    const tmdbId = 55234 //<-- correct movie id
    await api
      .delete(`/api/movies/${tmdbId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const user = await User.findOne({username: 'rikurdi'})
    console.log('collection after deletion: ' + user.collection)
  })
  
  afterAll(() => {
    mongoose.connection.close()
  })
})

