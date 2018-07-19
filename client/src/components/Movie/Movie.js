import React from 'react';
import './Movie.scss'
import fresh from '../../assets/fresh.png'
import rotten from '../../assets/rotten.png'
import certified_fresh from '../../assets/certified_fresh.png'

const icons = {fresh, rotten, certified_fresh};

const Movie = (props) => {
    const movie = props.movie;
    console.log(movie);
    return (
        <a className="movie" href={`#/${movie.id}`}>
            <div className="movie-container">
                <div className="poster" style={{backgroundImage: `url(${movie.posters.primary})`}}/>
                <div className={"body"}>
                <div className="tomato">
                    <img src={icons[movie.tomatoIcon]}/>
                    {movie.tomatoScore}%
                </div>
                <span className="title">{movie.title}</span>
                </div>
            </div>
        </a>
    );
};

export default Movie;