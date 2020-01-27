import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ListApp from "./components/List/ListApp";

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={ListApp} />
      </Router>
    </div>
  );
}

export default App;
