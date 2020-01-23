import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ListApp from "./components/ListApp";
import { ItemInput } from "./components/ItemCreate";

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={ListApp} />
        <Route path="/input" component={ItemInput} />
      </Router>
    </div>
  );
}

export default App;
