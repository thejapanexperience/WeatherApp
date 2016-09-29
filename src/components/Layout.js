import React, { Component } from 'react'
import WeatherActions from '../actions/WeatherActions'
import WeatherStore from '../stores/WeatherStore'

export default class Layout extends Component {
  constructor() {
    super();

    this.state = {
      weather: WeatherStore.getWeather(),
      forecast: WeatherStore.getForecast(),
      forecastLocation: ""
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
    if(!city.value){
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
    if(!city.value){
      WeatherActions.fetchDefaultForecast();
    } else {
    let stateVal = state.value
    let cityVal = city.value
    let temp = `${stateVal}/${cityVal}`
    let location = temp.replace(/ /g, "_");
    WeatherActions.fetchForecast(location);
    this.setState({
      forecastLocation: temp
    })
    }
  }

  render() {

    const { weather, forecast, forecastLocation } = this.state;
    console.log(weather, forecast, forecastLocation)


    if (weather === null && forecast === null) {

    return (
      <div className="container">
      <br/>
      <div id="mainContainer" className='container'>
        <h1 id="title" className='text-center'>Weather App</h1>

        <div className="row text-center">
          <div id="getBox">Add your state and city below</div><br/>
            <input id="state" type="text" ref="state" placeholder="NY"/> <span>  </span>
            <input id="city" type="text" ref="city" placeholder="New York" /> <span>  </span>
          <button onClick={this._fetchWeather} id="weather" className="btn btn-default">Get Weather</button> <span>  </span>
          <button onClick={this._fetchForecast} id="forecast" className="btn btn-default">Get Forecast</button>
        </div>      
        </div><br/>
        </div>

    )} else if (weather !== null && forecast === null) {

    return (
      <div className="container"><br/>
      <div id="mainContainer" className='container'>
        <h1 id="title" className='text-center'>Weather App</h1>

        <div className="row text-center">
          <div id="getBox">Add your state and city below</div><br/>
            <input id="state" type="text" ref="state" placeholder="NY"/> <span>  </span>
            <input id="city" type="text" ref="city" placeholder="New York" /> <span>  </span>
          <button onClick={this._fetchWeather} id="inputButton" className="btn btn-default">Get Weather</button> <span>  </span>
          <button onClick={this._fetchForecast} id="forecast" className="btn btn-default">Get Forecast</button>

        </div>
        <div className="col-xs-12 text-center">
        <h1>Current Weather in {weather.current_observation.display_location.city}</h1>
        </div>
        <table id="weatherTable" className="table" >
          <thead>
            <tr>
              <th>Weather</th>
              <th>Local Time</th>
              <th>Temperature °C</th>
              <th>UV</th>
              <th>Solar Radiation</th>
              <th>Humidity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img id="image" src={weather.current_observation.icon_url} alt=""/></td>
              <td>{weather.current_observation.local_time_rfc822}</td>
              <td>{weather.current_observation.temp_c}</td>
              <td>{weather.current_observation.UV}</td>
              <td>{weather.current_observation.solarradiation}</td>
              <td>{weather.current_observation.relative_humidity}</td>
            </tr>
          </tbody>
          </table>
          </div><br/>
          </div>
          )} else if (weather === null && forecast !== null) {

      return (
        <div className="container"><br/>
        <div id="mainContainer" className='container'>
          <h1 id="title" className='text-center'>Weather App</h1>
  
          <div className="row text-center">
            <div id="getBox">Add your state and city below</div><br/>
            <input id="state" type="text" ref="state" placeholder="NY"/> <span>  </span>
            <input id="city" type="text" ref="city" placeholder="New York" /> <span>  </span>
            <button onClick={this._fetchWeather} id="inputButton" className="btn btn-default">Get Weather</button> <span>  </span>
            <button onClick={this._fetchForecast} id="forecast" className="btn btn-default">Get Forecast</button>
  
          </div>
          <div className="col-xs-12">
          <h1 id="tableTitle" >Upcoming Forecast</h1>
          <h1 id="tableTitle" >{forecastLocation}</h1>
          <div className="col-xs-3"></div>
          <div className="col-xs-5">
          <table id="forecastTable" className="table" >
            <tbody className="text-center">
            {forecast.forecast.txt_forecast.forecastday.map((day,index) => (
              <tr key={index}>
                <td id="forecastTime">{day.title}</td>
              </tr>
              ))}
            </tbody>
            </table>
            </div>
            <div className="col-xs-1">
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
            <div className="col-xs-3"></div>
            </div>
            </div><br/>
            </div>
            )}
    
  }
}


