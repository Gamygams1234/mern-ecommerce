import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, resetMessages } from "../../actions/auth";

const SignIn = ({ isAuthenticated, login, error, resetMessages }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  // making sure we have no messages to start
  useEffect(() => {
    resetMessages();
  }, []);
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated === true) {
    return <Redirect to="/" />;
  }
  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  return (
    <div className="container pt-4 mb-5">
      {showError()}
      <h2>Sign In</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" name="email" value={email} onChange={(e) => onChange(e)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={(e) => onChange(e)} className="form-control" id="exampleInputPassword1"></input>
        </div>
        <div className="pb-4">
          <small>
            Don't have an account? <Link to="/sign-up">Click here</Link> to sign up!
          </small>
        </div>
        <button type="submit" className="btn btn-primary ">
          Submit
        </button>
      </form>
    </div>
  );
};

SignIn.propType = {
  login: PropTypes.func.isRequired,
  resetMessages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
});

export default connect(mapStateToProps, { login, resetMessages })(SignIn);
