import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import AutheticatedRoute from "./components/AuthenticatedRoute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <AutheticatedRoute exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
