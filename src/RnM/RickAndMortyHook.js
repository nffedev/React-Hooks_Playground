import React, { useState, useEffect, createRef } from "react";

import { generateRandomId } from "../Helpers/generateRandomId";

import { useFetchData } from "../Hooks/useFetchData";
import { useInput } from "../Hooks/useInput";

// function useInput(initialValue) {
//   const [value, setValue] = useState(initialValue);

//   const bind = {
//     value,
//     onChange: e => {
//       setValue(e.target.value);
//     }
//   };
//   const clearValue = () => {
//     setValue(initialValue);
//   };

//   return [value, bind, clearValue];
// }

// function useFetchData(api, searchParam) {
//   const [data, setData] = useState();

//   useEffect(() => {
//     fetch(`${api}${searchParam}`)
//       .then(res => res.json())
//       .then(res => {
//         setData(res);
//       });
//   }, [api, searchParam]);

//   return data;
// }

export const RickAndMortyHook = () => {
  const style = { textTransform: "capitalize" };
  // const [characterData, setCharacterData] = useState();
  // const [inputValue, setInputValue] = useState("");
  // const [characterImages, setCharacterImages] = useState();
  const [searchParam, setSearchParam] = useState(1);
  const [searchCharacter, setSearchCharacter] = useState();

  const apis = {
    characterApi: `https://rickandmortyapi.com/api/character/`,
    characterImagesApi: `https://rickandmortyapi.com/api/character/?name=`
  };

  const characterData = useFetchData(apis.characterApi, searchParam);
  // const inputRef = createRef();
  // const characterImages = useFetchData(
  //   apis.characterImagesApi,
  //   searchCharacter
  // );

  const characterImages = useFetchData(
    apis.characterImagesApi,
    searchCharacter
  );

  const [searchInput, bindSearchInput, resetSearchInput] = useInput("");

  // useEffect(() => {
  //   fetchAndSetCharacterById(1);
  // }, []);

  // const fetchAndSetCharacterById = characterId => {
  //   fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
  //     .then(res => res.json())
  //     .then(res => {
  //       setCharacterData(res);
  //     });
  // };

  const changeCharacter = () => {
    const randomCharacterId = generateRandomId();
    setSearchParam(randomCharacterId);
  };

  const handleSearch = () => {
    setSearchCharacter(searchInput);
    resetSearchInput();
  };

  // const handleSearch = () => {
  //   setCharacterSearch(inputRef.current.value);
  // };

  // const fetchAndSetCharacterByName = () => {
  //   fetch(`https://rickandmortyapi.com/api/character/?name=${inputValue}`)
  //     .then(res => res.json())
  //     .then(res => {
  //       setCharacterImages(res);
  //       setCharacterData(res.results[0]);
  //     });
  // };

  return (
    <>
      <h2>RICK AND MORTY</h2>
      {characterData ? (
        <>
          <img
            src={characterData.image}
            alt={"Image of " + characterData.name}
          />
          <p style={style}>Name: {characterData.name}</p>
          <p style={style}>Type: {characterData.species}</p>
          <p style={style}>Status: {characterData.status}</p>
          <button onClick={changeCharacter}>Random Character</button>
          <br />
          <br />
          <input
            {...bindSearchInput}
            // ...bindSearchInput =
            // ref={inputRef}
            // onChange={e => setInputValue(e.target.value)}
            // value={inputValue}
            type="text"
          />
          <button onClick={handleSearch}>Search</button>
          {/* <button onClick={() => setSearchParam(inputValue)}>Search</button> */}
          {/* <input
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
            type="text"
          />
          <button onClick={() => fetchAndSetCharacterByName()}>Search</button> */}

          <br />
          <br />
          {characterImages && characterImages.results && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center"
              }}
            >
              {characterImages.results.map(altChar => (
                <img
                  src={altChar.image}
                  key={altChar.id}
                  alt={"Image of " + altChar.name}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
};
