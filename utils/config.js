require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const TMDB_KEY = process.env.TMDB_API_KEY
const TMDB_URI = process.env.TMDB_URI

module.exports = {
    PORT, MONGODB_URI, TMDB_KEY, TMDB_URI
}