import axios from "axios";
const baseUrl = '/api/movies'

const getAll = () => {
    return axios.get(baseUrl)
}

const searchMovies =  async (title) => {
    try {
        const response = await axios.get(`${baseUrl}/search`, { params: {title}})
        return response.data
    } catch(error) {
        console.error('Error searching movies: ', error)
        throw error
    }
}

export default {getAll, searchMovies}