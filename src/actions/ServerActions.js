import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  receiveWeather(weather) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_WEATHER',
      payload: { weather }
    })
  },

  receiveForecast(forecast) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_FORECAST',
      payload: { forecast }
    })
  }
}

export default ServerActions;