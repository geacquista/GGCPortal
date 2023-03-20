import React, { PureComponent } from "react";
import "../../shared/style/login.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { startLogin } from "../../actions/login_actions";

class Login extends PureComponent {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  login = e => {
    e.preventDefault();
    this.setState({ email: "", password: "" });
    this.props.login(this.state);
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <form className="loginForm">
        {this.props.loggedIn ? "Logged in" : ""}
        {this.props.loginProcessing && !this.props.loggedIn ? "Logging.." : ""}
        <h1 className="heading">Sign in to G.O.A.T.S</h1>

        <span className="standardText">Or use your email instead</span>
        <div className="field">
          <div className="customInput">
            <input
              className="inputfield"
              type="email"
              placeholder="Email.."
              autoComplete="username"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="customInput">
            <input
              className="inputfield"
              type="password"
              placeholder="Password.."
              autoComplete="current-password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <span className="linkfield">Forgot Password?</span>
        </div>
        <div className="field submitfield">
          <input
            className="submit"
            type="submit"
            value="SIGN IN"
            onClick={this.login}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      users: state.users
  };
};

export default connect(
  mapStateToProps,
)(Login);
