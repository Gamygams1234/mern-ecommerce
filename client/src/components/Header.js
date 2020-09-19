import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container">
          <Link className="navbar-brand order-1 mr-0" to="https://gamalielburgos.com/" target="_blank">
            Presented by Gamaliel Burgos
          </Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-item nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </NavLink>
              <NavLink className="nav-item nav-link" to="/sign-in">
                Sign In
              </NavLink>
              <NavLink className="nav-item nav-link" to="/sign-up">
                Sign Up
              </NavLink>
              <NavLink className="nav-item nav-link" to="#schedule">
                Schedule
              </NavLink>
            </div>
          </div>
          {/*navbar collapse */}
        </div>
      </nav>
    );
  }
}
