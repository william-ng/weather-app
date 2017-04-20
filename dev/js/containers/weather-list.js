import React, { Component } from 'react';
import { connect } from 'react-redux';

const IMAGE_URL = 'https://www.metaweather.com/static/img/weather/';

class WeatherList extends Component {

  renderWeatherCard(weather) {
    const firstSource = weather.consolidated_weather[0];

    return (
      <div key={weather.woeid} className="card col-3">
        <img className="card-img-top" src={`${IMAGE_URL}${firstSource.weather_state_abbr}.svg`}/>
        <div className="card-block">
          <h4 className="card-title">{weather.title}</h4>
          <p>Current Temperature: {Math.round(firstSource.the_temp)}&deg;C</p>
        </div>
      </div>
    );
  }

  render() {
    const weatherList = this.props.weather_list.map((weather) => this.renderWeatherCard(weather));

    return (
      <div className="card-group">
        {weatherList}
      </div>
    );
  }
}

const mapStateToProps = ({ weather_list }) => {
  return { weather_list };
}

export default connect(mapStateToProps)(WeatherList);
