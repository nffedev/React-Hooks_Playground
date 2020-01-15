import React from "react";

export default class RickAndMortyClass extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      character: null,
      characterImages: null
    };
  }
  componentDidMount() {
    this.fetchAndSetCharacterById(1);
  }

  fetchAndSetCharacterById(characterId) {
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ character: res });
      });
  }

  changeCharacter() {
    const randomUserId = Math.floor(Math.random() * 397) + 1;
    this.fetchAndSetCharacterById(randomUserId);
  }

  setInputValue(value) {
    this.setState({ inputValue: value });
  }

  fetchAndSetCharacterByName() {
    fetch(
      `https://rickandmortyapi.com/api/character/?name=${this.state.inputValue}`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({ characterImages: res });
        this.setState({ character: res.results[0] });
      });
  }

  render() {
    const { character, characterImages } = this.state;
    const style = { textTransform: "capitalize" };
    return (
      <div>
        {character ? (
          <>
            <img src={character.image} alt={"Image of " + character.name} />
            {characterImages &&
              characterImages.results &&
              characterImages.results.map(altChar => (
                <img src={altChar.image} alt={"Image of " + altChar.name} />
              ))}
            <p style={style}>Name: {character.name}</p>
            <p style={style}>Type: {character.species}</p>
            <p style={style}>Status: {character.status}</p>
            <input
              onChange={e => this.setInputValue(e.target.value)}
              value={this.state.inputValue}
              type="text"
            />
            <button onClick={() => this.fetchAndSetCharacterByName()}>
              Search
            </button>
            <button onClick={() => this.changeCharacter()}>
              Random Character
            </button>
          </>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}
