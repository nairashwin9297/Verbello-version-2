import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { handleLogout } from "../../../utils/loginStatus";
//import verbelloLogo from "../../../assets/images/verbello-logo.jpeg";

const Navbar = (props) => {
  const [togglerColor, setTogglerColor] = useState("#ffffff");
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleToggleClick = () => {
    const newColor = togglerColor === "#ffffff" ? "#00ff00" : "#ffffff";
    setTogglerColor(newColor);
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <nav className="navbar sticky-top navbar-expand-md navbar-bgcolor p-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-logo">
          <span className="logo-txt">Verbello</span>
          {/* <img src={verbelloLogo} className="img-fluid logo" alt="Verbello" /> */}
        </Link>

        <button
          className={`navbar-toggler custom-toggler ${
            isNavCollapsed ? "" : "collapsed"
          }`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          style={{ borderColor: "#333" }}
          onClick={handleToggleClick}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse justify-content-end ${
            isNavCollapsed ? "" : "show"
          } order-md-last`}
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/contactus" className="nav-link text-white">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/aboutus" className="nav-link text-white">
                About Us
              </Link>
            </li>
          </ul>

          {props.userFullName ? (
            <>
              <div class="dropdown">
                <button
                  class="btn btn-light dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {props.userFullName}
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#" onClick={handleLogout}>
                      Log Out
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="login">
                <button
                  type="button"
                  className="btn btn-outline-light mx-1 mt-0"
                >
                  Login
                </button>
              </Link>

              <Link to="/signup" className="signup">
                <button type="button" className="btn btn-light mx-1 mt-0">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
