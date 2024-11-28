import Nav from './Nav';
import Footer from './Footer';
import validation from '../../Script/LoginValidation';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { flipIn } from '../../Animation/loginAnime';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Css/open-iconic-bootstrap.min.css";
import "../../Css/animate.css";
import "../../Css/owl.carousel.min.css";
import "../../Css/owl.theme.default.min.css";
import "../../Css/magnific-popup.css";
import "../../Css/aos.css";
import "../../Css/ionicons.min.css";
import "../../Css/bootstrap-datepicker.css";
import "../../Css/jquery.timepicker.css";
import "../../Css/flaticon.css";
import "../../Css/icomoon.css";
import "../../Css/style.css";
import "../../Css/style/loginsignup.css";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Login = () => {
  const { login } = useAuth();
  const formRef = useRef(null);
  
  useEffect(() => {
    if (formRef.current) {
      flipIn(formRef.current);
    }
  }, []);
  
  const [userId, setUserId] = useState('');
  const [ngoName, setNgoName] = useState('');
  
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

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
  
 

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  
  const handleInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const err = validation(values);
    setErrors(err);
    if (err.email === '' && err.password === '') {
      axios
        .post('http://localhost:8081/login', values)
        .then((res) => {
          if (res.data.status === 'success') {
            setUserId(res.data.userId);
            localStorage.setItem('userId', res.data.userId);
            setNgoName(res.data.ngoName);
            localStorage.setItem('ngoName', res.data.ngoName);

            if (res.data.role === 'admin') {
              login();
              navigate('/Admin/home');
            } else {
              login();
              if (res.data.st === 'pending') {
                navigate('/pending');
              } else if (res.data.st === 'accepted') {
                navigate(`/Ngo/home`);
              } else if (res.data.st === 'blocked') {
                navigate('/blocked');
              } else if (res.data.st === 'rejected') {
                navigate('/reject');
              }
            }
          } else {
            console.log('Login failed:', res.data.message);
            toast.error('Login failed. Please check your credentials.');
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error('Error logging in. Please try again later.');
        });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Nav />
      <ToastContainer />
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div ref={formRef} className="form p-4 rounded-lg shadow col-lg-4 col-md-6 col-sm-8 col-10">
          <h2 className="title">LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 wrap-input-1">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email.."
                className="input form-control rounded-0"
                onChange={handleInput}
              />
              <span className="focus-border"></span>
            </div>
            {errors.email && <span className="text-danger">{errors.email}</span>}
            <div className="mb-3 wrap-input-1">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  className="form-control input rounded-0 pr-5"
                  onChange={handleInput}
                />
                <button
                  className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y rounded-0 psw-btn"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash"></i>}
                </button>
                <span className="focus-border"></span>
              </div>
              {errors.password && <span className="text-danger">{errors.password}</span>}
            </div>

            <button type="submit" className="btn-39 w-100 rounded-0 rounded-pill">
              <strong>
                <span className="new">Login</span>
                <span className="old">Login</span>
              </strong>
            </button>
            <Link
              to="/forgot-password"
              className="text-decoration-none text-secondary"
              >
              Forgot Password?
            </Link>
            <Link
              to="/Signup"
              className="btn btn-default border w-100 bg-white rounded-pill text-decoration-none hover-overlay"
            >
              Create Account
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
