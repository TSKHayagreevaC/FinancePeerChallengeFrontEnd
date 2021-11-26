import { Component } from "react";

import "/index.css";

class Login extends Component {
  render() {
    return (
      <div className="login-form-container">
        <form className="login-form">
          <label className="login-form-label" htmlFor="loginFormUsername">
            Username
          </label>
          <input
            type="text"
            className="login-form-input"
            id="loginFormUsername"
          />
          <label className="login-form-label" htmlFor="loginFormPassword">
            Password
          </label>
          <input
            type="password"
            className="login-form-input"
            id="loginFormPassword"
          />
          <button type="submit" className="login-form-submit-button">
            Login
          </button>
        </form>
      </div>
    );
  }
}
