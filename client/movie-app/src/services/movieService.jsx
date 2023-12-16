import axios from 'axios'
const baseUrl = '/api/movies'
const loginBaseUrl = '/api/login'
const userBaseUrl = '/api/users'

const getAll = () => {
  return axios.get(baseUrl)
}
//send get request to server
const searchMovies =  async (title) => {
  try {
    const response = await axios.get(`${baseUrl}/search`, { params: {title}})
    return response.data
  } catch(error) {
    console.error('Error searching movies: ', error)
    throw error
  }
}

const findMovieById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/user-collection`, {params: {id}} )
    return response.data
  } catch (error) {
    console.error('Error searching movies: ', error)
    throw error
  }
}
//sends login post request to server
const login = async(username, password) => {
  try {
    const response = await axios.post(loginBaseUrl, { username, password })
    return response.data
  } catch(error) {
    console.error('Error: Check login credentials')
    throw error
  }
}
//sends user post request to server
const register = async(username, name, password) => {
  try {
    const response = await axios.post(userBaseUrl, { username, name, password })
    return response.data
  } catch (error) {
    console.error('Registration error')
    throw error
  }
}
//sends add movie to collection post request
const addMovie = async(movie) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {Authorization: `Bearer ${token}`}
  }
    
  try {
    const response = await axios.post(baseUrl, movie, config)
    return response.data
  } catch(error) {
    if (error.response && error.response.status === 400) {
      // Handle "Movie already in collection" error
      console.log(error.response.data.error)
    }
  }
}

//get movies from user collection
const getCollection = async () => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {    
    const response = await axios.get(`${baseUrl}/collection`, config)
    return response.data
  } catch (error) {
    console.log(error.response.data.error)
  }
}

export default {getAll, searchMovies, login, register, addMovie, getCollection, findMovieById}