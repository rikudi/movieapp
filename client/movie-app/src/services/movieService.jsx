import axios from "axios";
const baseUrl = '/api/movies'

const getAll = () => {
    return axios.get(baseUrl)
}

export default {getAll}