import { Component } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { Loader } from "react-loader-spinner";

import "./index.css";

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

  renderLoader = () => (
    <div className="react-loader-spinner">
      <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  );

  onLoginFailure = (errorMessage) => {
    this.setState({
      loginApiStatus: apiConstants.failure,
      loginResponseMessage: errorMessage,
    });
  };

  onSuccessFullLogin = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30, path: "/" });
    this.setState({ loginApiStatus: apiConstants.success });
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

  renderLoginForm = () => (
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

  renderLoginPage = () => {
    const { loginApiStatus } = this.state;
    switch (loginApiStatus) {
      case apiConstants.success:
        return <Redirect to="/" />;
      case apiConstants.inProgress:
        return this.renderLoader();
      default:
        return this.renderLoginForm();
    }
  };

  render() {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken === undefined) {
      return this.renderLoginPage();
    }
    return <Redirect to="/" />;
  }
}

export default Login;
