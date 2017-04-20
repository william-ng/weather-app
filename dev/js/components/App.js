import React from 'react';
import SearchBar from '../containers/search-bar';
import WeatherList from '../containers/weather-list';

require('../../scss/style.scss');

const App = () => (
    <div className="container">
      <div id="brand" className="jumbotron">
        <div className="container">
          <h1 className="display-3">The Weather App</h1>
          <SearchBar />
        </div>
      </div>
      <WeatherList />
    </div>
);

export default App;
