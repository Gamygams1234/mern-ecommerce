import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
          <div className="container">
            <a className="navbar-brand order-1 mr-0" href="https://gamalielburgos.com/" target="_blank">
              Presented by Gamaliel Burgos
            </a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-item nav-link" href="#home">
                  Home <span className="sr-only">(current)</span>
                </a>
                <a className="nav-item nav-link" href="#about">
                  About
                </a>
                <a className="nav-item nav-link" href="#speakers">
                  Speakers
                </a>
                <a className="nav-item nav-link" href="#schedule">
                  Schedule
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
