import React from "react";
import Game from "./components/Game/Game";
import Landing from "./components/Landing/Landing";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route component={Game} path="/game" />
      <Route component={Landing} exact path="/" />
    </div>
  );
}

export default App;
