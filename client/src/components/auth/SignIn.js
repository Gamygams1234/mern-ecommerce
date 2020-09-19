import React, { useState } from "react";
import { Link } from "react-router-dom";
const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="container pt-4">
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

export default SignIn;
