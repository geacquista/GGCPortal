import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import {login} from "../../store/auth"
import authService from "../../services/auth.service";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedIn: false,
      error: false,
    };
  }


  handleUsernameChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    // code to authenticate user and log in

    this.props.login({email,password})
      .then((response) => {
        console.log(response)
        this.setState({ loggedIn: true });

    })
    .catch((e) => {
      this.setState({ error: true });
      console.log(e);
    });
  };

  render() {
    const { email, password, loggedIn, error } = this.state;

    console.log(loggedIn)

    if ( loggedIn&& !error) {
      return <Navigate to="/dashboard"/>;
    }

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={this.handleUsernameChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <button type="submit" 
          >Log in</button>
        </form>
        {error && <p>Invalid email or password</p>}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    users: state.users,
    auth: state.auth
  };
};

export default connect(mapStateToProps, { login})(Login);

