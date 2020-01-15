import { useState } from "react";

export function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const bind = {
    value,
    onChange: e => {
      setValue(e.target.value);
    }
  };
  const clearValue = () => {
    setValue(initialValue);
  };

  return [value, bind, clearValue];
}
