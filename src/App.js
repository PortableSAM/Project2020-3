import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { SignIn } from "./components/LogIn/SignInForm";
import { SignUp } from "./components/LogIn/SignUpForm";
import { ListApp } from "./components/List/ListApp";
import { AuthProvider } from "./components/AuthControl/Auth";
import { PrivateRoute } from "./components/RouteControl/PrivateRoute";

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <PrivateRoute exact path="/" component={ListApp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Router>
    </AuthProvider>
  );
};

export default App;
