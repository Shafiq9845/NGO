import React from "react";
import { Link, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Css/open-iconic-bootstrap.min.css';
import '../../Css/animate.css';
import '../../Css/owl.carousel.min.css';
import '../../Css/owl.theme.default.min.css';
import '../../Css/magnific-popup.css';
import '../../Css/aos.css';
import '../../Css/ionicons.min.css';
import '../../Css/bootstrap-datepicker.css';
import '../../Css/jquery.timepicker.css';
import '../../Css/flaticon.css';
import '../../Css/icomoon.css';
import '../../Css/style.css';

const Nav = () => {
  const location = useLocation();

  const isActive = (pathname) => {
    return location.pathname === pathname ? 'active' : '';
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
        id="ftco-navbar"
      >
        <div className="container">
          <Link className="navbar-brand" to="/">Welfare</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="oi oi-menu"></span> Menu
          </button>

          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              <li className={`nav-item ${isActive('/')}`}>
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className={`nav-item ${isActive('/About')}`}>
                <Link to='/About' className="nav-link">About</Link>
              </li>
              <li className={`nav-item ${isActive('/donate')}`}>
                <Link to="/donate" className="nav-link">Donate</Link>
              </li>
              <li className={`nav-item ${isActive('/contact')}`}>
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
              <li className={`nav-item ${isActive('/login')}`}>
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className={`nav-item ${isActive('/signup')}`}>
                <Link to="/signup" className="nav-link">SignUp</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
