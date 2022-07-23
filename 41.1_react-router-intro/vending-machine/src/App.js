import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import LaCroix from './LaCroix'
import Home from './Home'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/limoncello" element={<LaCroix flavor="LimonCello" />} />
          <Route exact path="/passionfruit" element={<LaCroix flavor="PassionFruit" />} />
          <Route exact path="/watermelon" element={<LaCroix flavor="Watermelon" />} />
          <Route exact path="/hibiscus" element={<LaCroix flavor="Hibiscus" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
