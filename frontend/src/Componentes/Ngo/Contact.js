import React, {useState } from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
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
import "../../Css/style/home.css";
import Nav from "./Nav";
import Footer from "../User/Footer";
import ibg_1 from "../../images/bg_1.jpg";

const Contact = () => {

    
const mapContainerStyle = {
  top:"55px",
  height: "400px",
  width: "100%"
};


const center = {
  lat: 12.872114, 
  lng: 74.843407
};


  const [values, setValues] = useState({
    name:'',
    email:'',
    subject:'',
    message:'',
  });
  



const handleInput=(event)=>{
  setValues({
    ...values,
    [event.target.name]:event.target.value
  });
};
const handleSubmit=(event)=>{
  event.preventDefault();
  axios.post('http://localhost:8081/contact',values)
  .then((res)=>{
    if(res.data.status==='Success'){
      toast.success('Done');
    }
  })
}
  
  return (
    <>
      <ToastContainer />
      <Nav />
      <div
        className="hero-wrap"
        style={{ backgroundImage: `url(${ibg_1})` }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div
            className="row no-gutters slider-text align-items-center justify-content-center"
            data-scrollax-parent="true"
          >
            <div
              className="col-md-7 ftco-animate text-center"
              data-scrollax="properties: { translateY: '70%' }"
            >
              <h1
                className="mb-3 bread title"
                data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"
              >
                Contact Us
              </h1>
            </div>
          </div>
        </div>
      </div>

      <section className="ftco-section contact-section ftco-degree-bg">
        <div className="container">
          <div className="row d-flex mb-5 contact-info">
            <div className="col-md-12 mb-4">
              <h2 className="h4">Contact Information</h2>
            </div>
            <div className="w-100"></div>
            <div className="col-md-3">
              <p>
                <span>Address:</span> 198 West 21th Street, Suite 721 New York
                NY 10016
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <span>Phone:</span>{" "}
                <a href="tel://1234567920">+91 8762495484</a>
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <span>Email:</span>{" "}
                <a href="mailto:info@yoursite.com">info@yoursite.com</a>
              </p>
            </div>
            <div className="col-md-3">
              <p>
                <span>Website</span> <a href="#">yoursite.com</a>
              </p>
            </div>
          </div>
          <div className="row block-9">
            <div className="col-md-6 pr-md-5">
              <h4 className="mb-4">Do you have any questions?</h4>
              <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    name="name"
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                    name="email"
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    name="subject"
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id=""
                    cols="30"
                    rows="7"
                    className="form-control"
                    placeholder="Message"
                    onChange={handleInput}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-primary py-3 px-5"
                  />
                </div>
              </form>
            </div>

            <div className="col-md-6">
              <LoadScript
                googleMapsApiKey="AIzaSyCTgcG8ZV-Ix102AWSnYqEbm6eW3WytvDw" 
              >
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={15}
                >
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
