import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../actions/auth";
import PropTypes from "prop-types";

const SignUp = ({ isAuthenticated, signup }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    error: "",
  });

  const { email, password, name } = formData;

  const onChange = (e) => setFormData({ ...formData, error: false, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password });
  };

  if (isAuthenticated === true) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container pt-4">
      <h2>Sign Up</h2>
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
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(SignUp);
