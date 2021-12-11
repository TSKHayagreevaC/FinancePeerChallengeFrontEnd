import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import Home from "./components/Home";
import NotFound from "./components/NotFound";
import LoginRegister from "./components/LoginRegister";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/loginRegister" component={LoginRegister} />
        <AuthenticatedRoute exact path="/" component={Home} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
