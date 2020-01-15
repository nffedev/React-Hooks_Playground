import React, { useRef } from "react";

export const InputWithRef = () => {
  const inputRef = useRef();
  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>
        Click to Focus the input
      </button>
    </div>
  );
};
