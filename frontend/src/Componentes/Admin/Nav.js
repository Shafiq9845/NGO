import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
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
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [ngoName, setNgoName] = useState('');

  const isActive = (pathname) => location.pathname === pathname ? 'active' : '';

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedNgoName = localStorage.getItem('ngoName');
  
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    axios.post('http://localhost:8081/logout')
      .then(() => {
        localStorage.removeItem('userId');
        navigate('/login');
        toast.success('Logged out successfully.');
      })
      .catch((err) => {
        console.error('Error during logout:', err);
        toast.error('Error logging out. Please try again later.');
      });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light top-0" id="ftco-navbar">
        <div className="container">
          <Link className="navbar-brand" to="/">Welfare</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="oi oi-menu"></span> Menu
          </button>

          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              <li className={`nav-item ${isActive('/Admin/home')}`}>
                <Link to='/Admin/home' className="nav-link">Home</Link>
              </li>
              <li className={`nav-item ${isActive('/Admin/doners')}`}>
                <Link to='/Admin/doners' className="nav-link">Doners</Link>
              </li>
              <li className={`nav-item ${isActive('/Admin/volunteer')}`}>
                <Link to="/Admin/volunteer" className="nav-link">Volunteer</Link>
              </li>
              <li className={`nav-item ${isActive('/Admin/nwork')}`}>
                <Link to="/Admin/nwork" className="nav-link">Work</Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className={`nav-link dropdown-toggle ${isActive('/Admin/Pending_Applications') || isActive('/Admin/Accepted_Applications') || isActive('/Admin/Rejected_Applications') || isActive('/Admin/Blocked_Applications')}`}
                  id="applicationDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Applications
                </Link>
                <ul className="dropdown-menu" aria-labelledby="applicationDropdown">
                  <li>
                    <Link to="/Admin/Pending_Applications" className={`dropdown-item ${isActive('/Admin/Pending_Applications')}`}>
                      Pending Applications
                    </Link>
                  </li>
                  <li>
                    <Link to="/Admin/Accepted_Applications" className={`dropdown-item ${isActive('/Admin/Accepted_Applications')}`}>
                      Accepted Applications
                    </Link>
                  </li>
                  <li>
                    <Link to="/Admin/Rejected_Applications" className={`dropdown-item ${isActive('/Admin/Rejected_Applications')}`}>
                      Rejected Applications
                    </Link>
                  </li>
                  <li>
                    <Link to="/Admin/Blocked_Applications" className={`dropdown-item ${isActive('/Admin/Blocked_Applications')}`}>
                      Blocked Applications
                    </Link>
                  </li>
                </ul>
              </li>
              <li className={`nav-item ${isActive('/Admin/Bank')}`}>
                <Link to="/Admin/Bank" className="nav-link">Bank</Link>
              </li>
              <li className={`nav-item ${isActive('')}`}>
                <Link to="" className="nav-link" onClick={handleLogout} title='Logout'>
                  <i className="bi bi-box-arrow-right"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </>
  );
};

export default Nav;
