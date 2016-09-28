import React, { Component } from 'react'
import WeatherActions from '../actions/WeatherActions'
import WeatherStore from '../stores/WeatherStore'

export default class Layout extends Component {
  constructor() {
    super();

    this.state = {
      weather: WeatherStore.getWeather(),
      forecast: WeatherStore.getForecast()
    }
    this._fetchWeather = this._fetchWeather.bind(this)
    this._fetchForecast = this._fetchForecast.bind(this)
    this._onChange = this._onChange.bind(this)
  }

  componentWillMount() {
    WeatherStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    WeatherStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState ({
      weather: WeatherStore.getWeather(),
      forecast: WeatherStore.getForecast()
    })
  }

  _fetchWeather() {
    let{ state, city } = this.refs
    if(!city.val){
      WeatherActions.fetchDefaultWeather();
    } else {
    let stateVal = state.value
    let cityVal = city.value
    let temp = `${stateVal}/${cityVal}`
    let location = temp.replace(/ /g, "_");
    WeatherActions.fetchWeather(location);
    }
  }
   _fetchForecast() {
    let{ state, city } = this.refs
    if(!city.val){
      WeatherActions.fetchDefaultForecast();
    } else {
    let stateVal = state.value
    let cityVal = city.value
    let temp = `${stateVal}/${cityVal}`
    let location = temp.replace(/ /g, "_");
    WeatherActions.fetchForecast(location);
    }
  }

  render() {

    const { weather, forecast } = this.state;
    console.log(weather, forecast)


    if (weather === null && forecast === null) {

    return (
      <div className='container'>
        <h1 id="title" className='text-center'>Weather App</h1>

        <div className="row text-center">
          <div id="getBox">Choose your location to get the current weather</div>
          <input id="state" type="text" ref="city" placeholder="CA"/> <span>  </span>
          <input id="city" type="text" ref="city" placeholder="San Francisco" /> <span>  </span>
          <button onClick={this._fetchWeather} id="weather" className="btn btn-info">Get Weather</button>
          <button onClick={this._fetchForecast} id="forecast" className="btn btn-info">Get Forecast</button>
        </div>      
        </div>

    )} else if (weather !== null && forecast === null) {

    return (
      <div className='container'>
        <h1 id="title" className='text-center'>Weather App</h1>

        <div className="row text-center">
          <div id="getBox">Choose your location to get the current weather</div>
          <input id="state" type="text" ref="city" placeholder="CA"/> <span>  </span>
          <input id="city" type="text" ref="city" placeholder="San Francisco" /> <span>  </span>
          <button onClick={this._fetchWeather} id="inputButton" className="btn btn-info">Get Weather</button>
          <button onClick={this._fetchForecast} id="forecast" className="btn btn-info">Get Forecast</button>

        </div>
        <div className="col-xs-12 text-center">
        <h1>Current Weather in {weather.current_observation.display_location.city}</h1>
        </div>
        <table className="table" >
          <thead>
            <tr>
              <th>Weather</th>
              <th>Temperature °C</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img id="image" src={weather.current_observation.icon_url} alt=""/></td>
              <td>{weather.current_observation.temp_c}</td>
            </tr>
          </tbody>
          </table>
          </div>
          )} else if (weather === null && forecast !== null) {

      return (
        <div className='container'>
          <h1 id="title" className='text-center'>Weather App</h1>
  
          <div className="row text-center">
            <div id="getBox">Choose your location to get the current weather</div>
            <input id="state" type="text" ref="city" placeholder="CA"/> <span>  </span>
            <input id="city" type="text" ref="city" placeholder="San Francisco" /> <span>  </span>
            <button onClick={this._fetchWeather} id="inputButton" className="btn btn-info">Get Weather</button>
            <button onClick={this._fetchForecast} id="forecast" className="btn btn-info">Get Forecast</button>
  
          </div>
          <div className="col-xs-12">
          <h1>Forecast for your current location</h1>
          <div className="col-xs-6"><table className="table" >
            <tbody className="text-center">
            {forecast.forecast.txt_forecast.forecastday.map((day,index) => (
              <tr key={index}>
                <td id="forecastTime">{day.title}</td>
              </tr>
              ))}
            </tbody>
            </table>
            </div>
            <div className="col-xs-6">
            <table className="table text-center col-xs-6" >
            <tbody className="text-center">
            {forecast.forecast.txt_forecast.forecastday.map((day,index) => (
              <tr key={index}>
                <td id="forecastImage"><img src={day.icon_url} alt=""/></td>
              </tr>
              ))}
            </tbody>
            </table>
            </div>
            </div>
            </div>
            )}
    
  }
}


