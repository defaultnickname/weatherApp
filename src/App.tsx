import React from "react";
import "./App.css";

import { WeatherWrapper } from "./WeatherWrapper";
import { Footer } from "./Footer";

function App() {
  return (
    <div className="App">
      <WeatherWrapper></WeatherWrapper>
      <Footer></Footer>
    </div>
  );
}

export default App;
