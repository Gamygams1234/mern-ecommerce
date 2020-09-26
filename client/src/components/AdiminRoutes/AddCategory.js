import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AddCategory = ({ user, token }) => {
  const [name, setName] = useState("");
  const [clientError, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    setName(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    setError("");
    let category = {
      name: name,
    };
    category = JSON.stringify(category);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`/api/category/create/${user._id}`, category, config)
      .then((res) => {
        setSuccess(name);
      })
      .catch((err) => {
        console.log(err);
        clientError = "There is an error with request.";
      });
  };

  const showError = () => (
    <div className="alert alert-danger" style={{ display: clientError ? "" : "none" }}>
      {clientError}
    </div>
  );

  const showSuccess = () => (
    <div className="alert alert-success" style={{ display: success ? "" : "none" }}>
      The new category, {success}, has been added.
    </div>
  );

  return (
    <div className="container mt-5">
      <div className="">
        <h1 className="display-4">Create Category</h1>
        <p className="lead">Add a category in the form below</p>
      </div>
      <hr className="my-4"></hr>
      {showSuccess()}
      {showError()}

      <form onSubmit={submit}>
        <div className="form-group">
          <label className="text-muted">Category Name</label>
          <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required />
        </div>
        <button className="btn btn-outline-primary">Create Category</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  token: state.auth.token,
});

export default connect(mapStateToProps)(AddCategory);
