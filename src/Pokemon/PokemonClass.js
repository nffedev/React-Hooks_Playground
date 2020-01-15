import React from "react";

export default class PokemonClass extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      pokemon: null
    };
  }

  componentDidMount() {
    this.fetchAndSetCharacterById(94);
  }

  changePokemon() {
    const randomPokemonId = Math.floor(Math.random() * 397) + 1;
    this.fetchAndSetCharacterById(randomPokemonId);
  }

  fetchAndSetCharacterById(pokemonId) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(res => res.json())
      .then(res => {
        this.setState({ pokemon: res });
      });
  }

  fetchAndSetCharacterByName() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.inputValue}/`)
      .then(res => res.json())
      .then(res => {
        this.setState({ pokemon: res });
      });
  }

  setInputValue(value) {
    this.setState({ inputValue: value });
  }

  render() {
    const pokemon = this.state.pokemon;
    const style = { textTransform: "capitalize" };
    return (
      <div>
        {pokemon ? (
          <>
            <img
              src={pokemon.sprites.front_default}
              alt={"Image of " + pokemon.name}
            />
            <p style={style}>Name: {pokemon.name}</p>
            <p style={style}>
              Type: {pokemon.types.map(x => x.type.name).join(", ")}
            </p>
            <input
              onChange={e => this.setInputValue(e.target.value)}
              value={this.state.inputValue}
              type="text"
            />
            <button onClick={() => this.fetchAndSetCharacterByName()}>
              Search
            </button>
            <button onClick={() => this.changePokemon()}>Random Pokemon</button>
          </>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}
