import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';


let _pokemon = null
let _emAll = []

class PokemonStore extends EventEmitter{

  constructor () {
    super();

    AppDispatcher.register(action => {

      switch(action.type) {

      
        case 'RECEIVE_POKEMON':
        _pokemon = action.payload.pokemon;
        this.emit('CHANGE');
        break;
      
      

        case 'RECEIVE_ALL_POKEMON':
        _emAll = action.payload.pokemon.pokemon_entries;
        this.emit('CHANGE');
        break;
      }


    })
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb)
  }

  getPokemon() {
    return _pokemon;
  }

  getEmAll() {
    return _emAll;
  }

}


export default new PokemonStore();