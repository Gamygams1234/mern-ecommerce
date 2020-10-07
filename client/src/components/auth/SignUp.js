import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup, resetMessages } from "../../actions/auth";
import PropTypes from "prop-types";

const SignUp = ({ isAuthenticated, signup, error, resetMessages }) => {
  const emailTest = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    password2: "",
    pageError: "",
  });
  useEffect(() => {
    resetMessages();
  }, []);
  const { email, password, name, password2, pageError } = formData;

  const onChange = (e) => setFormData({ ...formData, error: false, [e.target.name]: e.target.value });
  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );
  const showPageError = () => (
    <div className="alert alert-danger" style={{ display: pageError ? "" : "none" }}>
      {pageError}
    </div>
  );
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      resetMessages();
      setFormData({ ...formData, pageError: "Passwords do not match!" });
      window.scrollTo(0, 0);
    } else if (!emailTest.test(email)) {
      resetMessages();
      setFormData({ ...formData, pageError: "Email is not in correct format!" });
    } else {
      window.scrollTo(0, 0);
      signup({ name, email, password });
    }
  };

  if (isAuthenticated === true) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container pt-4 pb-4">
      <h2>Sign Up</h2>
      {showError()}
      {showPageError()}
      <form className="pt-4" onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="name" className="form-control" value={name} onChange={(e) => onChange(e)} id="usernameSubmit"></input>
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" name="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => onChange(e)} aria-describedby="emailHelp"></input>
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" className="form-control" value={password} onChange={(e) => onChange(e)} id="exampleInputPassword1"></input>
        </div>

        <div className="form-group">
          <label>ReType your password</label>
          <input type="password" name="password2" className="form-control" value={password2} onChange={(e) => onChange(e)}></input>
        </div>
        <div className="pb-4">
          <small>
            Already have an account? <Link to="/sign-in">Click here</Link> to sign in.
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

SignUp.propType = {
  signup: PropTypes.func.isRequired,
  resetMessages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
});

export default connect(mapStateToProps, { signup, resetMessages })(SignUp);
