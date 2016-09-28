import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';


let _weather = null
let _forecast = null

class WeatherStore extends EventEmitter{

  constructor () {
    super();

    AppDispatcher.register(action => {

      switch(action.type) {

      
        case 'RECEIVE_WEATHER':{
        _weather = action.payload.weather;
        _forecast = null;
        console.log(_weather, _forecast)
        this.emit('CHANGE');
        break;}

        case 'RECEIVE_FORECAST': {
        _forecast = action.payload.forecast;
        _weather = null;
        console.log(_weather, _forecast)
        this.emit('CHANGE');
        break;}
      
      }


    })
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb)
  }

  getWeather() {
    return _weather;
  }

  getForecast() {
    return _forecast;
  }

}


export default new WeatherStore();