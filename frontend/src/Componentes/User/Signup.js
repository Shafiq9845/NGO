import Nav from './Nav';
import Footer from './Footer';
import React, { useState, useEffect, useRef } from 'react';
import signupValidation from '../../Script/signupValidation';
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
import { Link } from 'react-router-dom';

const Signup = () => {
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      flipIn(formRef.current);
    }
  }, []);

  const [values, setValues] = useState({
    ngoName: '',
    ngoType: '',
    ngoRegistrationNumber: '',
    ngoAddress: '',
    city:'',
    pincode:'',
    email: '',
    password: '',
    number: '',
    contactPerson: '',
    contactPersonPhone: '',
    pImaage: null,
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (event) => {
    const { name, value, files } = event.target;

    if (name === 'pImage' && files.length > 0) {
      setValues({
        ...values,
        pImage: files[0]  
      });
    } else {
      setValues({
        ...values,
        [name]: value
      });
    }
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    const err = signupValidation(values);
    setErrors(err);

    if (!err.name && !err.email && !err.password && !err.number && !err.ngoName && !err.ngoAddress && !err.ngoType && !err.ngoRegistrationNumber && !err.contactPerson && !err.contactPersonPhone ) {
      
      const formData = new FormData();

      formData.append('ngoName', values.ngoName);
      formData.append('ngoType', values.ngoType);
      formData.append('ngoRegistrationNumber', values.ngoRegistrationNumber);
      formData.append('ngoAddress', values.ngoAddress);
      formData.append('city', values.city);
      formData.append('pincode', values.pincode);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('number', values.number);
      formData.append('contactPerson', values.contactPerson);
      formData.append('contactPersonPhone', values.contactPersonPhone);

      if (values.pImage) {
        formData.append('pImage', values.pImage);
      }

      axios.post('http://localhost:8081/signup', formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 'fail') {
            toast.error('User Already Exists...!')
          } else {
            toast.success('Registration successful! Please login.');
          }
        })
        .catch((err) => console.log(err));
    }
  };



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Nav />
      <ToastContainer />
      <div className='container-fluid d-flex justify-content-center align-items-center vh-100 cont'>
        <div ref={formRef} className='form p-4 rounded-lg shadow col-lg-6 col-md-8 col-sm-10 col-12'>
          <h2 className='title text-center mb-4'>NGO SIGNUP</h2>
          <form className='grid-form' onSubmit={handleSubmit}>
          <div>
          <div className='mb-3  wrap-input-1 grid-item'>
              <label htmlFor='ngoName'><strong>NGO Name</strong></label>
              <input
                type='text'
                name='ngoName'
                id='ngoName'
                placeholder='Enter NGO Name'
                className='input form-control rounded-0'
                onChange={handleInput}
              />
              <span className='focus-border'></span>
            </div>
              {errors.ngoName && <span className='text-danger'>{errors.ngoName}</span>}
            </div>
            <div>
            <div className='mb-3  wrap-input-1 grid-item'>
              <label htmlFor='ngoType'><strong>NGO Type</strong></label>
              <input
                type='text'
                name='ngoType'
                id='ngoType'
                placeholder='Enter NGO Type'
                className='input form-control rounded-0'
                onChange={handleInput}
              />
              <span className='focus-border'></span>
            </div>
              {errors.ngoType && <span className='text-danger'>{errors.ngoType}</span>}
            </div>
            <div>
            <div className='mb-3  wrap-input-1 grid-item'>
              <label htmlFor='ngoRegistrationNumber'><strong>NGO Registration Number</strong></label>
              <input
                type='text'
                name='ngoRegistrationNumber'
                id='ngoRegistrationNumber'
                placeholder='Enter NGO Registration Number'
                className='input form-control rounded-0'
                onChange={handleInput}
              />
              <span className='focus-border'></span>
            </div>
              {errors.ngoRegistrationNumber && <span className='text-danger'>{errors.ngoRegistrationNumber}</span>}
            </div>
            <div>
            <div className='mb-3  wrap-input-1 grid-item'>
              <label htmlFor='ngoAddress'><strong>NGO Address</strong></label>
              <input
                type='text'
                name='ngoAddress'
                id='ngoAddress'
                placeholder='Enter NGO Address'
                className='input form-control rounded-0'
                onChange={handleInput}
              />
              <span className='focus-border'></span>
            </div>
              {errors.ngoAddress && <span className='text-danger'>{errors.ngoAddress}</span>}
            </div>
            <div>
            <div className='mb-3  wrap-input-1 grid-item'>
              <label htmlFor='ngoAddress'><strong>City</strong></label>
              <input
                type='text'
                name='city'
                id='city'
                placeholder='Enter City Name'
                className='input form-control rounded-0'
                onChange={handleInput}
              />
              <span className='focus-border'></span>
            </div>
              {errors.ngoAddress && <span className='text-danger'>{errors.ngoAddress}</span>}
            </div>
            <div>
            <div className='mb-3  wrap-input-1 grid-item'>
              <label htmlFor='ngoAddress'><strong>Pincode</strong></label>
              <input
                type='number'
                name='pincode'
                id='pincode'
                placeholder='Enter Pincode'
                className='input form-control rounded-0'
                onChange={handleInput}
              />
              <span className='focus-border'></span>
            </div>
              {errors.ngoAddress && <span className='text-danger'>{errors.ngoAddress}</span>}
            </div>
            <div>
            <div className='mb-3 wrap-input-1 grid-item'>
              <label htmlFor='email'><strong>Email</strong></label>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Enter Email'
                className='input form-control rounded-0'
                onChange={handleInput}
              />
              <span className='focus-border'></span>
            </div>
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div>
            <div className='mb-3 wrap-input-1 grid-item'>
              <label htmlFor='password'><strong>Password</strong></label>
              <div className='position-relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  id='password'
                  placeholder='Enter Password'
                  className='form-control input rounded-0 pr-5'
                  onChange={handleInput}
                />
                <button
                  className='btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y rounded-0 psw-btn'
                  type='button'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <i className='bi bi-eye-fill'></i> : <i className='bi bi-eye-slash'></i>}
                </button>
              <span className='focus-border'></span>
              </div>
            </div>
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <div>
            <div className='mb-3 wrap-input-1  grid-item'>
              <label htmlFor='number'><strong>Phone number</strong></label>
              <input
                type='number'
                name='number'
                id='number'
                placeholder='9874563210'
                className='input form-control rounded-0'
                onChange={handleInput}
              />
              <span className='focus-border'></span>
            </div>
              {errors.number && <span className='text-danger'>{errors.number}</span>}
            </div>
            <div>
            <div className='mb-3 wrap-input-1 grid-item'>
              <label htmlFor='contactPerson'><strong>Contact Person</strong></label>
              <input
                type='text'
                name='contactPerson'
                id='contactPerson'
                placeholder='Enter Contact Person Name'
                className='input form-control rounded-0'
                onChange={handleInput}
              />
              <span className='focus-border'></span>
            </div>
              {errors.contactPerson && <span className='text-danger'>{errors.contactPerson}</span>}
            </div>
            <div>
            <div className='mb-3 wrap-input-1 grid-item'>
              <label htmlFor='contactPersonPhone'><strong>Contact Person Phone</strong></label>
              <input
                type='number'
                name='contactPersonPhone'
                id='contactPersonPhone'
                placeholder='Enter Contact Person Phone'
                className='input form-control rounded-0'
                onChange={handleInput}
              />
              <span className='focus-border'></span>
            </div>
              {errors.contactPersonPhone && <span className='text-danger'>{errors.contactPersonPhone}</span>}
            </div>
            <div>
            <div className='mb-3 wrap-input-1 grid-item'>
              <label htmlFor='pImage'><strong>NGO Profile Image</strong></label>
              <input
                type='file'
                name='pImage'
                id='pImage'
                placeholder='Slect image for profile'
                className='input form-control rounded-0'
                onChange={handleInput}
                required
              />
              <span className='focus-border'></span>
            </div>
              {errors.pImage && <span className='text-danger'>{errors.pImage}</span>}
            </div>
            <button type='submit' className='btn-39 w-100 rounded-0 rounded-pill mt-3 submit-button'>
              <strong>
                <span className='new'>SignUp</span>
                <span className='old'>SignUp</span>
              </strong>
            </button>
            <p className='text-center mt-2 terms'>You are agreeing to our terms and policies</p>
            <Link
              to='/Login'
              className='btn btn-default border w-100 bg-light rounded-pill text-decoration-none mt-2 login-link'
            >
              Login
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
