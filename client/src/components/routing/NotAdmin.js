import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const NotAdmin = ({ user }) => {
  return (
    <div className="jumbotron container">
      <h1 className="display-4">Sorry!</h1>
      <p className="lead">This feature is only for an administrator.</p>
      <hr className="my-4"></hr>
      <p>Let's Sign in to get started.</p>
      <Link className="btn btn-primary btn-lg" to="/" role="button">
        Back to home
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(NotAdmin);
