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
            <div className={"movie-container " + movie.tomatoIcon}>
                <div className="poster" style={{backgroundImage: `url(${movie.posters.primary})`}}/>
                <div className={"body"}>
                    <div className="title">{movie.title}</div>
                    <div className="tomato">
                        <img src={icons[movie.tomatoIcon]}/>
                        {movie.tomatoScore}%
                    </div>
                    <p>{movie.theaterReleaseDate}</p>
                </div>
            </div>
        </a>
    );
};

export default Movie;