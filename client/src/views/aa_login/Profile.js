import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import Login from "./Login";

class Profile extends Component {
  render() {
    const { user: currentUser } = this.props;
    console.log(currentUser)

    // if (!currentUser) {
    //   return <Navigate to="/login" component={<Login/>} />;
    // }


  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.nickname}</strong> Profile
        </h3>
      </header>
      {/* <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p> */}
      <p>
        <strong>Id:</strong> {currentUser.userID}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.permissionType}
      </ul>
    </div>
  );
};
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
