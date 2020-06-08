import React from 'react';
import def_filter from '../../filter';
import genres from '../../genres';
import './Filter.scss'
import LocalStorageService from "../../localStorageService";
import Wrapper from "../../Wrapper";

const storage = new LocalStorageService('tomato');

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {...def_filter, genres: '', ...storage.get('filter')},
            hidden: true
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
            storage.put('filter', this.state.filter)
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

    toggle() {
        this.setState({...this.state, hidden: !this.state.hidden})
    }

    render() {
        const selected_genres = this.getGenres();
        const is_active = selected_genres.length>0;
        return (
            <Wrapper>
                <button className={"filter-toggle "+(!this.state.hidden?'active':'')}
                        onClick={this.toggle.bind(this)}>
                    <span>{!this.state.hidden && 'hide '}filter{is_active && this.state.hidden ? 'ed '+selected_genres.length:''}</span>
                </button>
                <div className={"filter " + (this.state.hidden ? 'hidden' : '')}>
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
            </Wrapper>
        );
    }
}

export default Filter;
