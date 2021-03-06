import React from 'react';
import './MovieModal.scss';
import apiService from "../../apiService";

class MovieModal extends React.Component {
    state = {image: null};

    componentDidMount() {
        apiService.findMovie(this.props.movie.url.replace('/m/', '')).then(res => {
            this.setState({image: res.data.image});
        })
    }

    render() {
        const movie = this.props.movie;
        let style = {height: 70};
        if (this.state.image) style = {backgroundImage: `url(${this.state.image})`, height: 290}
        return (
            <div className="movie-modal">
                <div className={"poster"} style={style}>
                    <h2 className={"title"}>{movie.title}</h2>
                </div>
                <div className={"p-3"}>
                    <p><span className="text-primary">Theater:</span> {movie.theaterReleaseDate}</p>
                    <p><span className="text-primary">DVD:</span> {movie.dvdReleaseDate}</p>
                    <p><span className="text-primary">Rating:</span> {movie.mpaaRating}</p>
                    <p><span className="text-primary">Runtime:</span> {movie.runtime}</p>
                    <p><span className="text-primary">Actors:</span> {movie.actors.join(', ')}</p>
                    <p className={"mb-2"}>
                        <span className="text-primary">Review:</span> <span
                        dangerouslySetInnerHTML={{__html: movie.synopsis}}/>
                    </p>
                </div>
                {movie.mainTrailer &&
                <div className={"trailer"}>
                    <video controls="controls">
                        <source src={movie.mainTrailer.sourceId}/>
                        Your browser doesn't support HTML5 video tag.
                    </video>
                </div>}
            </div>
        )
    }
}

export default MovieModal;
