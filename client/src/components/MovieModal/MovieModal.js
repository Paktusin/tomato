import React from 'react';
import './MovieModal.scss';

const MovieModal = (props) => {
    const movie = props.movie;
    console.log(movie);
    return (
        <div className="movie-modal">

            <div className={"p-2"}>
            <p><span className="text-primary">Theater:</span> {movie.theaterReleaseDate}</p>
            <p><span className="text-primary">DVD:</span> {movie.dvdReleaseDate}</p>
            <p><span className="text-primary">Rating:</span> {movie.mpaaRating}</p>
            <p><span className="text-primary">Runtime:</span> {movie.runtime}</p>
            <p><span className="text-primary">Actors:</span> {movie.actors.join(', ')}</p>
            <p className={"mb-2"}>
                <span className="text-primary">Review:</span> <span dangerouslySetInnerHTML={{__html: movie.synopsis}}/>
            </p>
            {movie.mainTrailer &&
            <div className={"trailer"}>
                <video controls="controls">
                    <source src={movie.mainTrailer.sourceId}/>
                    Your browser doesn't support HTML5 video tag.
                </video>
            </div>}
            </div>
        </div>
    )
};

export default MovieModal;