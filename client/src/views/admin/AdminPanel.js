import React, { Component } from "react";
import { connect } from "react-redux";
import PermissionTypes from "../../App"

import { addUser, retrieveUsers, deleteAllUsers, retrieveUser , updateUser, deleteUser, findUsersByPermission } from "../../store/user_slice";

class AdminPanel extends Component {
  constructor(props) {
    super(props);

    // handles the input changing local state
    this.handleInputChange = this.handleInputChange.bind(this);

    // this.onChangePermissionFilter = this.onChangePermissionFilter.bind(this);

    // refresh index
    this.refreshList = this.refreshList.bind(this);

    // set active user
    this.setActiveUser= this.setActiveUser.bind(this);

    this.findUsersByPermission = this.findUsersByPermission.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeUser = this.removeUser.bind(this);
    
    this.saveUser = this.saveUser.bind(this);
    this.refreshUser = this.refreshUser.bind(this);

    this.state = {
      id: null,
      email: "",
      password: "",
      nickname: "",
      permissionType: "", 

      currentUser: {
        userID: null,
        email: "",
        password: "",
        nickname: "",
        permissionType: "", 
      },
      
      currentIndex: -1,
      message: "",

    };
  }

  // This gets the users when the component loads
  componentDidMount() {
    this.props.retrieveUsers();
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  saveUser() {
    const { currentUser, currentIndex } = this.state;
    const {email, password, nickname, permissionType} = this.state;

    this.props
      .addUser({email, password, nickname, permissionType})
      .then((data) => {
        this.setState({
          id: data.userID,

          email: data.email,
          password: data.password,
          nickname: data.nickname,
          permissionType: data.permissionType, 
          currentUser: data
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshUser() {
    this.setState({
      email: "",
      password: "",
      nickname: "",
      permissionType: "", 

    });
  }

  refreshList() {
    this.setState({
      currentUser: null,
      currentIndex: -1,
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index,
    });
  }

  removeAllUsers() {
    this.props
      .deleteAllUsers()
      .then((data) => {
        console.log(data);
        this.refreshList();
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateUser({ id: this.state.currentUser.userID, data: this.state.currentUser })
      .unwrap()
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The user was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeUser(userID) {
    this.props
      .deleteUser({ id: this.state.currentUser.userID })
      .catch((e) => {
        console.log(e);
      });
  }

  findUsersByPermission() {
    this.refreshData();

    this.props.findUsersByPermission({ permissionType: this.state.filterOption });
  }


  render() {
    const {users} = this.props;
    console.log(users);
    const { currentUser, currentIndex } = this.state;

    return (
        <div id='AdminPanel'>
            <h1>TEST:admin?</h1>
              <div>
                <div id='OrderView_Header'>
                    {/**on submit i want to dispatch the create user action  */}
                    <button onClick={this.saveUser} type="submit">Save</button>
                    <button onClick={this.refreshUser}>Cancel</button>
                    <button className="m-3 btn btn-sm btn-danger" onClick={this.removeAllUsers} > Remove All </button>
                </div>
                <div className="list_users">
                  <h3>List of users</h3>
                  <ul className="list-group">
                    {users &&
                      users.map((user, index) => (
                        <li className={"list-group-item " + (index === currentIndex ? "active" : "")}
                            onClick={() => this.setActiveUser(user, index)} key={index}>
                            {user.nickname}
                            <button onClick={this.updateContent} type="submit">Edit</button>
                            {/* <button onClick={this.removeUser} type="delete">Delete</button> */}
                        </li>
                      ))}
                  </ul>

                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    required
                    value={this.state.email || ''}
                    onChange={this.handleInputChange}
                    name="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    value={this.state.password || ''}
                    onChange={this.handleInputChange}
                    name="password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nickname">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nickname"
                    value={this.state.nickname || ''}
                    onChange={this.handleInputChange}
                    name="nickname"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Permission Type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="message"
                    value={this.state.permissionType || ''}
                    onChange={this.handleInputChange}
                    name="permissionType"
                  />
                </div>
              </div>

              <div className="col-md-6">
                {currentUser.userID ? (
                  <div>
                    <h4>User</h4>
                    <div>
                      <label>
                        <strong>Name:</strong>
                      </label>{" "}
                      {"Hello " + currentUser.nickname + ": " + currentUser.email + " USERID " + currentUser.userID}
                    </div>
                    <div>
                      <label>
                        <strong>Permission:</strong>
                      </label>{" "}
                      {currentUser.permissionType}
                    </div>
                    <button onClick={this.updateContent} type="submit">Edit</button>
                    <button onClick={this.removeUser} type="delete">Delete</button>

      {/* {              
                    <Link
                      to={"/users/" + currentUser.userID}
                      className="badge badge-warning">
                      Edit
                    </Link> } */}
                  </div>
                ) : (
                  <div>
                    <br />
                    <p>Please click on a User...</p>
                  </div>
                )}
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

export default connect(mapStateToProps, { addUser, retrieveUsers, retrieveUser, updateUser, deleteUser, deleteAllUsers, findUsersByPermission })(AdminPanel);