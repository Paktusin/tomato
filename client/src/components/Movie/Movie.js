import React from 'react';
import './Movie.scss'
import fresh from '../../assets/fresh.png'
import rotten from '../../assets/rotten.png'
import certified_fresh from '../../assets/certified_fresh.png'

const icons = {fresh, rotten, certified_fresh};

const Movie = (props) => {
    const movie = props.movie;
    return (
        <div className="movie" onClick={props.onClick}>
            <div className={"movie-container " + movie.tomatoIcon}>
                <div className="poster" style={{backgroundImage: `url(${movie.posters.primary})`}}/>
                <div className={"body"}>
                    <div className="title p-1">{movie.title}</div>
                    <div className={"p-1"}>
                        <div className="tomato">
                            <img src={icons[movie.tomatoIcon]}/>
                            {movie.tomatoScore}%
                        </div>
                        <p>{movie.theaterReleaseDate}</p>
                        <p>Actors: {movie.actors.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movie;