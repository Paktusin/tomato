import React from "react";
import axios from 'axios';
import MovieList from "./components/MovieList/MovieList";
import {Modal, ModalBody, ModalFooter} from "reactstrap";
import MovieModal from "./components/MovieModal/MovieModal";
import tomato from './assets/fresh.png';
import Filter from "./components/Filter/Filter";

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
        movies: [],
        selectedMovie: null,
        modalOpen: false
    };

    componentDidMount() {
        this.getMovies();
    }

    getMovies() {
        axios.get(API_URL, {params: this.state.filter}).then(res => {
            this.setState({...this.state, movies: res.data.results})
        })
    }

    movieSelect(movie) {
        this.setState({...this.state, selectedMovie: movie, modalOpen: true});
    }

    toggleModal() {
        if (this.state.selectedMovie) this.setState({...this.state, modalOpen: false})
    }

    showMore() {
        let filter = {...this.state.filter, page: this.state.filter.page + 1};
        axios.get(API_URL, {params: filter}).then(res => {
            this.setState({...this.state, movies: [...this.state.movies, ...res.data.results], filter})
        })
    }

    render() {
        return (
            <div className="container-fluid app">
                <Filter/>
                <MovieList movies={this.state.movies} movieSelect={this.movieSelect.bind(this)} moreClick={this.showMore.bind(this)}/>
                <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal.bind(this)}
                       className={"modal-lg"}>
                    <ModalBody>
                        {this.state.selectedMovie && <MovieModal movie={this.state.selectedMovie}/>}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-light" onClick={this.toggleModal.bind(this)}>Close</button>
                        {this.state.selectedMovie && <a className="btn btn-secondary" target="_blank"
                                                        href={'https://www.rottentomatoes.com/' + this.state.selectedMovie.url}>
                            <img style={{height: '1rem'}} src={tomato}/> See on Rotten
                            Tomatoes</a>}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default App;