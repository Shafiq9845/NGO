import React, { useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import Modal from "../Model";
import Footer from "./Footer";
import ibg_3 from "../../images/bg_3.jpg";
import ibg_4 from "../../images/bg_4.jpg";
import ibg_7 from "../../images/bg_7.jpg";
import ic_2 from "../../images/cause-2.jpg";
import ic_3 from "../../images/cause-3.jpg";
import ic_4 from "../../images/cause-4.jpg";
import ic_5 from "../../images/cause-5.jpg";
import ic_6 from "../../images/cause-6.jpg";
import i_1 from "../../images/image_1.jpg";
import i_2 from "../../images/image_2.jpg";
import i_3 from "../../images/image_3.jpg";
const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [amount, setamount] = useState();
  localStorage.setItem("amount", amount);

  const openModal = (imageUrl) => {
    setCurrentImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentImage("");
  };

  const [values, setValues] = useState({
    name: "",
    email: "",
    pNo: "",
    message: "",
    adr: "",
  });

  const handleInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    axios.post("http://localhost:8081/volunteer", values).then((res) => {
      if (res.data.status === "Success") {
        toast("Done");
      }
    });
  };

  useEffect(() => {
    const fetchamount = async () => {
      const response = await fetch("http://localhost:8081/count");
      const data = await response.json();
      setamount(data);
    };
    fetchamount();
  }, []);

  return (
    <>
      <ToastContainer />
      <Nav />
      <div
        class="hero-wrap"
        style={{ backgroundImage: `url(${ibg_7})` }}
        data-stellar-background-ratio="0.5"
      >
        <div class="overlay"></div>
        <div class="container">
          <div
            class="row no-gutters slider-text align-items-center justify-content-center"
            data-scrollax-parent="true"
          >
            <div
              class="col-md-7 ftco-animate text-center"
              data-scrollax=" properties: { translateY: '70%' }"
            >
              <h1
                class="mb-4 title"
                data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"
              >
                Doing Nothing is Not an Option in Our Lives
              </h1>
            </div>
          </div>
        </div>
      </div>

      <section className="ftco-counter ftco-intro" id="section-counter">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-5 d-flex justify-content-center counter-wrap ftco-animate">
              <div className="block-18 color-1 align-items-stretch">
                <div className="text">
                  <span>Total Funds Raised</span>
                  <strong className="number">
                    <CountUp
                      style={{ fontSize: "55px", fontWeight: "bold" }}
                      start={0}
                      end={amount}
                      duration={3}
                      separator=","
                      prefix="₹"
                    />
                  </strong>
                  <span>
                    to support children across 190 countries worldwide
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md d-flex justify-content-center counter-wrap ftco-animate">
              <div className="block-18 color-2 align-items-stretch">
                <div className="text">
                  <h3 className="mb-4">Support Our Cause</h3>
                  <p>
                    Your donation helps us provide critical resources to
                    children in need. Together, we can make a difference.
                  </p>
                  <p>
                    <a href="/Donate" className="btn btn-white px-3 py-2 mt-8">
                      Donate Now
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md d-flex justify-content-center counter-wrap ftco-animate">
              <div className="block-18 color-3 align-items-stretch">
                <div className="text">
                  <h3 className="mb-4">Join as a Volunteer</h3>
                  <p>
                    Become part of our global network of volunteers. Your time
                    and effort can change the lives of many, one step at a time.
                  </p>
                  <p>
                    <a
                      href="#volunteer"
                      className="btn btn-white px-3 py-2 mt-2"
                    >
                      Be A Volunteer
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4 d-flex align-self-stretch ftco-animate">
              <div className="media block-6 d-flex services p-3 py-4 d-block">
                <div className="icon d-flex mb-3">
                  <span className="flaticon-donation-1"></span>
                </div>
                <div className="media-body pl-4">
                  <h3 className="heading">Make a Donation</h3>
                  <p>
                    Your generous donation can provide essential resources and
                    support to those in need, creating a lasting impact in their
                    lives.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 d-flex align-self-stretch ftco-animate">
              <div className="media block-6 d-flex services p-3 py-4 d-block">
                <div className="icon d-flex mb-3">
                  <span className="flaticon-charity"></span>
                </div>
                <div className="media-body pl-4">
                  <h3 className="heading">Become a Volunteer</h3>
                  <p>
                    Join our team of dedicated volunteers and make a meaningful
                    difference by contributing your time and skills to help
                    those in need.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 d-flex align-self-stretch ftco-animate">
              <div className="media block-6 d-flex services p-3 py-4 d-block">
                <div className="icon d-flex mb-3">
                  <span className="flaticon-donation"></span>
                </div>
                <div className="media-body pl-4">
                  <h3 className="heading">Sponsorship</h3>
                  <p>
                    Partner with us to sponsor key programs that help transform
                    communities, providing opportunities for education,
                    healthcare, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-gallery" id="glr">
        <div className="d-md-flex">
          <a
            href="#glr"
            className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate"
            style={{ backgroundImage: `url(${ic_2})` }}
            onClick={() => openModal(ic_2)}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search"></span>
            </div>
          </a>
          <a
            href="#glr"
            className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate"
            style={{ backgroundImage: `url(${ic_3})` }}
            onClick={() => openModal(ic_3)}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search"></span>
            </div>
          </a>
          <a
            href="#glr"
            className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate"
            style={{ backgroundImage: `url(${ic_4})` }}
            onClick={() => openModal(ic_4)}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search"></span>
            </div>
          </a>
          <a
            href="#glr"
            className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate"
            style={{ backgroundImage: `url(${ic_5})` }}
            onClick={() => openModal(ic_5)}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search"></span>
            </div>
          </a>
        </div>
        <div className="d-md-flex">
          <a
            href="#glr"
            className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate"
            style={{ backgroundImage: `url(${ic_6})` }}
            onClick={() => openModal(ic_6)}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search"></span>
            </div>
          </a>
          <a
            href="#glr"
            className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate"
            style={{ backgroundImage: `url(${i_1})` }}
            onClick={() => openModal(i_1)}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search"></span>
            </div>
          </a>
          <a
            href="#glr"
            className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate"
            style={{ backgroundImage: `url(${i_2})` }}
            onClick={() => openModal(i_2)}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search"></span>
            </div>
          </a>
          <a
            href="#glr"
            className="gallery image-popup d-flex justify-content-center align-items-center img ftco-animate"
            style={{ backgroundImage: `url(${i_3})` }}
            onClick={() => openModal(i_3)}
          >
            <div className="icon d-flex justify-content-center align-items-center">
              <span className="icon-search"></span>
            </div>
          </a>
        </div>
      </section>

      <section
        class="ftco-section-3 img"
        style={{ backgroundImage: `url(${ibg_3})` }}
        id="volunteer"
      >
        <div class="overlay"></div>
        <div class="container">
          <div class="row d-md-flex">
            <div class="col-md-6 d-flex ftco-animate">
              <div
                class="img img-2 align-self-stretch"
                style={{ backgroundImage: `url(${ibg_4})` }}
              ></div>
            </div>
            <div class="col-md-6 volunteer pl-md-5 ftco-animate">
              <h3 class="mb-3">Be a volunteer</h3>
              <form action="" class="volunter-form" onSubmit={handleSubmit}>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Your Name"
                    name="name"
                    onChange={handleInput}
                    required
                  />
                </div>
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Your Email"
                    name="email"
                    onChange={handleInput}
                    required
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Your Mobile Number"
                    name="pNo"
                    onChange={handleInput}
                    required
                  />
                </div>
                <div class="form-group">
                  <textarea
                    name="message"
                    cols="30"
                    rows="3"
                    class="form-control"
                    placeholder="Message"
                    onChange={handleInput}
                    required
                  ></textarea>
                </div>
                <div class="form-group">
                  <textarea
                    name="adr"
                    cols="30"
                    rows="3"
                    class="form-control"
                    placeholder="Address"
                    onChange={handleInput}
                    required
                  ></textarea>
                </div>
                <div class="form-group">
                  <input type="submit" class="btn btn-white py-3 px-5" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Modal
        isOpen={modalIsOpen}
        imageUrl={currentImage}
        onClose={closeModal}
      />
    </>
  );
};

export default Home;
