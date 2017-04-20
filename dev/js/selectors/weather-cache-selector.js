import { createSelector } from 'reselect';

const weatherListSelector = (state) => state.weather_list;

const getWeatherInCache = (weather_list) => {
  return weather_list.map((weather) => weather.woeid);
};

export default createSelector(
  weatherListSelector,
  getWeatherInCache
);
