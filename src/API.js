import $ from 'jquery';
import ServerActions from './actions/ServerActions'

const API = {

  fetchWeather(location) {
      console.log(location)
      $.get(`http://api.wunderground.com/api/04566820ef16d78a/conditions/q/${location}.json` , weather => {
      ServerActions.receiveWeather(weather)
    });

  },

  fetchDefaultWeather() {
      $.get(`http://api.wunderground.com/api/04566820ef16d78a/conditions/q//autoip.json` , weather => {
      ServerActions.receiveWeather(weather)
    });

  },

  fetchForecast(location) {
      console.log(location)
      $.get(`http://api.wunderground.com/api/04566820ef16d78a/forecast/q/${location}.json` , forecast => {
      ServerActions.receiveForecast(forecast)
    });

  },

  fetchDefaultForecast() {
      $.get(`http://api.wunderground.com/api/04566820ef16d78a/forecast/q//autoip.json` , forecast => {
      ServerActions.receiveForecast(forecast)
    });

  }

}

export default API;