import React from "react";
import axios from 'axios';
import Aux from "./Aux";
import MovieList from "./components/MovieList/MovieList";

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
            this.setState({...this.state, movies: res.data.results})
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <MovieList movies={this.state.movies}/>
            </div>
        )
    }
}

export default App;