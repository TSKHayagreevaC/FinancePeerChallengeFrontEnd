import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import Home from "./components/Home";
import About from "./components/AboutRoute";
import NotFound from "./components/NotFound";
import LoginRegister from "./components/LoginRegister";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/loginRegister" component={LoginRegister} />
        <AuthenticatedRoute exact path="/" component={Home} />
        <AuthenticatedRoute exact path="/about" component={About} />
        <Route exact path="/welcome-page" component={NotFound} />
        <Redirect to="/welcome-page" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
