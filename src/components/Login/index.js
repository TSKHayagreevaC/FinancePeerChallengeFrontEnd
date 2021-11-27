import { Component } from "react";
import { createBrowserHistory } from "history";
import Cookies from "js-cookie";

import "./index.css";

const history = createBrowserHistory();

const apiConstants = {
  initial: "INITIAL",
  failure: "FAILURE",
  success: "SUCCESS",
  inProgress: "IN_PROGRESS",
};

class Login extends Component {
  state = {
    username: "",
    password: "",
    loginResponseMessage: "",
    loginApiStatus: apiConstants.initial,
  };

  onLoginFailure = (errorMessage) => {
    this.setState({
      loginApiStatus: apiConstants.failure,
      loginResponseMessage: errorMessage,
    });
  };

  onSuccessFullLogin = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30, path: "/" });
    history.replace("/");
  };

  onSubmitLoginForm = async (event) => {
    this.setState({ loginApiStatus: apiConstants.inProgress });
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = {
      username: username,
      password: password,
    };
    const loginUrl = "http://localhost:3001/login/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const loginResponse = await fetch(loginUrl, options);
    const loginResponseJson = await loginResponse.json();
    if (loginResponse.ok) {
      this.onSuccessFullLogin(loginResponseJson.jwtToken);
    } else {
      this.onLoginFailure(loginResponseJson.message);
    }
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className="login-form-container">
        <h1 className="login-form-heading">Login</h1>
        <form className="login-form" onSubmit={this.onSubmitLoginForm}>
          <label className="login-form-label" htmlFor="loginFormUsername">
            Username
          </label>
          <input
            type="text"
            className="login-form-input"
            id="loginFormUsername"
            onChange={this.onChangeUsername}
          />
          <label className="login-form-label" htmlFor="loginFormPassword">
            Password
          </label>
          <input
            type="password"
            className="login-form-input"
            id="loginFormPassword"
            onChange={this.onChangePassword}
          />
          <button type="submit" className="login-form-submit-button">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
