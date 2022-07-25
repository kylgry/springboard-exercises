import './App.css';
import React, { useState } from "react"
import Colors from './Colors'
import Color from './Color'
import NewColor from './NewColor'
import { v4 as uuid } from "uuid"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

function App() {

  const [colors, setColors] = useState([{color: "red", id: uuid()}, {color: "magenta", id: uuid()}])

  const addColor = color => {
    let newColor = { ...color, id: uuid() }
    setColors(colors => [...colors, newColor])
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/colors" element={<Colors colors={colors} />} />
          <Route exact path="/colors/new" element={<NewColor addColor={addColor} />} />
          <Route exact path="/color/:name" element={<Color />} />
          <Route path="*" element={<Navigate replace to="/colors" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
