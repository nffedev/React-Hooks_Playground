import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import PokemonClass from "./Pokemon/PokemonClass";
import { PokemonHook } from "./Pokemon/PokemonHook";
import { Users } from "./User/Users";
import RickAndMortyClass from "./RnM/RickAndMortyClass";
import { RickAndMortyHook } from "./RnM/RickAndMortyHook";
import { InputWithRef } from "./Other/InputWithRef";
import { WindowWidth } from "./Other/WindowWidth";

import "./styles.css";

function App() {
  const [theme, setTheme] = useState("theme light");
  const [count, setCount] = useState(0);

  const changeTheme = () => {
    setTheme(theme === "theme light" ? "theme dark" : "theme light");
  };

  /* 
  DEMONSTRATES issues with memoized components still being re-renderd when parent 
  updates and no changes to child props. 

  useCallback - whenever setCount changes, 
  incrementCount value will be set accordingly.

  without useCallback, the render count in Users will increment when the 
  "Random Pokemon" button is clicked, even though there is no intentional
  update of props in Users, because both are using setState

  */
  const incrementCount = useCallback(() => {
    setCount(c => c + 1);
  }, [setCount]);

  return (
    <div className="App">
      <div className={theme}>
        <h1>Hello Devteam!!!</h1>
        <h4>Welcome to the hooks playground!</h4>
        <div>Count: {count}</div>
        <button onClick={() => changeTheme()}>Change Theme</button>
        <RickAndMortyHook />
        <br />
        <PokemonHook clickCount={() => setCount(count + 1)} />
        <br />
        <div>
          <h4>MORE HOOKS!!!</h4>
        </div>
        <InputWithRef />
        <WindowWidth />
        {/* Everytime App re-renders, the clickCount function is re-recreated */}
        <Users clickCount={incrementCount} />
        {/* <Users clickCount={() => setCount(count + 1)} /> */}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
