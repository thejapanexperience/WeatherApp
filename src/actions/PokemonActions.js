import API from '../API'

const PokemonActions = {

  fetchPokemon(number) {
    API.fetchPokemon(number);
  },

  fetchAllPokemon(number) {
    API.fetchAllPokemon(number);
  }
}

export default PokemonActions