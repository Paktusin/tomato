import axios from "axios";

const API_URL = process.env.REACT_APP_DEV ? 'http://localhost:8080' : 'https://tomato-279711.ey.r.appspot.com/';

export default {
    findMovie(path) {
        return axios(API_URL + 'find/' + path)
    },
    getMovies(params) {
        return axios.get(API_URL, {params})
    }
}
