import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Dashboard = ({ user }) => {
  return (
    <div className="jumbotron container">
      <h1 className="display-4">This is the Dashboard</h1>
      <p className="lead">Thanks for coming to my store to check out some of the products.</p>
      <hr className="my-4"></hr>
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{user.name}</li>
          <li className="list-group-item">{user.email}</li>
          <li className="list-group-item">{user.role === 1 ? "Admin" : "Registered User"}</li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(Dashboard);
