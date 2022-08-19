import { useState, useEffect } from "react";

function useLocalStorage(key) {

  const initialValue = localStorage.getItem(key) || null
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    if (value === null) { localStorage.removeItem(key) }
    else { localStorage.setItem(key, value) }
  }, [key, value])

  return [value, setValue]

}

export default useLocalStorage;
