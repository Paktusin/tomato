import React from 'react';
import Wrapper from "../../Wrapper";
import Movie from "../Movie/Movie";

const MovieList = (props) => {
    return (
        <Wrapper>
            <div className="row">
                {props.movies.map((movie,key) =>
                    <div key={key} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-0" style={{overflow:'hidden'}}>
                        <Movie movie={movie} onClick={props.movieSelect.bind(null, movie)}/>
                    </div>
                )}
                {props.movies.length > 0 &&
                <div className="col-12 px-2 mb-2">
                    <button className={"btn btn-secondary w-100 btn-lg"} onClick={props.moreClick}>Show More</button>
                </div>}
            </div>
        </Wrapper>
    );
};

export default MovieList;
