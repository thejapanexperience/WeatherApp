import $ from 'jquery';
import ServerActions from './actions/ServerActions'

const API = {

  fetchPokemon(number) {

    $.get(`https://pokeapi.co/api/v2/pokemon/${number}` , pokemon => {

      ServerActions.receivePokemon(pokemon)

    });

  },

  fetchAllPokemon(number) {

    $.get(`https://pokeapi.co/api/v2/pokedex/1/` , pokemon => {

      ServerActions.receiveAllPokemon(pokemon)

    });

  }

}

export default API;