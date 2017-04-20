import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchWeather } from '../actions';
import WeatherCacheSelector from '../selectors/weather-cache-selector';

const WEATHER_LOCATION_API = 'https://www.metaweather.com/api/location/search/?query=';
const INITIAL_STATE = {
  value: '',
  not_found: null,
  possible_match: []
};

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
      window.addEventListener('click', this.clearPossible.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.clearPossible.bind(this));
  }

  locateCity(city) {
    const url = `${WEATHER_LOCATION_API}${city}`;
    const request = axios.get(url);

    request.then(({data}) => {
      if(data.length == 1) {
        if(!this.props.cache.includes(data[0].woeid)) {
          this.props.fetchWeather(data[0].woeid);
        }
      } else if(data.length == 0) {
        this.setState(Object.assign({}, INITIAL_STATE, { not_found: city }));
      } else {
        this.setState(Object.assign({}, INITIAL_STATE, { possible_match: data }));
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.locateCity(this.state.value);
    this.setState({value: ''});
  }
  onChange(e) {
    this.setState({ value: e.target.value, not_found: null });
  }
  clearPossible() {
    this.setState({possible_match: []});
  }
  onClickPossible(e) {
    this.setState(INITIAL_STATE);
    this.props.fetchWeather(e.target.dataset.woeid);
  }
  renderAlert() {
    return (
      <div className="alert alert-warning" role="alert">
      <strong>City "{this.state.not_found}" not found</strong>
      </div>
    );
  }
  renderPossibleCites(cities) {
    return (
      <div id="possible-match" className="list-group">
        {cities.slice(0, 10).map((city) => {
          return (
            <button key={city.woeid}
              data-woeid={city.woeid}
              type="button"
              className="list-group-item list-group-item-action"
              onClick={this.onClickPossible.bind(this)}
            >{city.title}</button>
          );
        })}
      </div>
    )
  }
  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input
          className="form-control"
          placeholder="Enter a City to get your latest weather"
          onChange={this.onChange.bind(this)}
          value={this.state.value}
        />
        {this.state.not_found ? this.renderAlert() : ''}
        {this.state.possible_match ? this.renderPossibleCites(this.state.possible_match) : ''}
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cache: WeatherCacheSelector(state)
  }
};

export default connect(mapStateToProps, {fetchWeather})(SearchBar);
