import React from "react";
import PermissionUserService from "../../services/PermissionUserService";
import { connect } from "react-redux";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    PermissionUserService.getPublicLogin().then(
      (response) => {
        this.setState({ content: response.data });
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        this.setState({ content: _content });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}


function mapStateToProps(state) {
 
  return {
    isLoggedIn: state.auth,
    message: state.message
  };
}

export default connect(mapStateToProps)(Home);