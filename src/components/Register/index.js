import { Component } from "react";
import Loader from "react-loader-spinner";

import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  failure: "FAILURE",
  success: "SUCCESS",
  inProgress: "IN_PROGRESS",
};

class Register extends Component {
  state = {
    username: "",
    password: "",
    registrationResponseMessage: "",
    registrationApiStatus: apiConstants.initial,
  };

  onSubmitRegistrationForm = async (event) => {
    this.setState({ registrationApiStatus: apiConstants.inProgress });
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = {
      username: username,
      password: password,
    };
    const registrationUrl =
      "https://srikanthdisplaydata.herokuapp.com/register/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const registerResponse = await fetch(registrationUrl, options);
    const registerResponseJson = await registerResponse.json();
    if (registerResponse.ok) {
      this.setState({
        registrationApiStatus: apiConstants.success,
        registrationResponseMessage: registerResponseJson.message,
      });
    } else {
      this.setState({
        registrationApiStatus: apiConstants.failure,
        registrationResponseMessage: registerResponseJson.message,
      });
    }
  };

  loginAfterRegistration = () => {
    const { setStateToInitial } = this.props;
    setStateToInitial();
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  renderLoader = () => (
    <div className="react-loader-spinner">
      <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  );

  renderRegistrationSuccessContainer = () => {
    const { registrationResponseMessage } = this.state;
    return (
      <div className="registration-success-container">
        <h1 className="registration-response-heading">
          {registrationResponseMessage}
        </h1>
        <button
          type="button"
          className="login-button"
          onClick={this.loginAfterRegistration}
        >
          Login
        </button>
      </div>
    );
  };

  renderRegistrationFailureContainer = () => {
    const { registrationResponseMessage } = this.state;
    return (
      <div className="registration-failure-container">
        <h1 className="registration-response-heading">
          {registrationResponseMessage}
        </h1>
        <button
          type="button"
          className="login-button"
          onClick={this.loginAfterRegistration}
        >
          Login
        </button>
      </div>
    );
  };

  renderRegistrationResponse = () => {
    const { registrationApiStatus } = this.state;
    switch (registrationApiStatus) {
      case apiConstants.failure:
        return this.renderRegistrationFailureContainer();
      case apiConstants.success:
        return this.renderRegistrationSuccessContainer();
      case apiConstants.inProgress:
        return this.renderLoader();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="registration-bg-container">
        <div className="registration-form-container">
          <h1 className="registration-form-heading">Please Register Here</h1>
          <form
            className="registration-form"
            onSubmit={this.onSubmitRegistrationForm}
          >
            <label
              className="registration-form-label"
              htmlFor="registrationFormUsername"
            >
              Username
            </label>
            <input
              type="text"
              className="registration-form-input"
              id="registrationFormUsername"
              onChange={this.onChangeUsername}
            />
            <label
              className="registration-form-label"
              htmlFor="registrationFormPassword"
            >
              Password
            </label>
            <input
              type="password"
              className="registration-form-input"
              id="registrationFormPassword"
              onChange={this.onChangePassword}
            />
            <button type="submit" className="registration-form-submit-button">
              Register
            </button>
          </form>
          {this.renderRegistrationResponse()}
        </div>
      </div>
    );
  }
}

export default Register;
