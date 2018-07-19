import React from 'react';
import Aux from "../../Aux";
import Movie from "../Movie/Movie";

const MovieList = (props) => {
    return (
        <Aux>
            <div className="row">
            {props.movies.map(movie =>
                <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-0">
                    <Movie movie={movie}/>
                </div>
            )}
            </div>
        </Aux>
    );
};

export default MovieList;