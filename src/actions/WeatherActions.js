import API from '../API'

const WeatherActions = {

  fetchWeather(location) {
    API.fetchWeather(location);
  },

  fetchDefaultWeather() {
    API.fetchDefaultWeather();
  },

   fetchForecast(location) {
    API.fetchForecast(location);
  },

  fetchDefaultForecast() {
    API.fetchDefaultForecast();
  }
}

export default WeatherActions