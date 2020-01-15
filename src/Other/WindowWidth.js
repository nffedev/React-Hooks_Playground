import React from "react";
import { useWindowWidth } from "../Hooks/useWindowWidth";

export const WindowWidth = () => {
  const width = useWindowWidth(); // Our custom Hook
  return <p>Window width is {width}</p>;
};
