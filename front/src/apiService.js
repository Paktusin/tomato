import axios from "axios";

const API_URL = 'https://tomato-279711.ey.r.appspot.com/';

export default {
    findMovie(path){
        return axios(API_URL + 'find/' + path)
    },
    getMovies(params){
        return axios.get(API_URL, {params})
    }
}
