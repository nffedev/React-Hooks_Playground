import React, { useState, useEffect, createRef } from "react";
import { generateRandomId } from "../Helpers/generateRandomId";
import { useFetchData } from "../Hooks/useFetchData";
import { useInput } from "../Hooks/useInput";

export const PokemonHook = ({ clickCount }) => {
  const style = { textTransform: "capitalize" };
  const apis = {
    pokemonApi: `https://pokeapi.co/api/v2/pokemon/`
  };
  const [searchParam, setSearchParam] = useState(1);
  const [searchInput, bindSearchInput, resetSearchInput] = useInput("");
  const pokemon = useFetchData(apis.pokemonApi, searchParam);

  // const [pokemon, setPokemon] = useState();
  // const [inputValue, setInputValue] = useState("");

  // const inputRef = createRef();

  // not best practice
  // usually you want to declare functions needed by an effect inside of it.
  // useEffect(() => {
  //   fetchAndSetPokemon(1);
  // }, []);

  // const fetchAndSetPokemon = pokemonNameOrId => {
  //   fetch(`${apis.pokemonApi}${pokemonNameOrId}`)
  //     .then(res => res.json())
  //     .then(res => {
  //       setPokemon(res);
  //     });
  // };

  // const handleSearch = () => {
  //   fetchAndSetPokemon(inputRef.current.value);
  // };

  const handleSearch = () => {
    setSearchParam(searchInput);
    resetSearchInput();
  };

  const changePokemon = () => {
    const randomPokemonId = generateRandomId();
    clickCount();
    setSearchParam(randomPokemonId);
    // fetchAndSetPokemon(randomPokemonId);
  };

  // const changePokemon = () => {
  //   const randomPokemonId = Math.floor(Math.random() * 397) + 1;
  //   fetchAndSetPokemon(randomPokemonId);
  // };

  return (
    <div>
      {pokemon ? (
        <>
          <h2> POKEMON </h2>
          <img
            src={pokemon.sprites.front_default}
            alt={"Image of " + pokemon.name}
          />
          <p style={style}>Name: {pokemon.name}</p>
          <p style={style}>
            Type: {pokemon.types.map(x => x.type.name).join(", ")}
          </p>
          <input {...bindSearchInput} type="text" />
          {/* <input
            ref={inputRef}
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
          /> */}
          <button onClick={handleSearch}>Search</button>
          <button onClick={changePokemon}>Random Pokemon</button>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};
