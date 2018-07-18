import React from "react";
import axios from 'axios';
import Aux from "./Aux";

const API_URL = 'https://carcat.paktusin.beget.tech:8080/';

class App extends React.Component {
    state = {
        filter: {
            minTomato: 0,
            minPopcorn: 0,
            maxTomato: 100,
            maxPopcorn: 100,
            sortBy: 'release',
            type: 'dvd-streaming-all',
            page: 1
        },
        movies: []
    };

    componentDidMount() {
        this.getMovies();
    }

    getMovies() {
        axios.get(API_URL, {params: this.state.filter}).then(res => {
            console.log(res.data)
            this.setState({...this.state, movies: res.data.results})
        })
    }

    render() {
        const movies = this.state.movies;
        return (
            <Aux>
                {movies.map(movie => <h1 key={movie.id}>{movie.title}</h1>)}
            </Aux>
        )
    }
}

export default App;