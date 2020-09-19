import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div className="jumbotron container">
        <h1 className="display-4">Hello, world!</h1>
        <p className="lead">Thanks for coming to my store to check out some of the products.</p>
        <hr className="my-4"></hr>
        <p>Let's Sign in to get started.</p>
        <Link className="btn btn-primary btn-lg" to="/sign-in" role="button">
          Sign In
        </Link>
      </div>
    );
  }
}
