import React, { Component } from "react";
import { connect } from "react-redux";

import { addUser, retrieveUsers } from "../../actions/user_actions";

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeNickname = this.onChangeNickname.bind(this);
    this.onChangePermission = this.onChangePermission.bind(this);
    
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      id: null,

      email: "",
      password: "",
      nickname: "",
      permissionType: "", 

    };
  }

  componentDidMount() {
    this.props.retrieveUsers();
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeNickname(e) {
    this.setState({
      nickname: e.target.value,
    });
  }
  onChangePermission(e) {
    this.setState({
      permissionType: e.target.value,
    });
  }

  saveUser() {
    const {email, password, nickname, permissionType} = this.state;

    this.props
      .addUser({email, password, nickname, permissionType})
      .then((data) => {
        this.setState({
          id: data.id,

          email: data.email,
          password: data.password,
          nickname: data.nickname,
          permissionType: data.permissionType, 
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      id: null,

      email: "",
      password: "",
      nickname: "",
      permissionType: "", 

    });
  }



  render() {
    const {users} = this.props;
    // const { currentUser, currentIndex } = this.state;

    return (
        <div id='OrderDetails'>
            <h1>TEST:admin?</h1>
              <div>
                <div id='OrderView_Header'>
                    {/**on submit i want to dispatch the create user action  */}
                    <button onClick={this.saveUser} type="submit">Save</button>
                    <button onClick={this.newUser}>Cancel</button>
                </div>
                <div className="list_users">
                  <h3>List of users</h3>
                    {/* <table className="list-group">
                        {users &&
                          users.map((user, index) => (
                            <tbody key={index}>
                              {user.nickname}
                            </tbody>
                          ))}
                      </table> */}
                  </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    required
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    name="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="assword">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    name="password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nickname">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nickname"
                    value={this.state.nickname}
                    onChange={this.onChangeNickname}
                    name="nickname"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Permission Type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="message"
                    value={this.state.permissionType}
                    onChange={this.onChangePermission}
                    name="message"
                  />
                </div>
              </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps, { addUser, retrieveUsers })(AdminPanel);