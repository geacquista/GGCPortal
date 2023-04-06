import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../../store/auth";
import { clearMessage } from "../../store/message";
import Profile from "./Profile";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(clearMessage());
  }

  handleLogin(formValue) {
    const { username, password } = formValue;
    this.setState({ loading: true });
    this.props
      .dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        this.props.history.push("/profile");
        window.location.reload();
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    console.log(isLoggedIn)
    const { isLoggedIn, message } = this.props;

    if (isLoggedIn) {
      // return <Navigate to="/profile" component={<Profile/>}/>;
    }

    const initialValues = {
      username: "",
      password: ""
    };

    const validationSchema = Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!")
    });

    return (
      <div className="col-md-12 login-form">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this.handleLogin}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field name="username" type="text" className="form-control" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>
            </Form>
          </Formik>
        </div>

        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
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

export default connect(mapStateToProps)(Login);