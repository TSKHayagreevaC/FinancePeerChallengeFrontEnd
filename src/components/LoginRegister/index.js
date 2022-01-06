import { Component } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import Login from "../Login";
import Register from "../Register";

import "./index.css";

const userStatusConstants = {
  initial: "INITIAL",
  member: "MEMBER",
  notMember: "NOT_MEMBER",
};

class LoginRegister extends Component {
  state = {
    isMember: userStatusConstants.initial,
  };
  setStateToInitial = () => {
    this.setState({ isMember: userStatusConstants.initial });
  };

  onClickDisplayLoginForm = () => {
    this.setState({ isMember: userStatusConstants.member });
  };

  onClickDisplayRegisterForm = () => {
    this.setState({ isMember: userStatusConstants.notMember });
  };

  renderLoginRegisterButtons = () => (
    <div className="register-login-button-container">
      <h1 className="login-register-heading">Welcome To FinancePeer</h1>
      <hr className="hr-line-style" />
      <h2 className="register-heading">
        Not Our Member Till Now ? Please Register Here...
      </h2>
      <button
        type="button"
        className="register-button"
        onClick={this.onClickDisplayRegisterForm}
      >
        Register
      </button>
      <hr className="hr-line-style" />
      <h2 className="login-heading">
        Already A Member Of Us ? Please Login Here...
      </h2>
      <button
        type="button"
        className="login-button"
        onClick={this.onClickDisplayLoginForm}
      >
        Login
      </button>
    </div>
  );

  renderLoginRegisterPage = () => {
    const { isMember } = this.state;
    switch (isMember) {
      case userStatusConstants.member:
        return <Login />;
      case userStatusConstants.notMember:
        return <Register setStateToInitial={this.setStateToInitial} />;
      default:
        return this.renderLoginRegisterButtons();
    }
  };
  render() {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }
    return this.renderLoginRegisterPage();
  }
}

export default LoginRegister;
