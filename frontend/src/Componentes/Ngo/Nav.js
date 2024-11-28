import React, { useState ,useEffect} from 'react';
import { Link, useLocation,useNavigate } from "react-router-dom";
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
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Nav = () => {
  const location = useLocation();

  const isActive = (pathname) => {
    return location.pathname === pathname ? 'active' : '';
  };

  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [ngoName, setNgoName] = useState('');
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedNgoName = localStorage.getItem('ngoName');
  
    if (storedUserId && storedNgoName) {
      setUserId(storedUserId);
      setNgoName(storedNgoName);

      
    } else {
      navigate('/login');
    }
  }, []);


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
      <nav
        className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
        id="ftco-navbar"
      >
        <div className="container">
          <Link className="navbar-brand" to="/Ngo/home">{ngoName}</Link>
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
              <li className={`nav-item ${isActive('/Ngo/home/')}`}>
                <Link to="/Ngo/home" className="nav-link">Home</Link>
              </li>
              <li className={`nav-item ${isActive('/Ngo/contact')}`}>
                <Link to="/Ngo/contact" className="nav-link">Contact</Link>
              </li>
              <li className={`nav-item ${isActive('/Ngo/gallery')}`}>
                <Link to="/Ngo/gallery" className="nav-link">Gallery</Link>
              </li>
              <li className={`nav-item ${isActive('/Ngo/work')}`}>
                <Link to="/Ngo/work" className="nav-link">Work</Link>
              </li>
              <li className={`nav-item ${isActive('/Ngo/bank')}`}>
                <Link to="/Ngo/bank" className="nav-link">Add Bank</Link>
              </li>
              <li className={`nav-item ${isActive('/Ngo/wallet')}`}>
              <Link to="/Ngo/wallet" className="nav-link"><i className="bi bi-wallet2"></i> Wallet</Link>
            </li>
            <li className={`nav-item ${isActive('/Ngo/profile')}`}>
                <Link to="/Ngo/profile" className="nav-link">Profile</Link>
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
