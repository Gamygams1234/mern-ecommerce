import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";

const Header = ({ isAuthenticated, logout }) => {
  const authLinks = (
    <div className="navbar-nav">
      <NavLink className="nav-item nav-link" to="/">
        Home <span className="sr-only"></span>
      </NavLink>

      <a className="nav-item nav-link" onClick={logout} href="#!">
        <i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
      </a>

      <NavLink className="nav-item nav-link" to="/dashboard">
        Dashboad
      </NavLink>
    </div>
  );

  const guestLinks = (
    <div className="navbar-nav">
      <NavLink className="nav-item nav-link" to="/">
        Home <span className="sr-only"></span>
      </NavLink>
      <NavLink className="nav-item nav-link" to="/sign-in">
        Sign In
      </NavLink>
      <NavLink className="nav-item nav-link" to="/sign-up">
        Sign Up
      </NavLink>
      <NavLink className="nav-item nav-link" to="/dashboard">
        Dashboad
      </NavLink>
    </div>
  );

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
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Header);
