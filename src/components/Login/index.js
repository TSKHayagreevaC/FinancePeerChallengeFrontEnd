import { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import { Loader } from "react-loader-spinner";

import "./index.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    loginResponseMessage: "",
    showLoginErrorMessage: false,
    isMember: false,
  };

  renderLoader = () => (
    <div className="react-loader-spinner">
      <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  );

  onLoginFailure = (errorMessage) => {
    this.setState({
      showLoginErrorMessage: true,
      loginResponseMessage: errorMessage,
    });
  };

  onSuccessFullLogin = (jwtToken) => {
    const { history } = this.props;
    Cookies.set("jwt_token", jwtToken, { expires: 30, path: "/" });
    history.replace("/");
  };

  onSubmitLoginForm = async (event) => {
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

  renderLoginForm = () => {
    const { showLoginErrorMessage, loginResponseMessage } = this.state;
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
        {showLoginErrorMessage ? (
          <h1 className="login-response-heading">{loginResponseMessage}</h1>
        ) : null}
      </div>
    );
  };

  render() {
    return this.renderLoginForm();
  }
}

export default withRouter(Login);
