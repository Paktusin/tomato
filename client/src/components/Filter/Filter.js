import React from 'react';
import def_filter from '../../../../back/filter';
import genres from '../../genres';
import './Filter.scss'
import LocalStorageService from "../../localStorageService";
const storage = new LocalStorageService('tomato');

class Filter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filter : {...def_filter, genres: '',...storage.get('filter')}
        }
    }

    componentDidMount() {
        this.props.changeFilter(this.state.filter);
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
        }, () => {
            this.props.changeFilter(this.state.filter);
            storage.put('filter',this.state.filter)
        });
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
            <div className="row filter">
                {/*<div className={"form-group col-6 col-sm-4 col-lg-2"}>*/}
                {/*<label>Min Tomato</label>*/}
                {/*<input className="form-control" type="number" min="0" max="100" value={filter.minTomato}*/}
                {/*onChange={(e) => {*/}
                {/*this.tomatoChange('minTomato', e.target.value)*/}
                {/*}}/>*/}
                {/*</div>*/}
                <div className={"form-group col"}>
                    <label>Genres:</label>
                    <div className={"inline-check"}>
                        {Object.keys(genres).map(key =>
                            <div className="form-check" key={key}>
                                <input type={"checkbox"}
                                       value={key}
                                       id={'genre' + key}
                                       checked={selected_genres.indexOf(key) !== -1}
                                       onChange={this.genreChange.bind(this)}/>
                                <label htmlFor={'genre' + key}>{genres[key]}</label>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;