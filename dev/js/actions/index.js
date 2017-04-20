import axios from 'axios';

// action types
export const FETCH_WEATHER = 'FETCH_WEATHER';

// api
const WEATHER_DETAIL_API = 'https://www.metaweather.com/api/location/';


export function fetchWeather(woeid) {
  const url = `${WEATHER_DETAIL_API}${woeid}`;
  const request = axios.get(url);

  return (dispatch) => {
    request.then(({data}) => {
      dispatch({
        type: FETCH_WEATHER,
        payload: data
      });
    });
  }
}
