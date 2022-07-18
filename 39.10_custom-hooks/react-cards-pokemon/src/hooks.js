import { useState } from "react"
import uuid from "uuid";
import axios from "axios";

function useFlip(initialVal = false) {
  const [value, setValue] = useState(initialVal)
  const toggle = () => {
    setValue(oldValue => !oldValue);
  }

  return [value, toggle]
}

function useAxios(baseUrl) {
  const [state, setState] = useState([])
  const addState = async (endOfUrl = "") => {
    const response = await axios.get(`${baseUrl}${endOfUrl}`)
    setState(state => [...state, { ...response.data, id: uuid() }])
  }
  return [state, addState]
}

export { useFlip, useAxios }
