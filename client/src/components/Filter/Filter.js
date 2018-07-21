import React from 'react';
import def_filter from '../../../../back/filter';
import genres from '../../genres';
import Aux from "../../Aux";

class Filter extends React.Component {
    state = {filter: {...def_filter, genres: ''}};

    componentDidMount() {
    }

    genreChange(e) {
        let genres = this.getGenres();
        if (e.target.checked) {
            genres.push(e.target.value);
        } else {
            genres.splice(genres.indexOf(e.target.value), 1);
        }
        this.setState({
            filter: {...this.state.filter, genres: genres.join(';')}
        })
    }

    getGenres() {
        return (this.state.filter.genres.length > 0) ? this.state.filter.genres.split(';') : [];
    }

    tomatoChange(name, value) {
        let filter = {...this.state.filter,};
        filter[name] = value;
        this.setState({
            filter
        })
    }

    render() {
        const filter = this.state.filter;
        const selected_genres = this.getGenres();
        return (
            <div>
                <div className={"form-group"}>
                    <label>Min Tomato</label>
                    <input className="form-control" type="number" min="0" max="100" value={filter.minTomato}
                           onChange={(e) => {
                               this.tomatoChange('minTomato', e.target.value)
                           }}/>
                </div>
                <div className={"form-group"}>
                    <label>Max Tomato</label>
                    <input className="form-control" type="number" min="0" max="100" value={filter.maxTomato}
                           onChange={(e) => {
                               this.tomatoChange('maxTomato', e.target.value)
                           }}/>
                </div>
                <div className={"form-group"}>
                    <label>Genres</label>
                    {Object.keys(genres).map(key =>
                        <Aux key={key}>
                            <input type={"checkbox"}
                                   value={key}
                                   checked={selected_genres.indexOf(key) !== -1}
                                   onChange={this.genreChange.bind(this)}/>
                            <label>{genres[key]}</label>
                        </Aux>
                    )}
                </div>
            </div>
        );
    }
}

export default Filter;