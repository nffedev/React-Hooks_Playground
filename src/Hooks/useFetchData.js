import { useState, useEffect } from "react";

export function useFetchData(api, searchParam) {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`${api}${searchParam}`)
      .then(res => res.json())
      .then(res => {
        setData(res);
      });
  }, [api, searchParam]);

  return data;
}
