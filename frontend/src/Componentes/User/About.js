import React, { useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { toast, ToastContainer } from "react-toastify";
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
import Footer from "./Footer";
import ibg_3 from "../../images/bg_3.jpg";
import ibg_2 from "../../images/bg_2.jpg";

const About = () => {
  const [works, setWorks] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const storedAmount = localStorage.getItem("amount");
    if (storedAmount) {
      setAmount(parseInt(storedAmount, 10));
    }
  }, []);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/home/ngo/works`
        );
        setWorks(response.data);
      } catch (error) {
        console.error("Error fetching works:", error);
        toast.error("Error fetching works, please try again later.");
      }
    };

    fetchWorks();
  }, []);

  return (
    <>
      <Nav />
      <ToastContainer />
      <div
        className="hero-wrap"
        style={{ backgroundImage: `url(${ibg_2})` }}
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
                About Us
              </h1>
            </div>
          </div>
        </div>
      </div>

      <section className="ftco-section w-10">
        <div className="container">
          <div className="row d-flex">
            <div
              className="col-md-6 d-flex ftco-animate"
              style={{
                backgroundImage: `url(${ibg_3})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "330px",
              }}
            >
              <div className="img img-about align-self-stretch"></div>
            </div>
            <div className="col-md-6 pl-md-5 ftco-animate">
              <h2 className="mb-4">Welcome to Our NGO, Serving Since 1898</h2>
              <p>
                Our journey began over a century ago, with a simple mission: to
                bring hope and support to those in need. On that pivotal day, as
                we walked through the streets, we saw the true impact that
                compassion and care could have on the lives of others.
              </p>
              <p>
                Since then, we’ve been dedicated to transforming communities,
                reaching out to those most vulnerable, and making the world a
                better place one step at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="ftco-counter ftco-intro ftco-intro-2"
        id="section-counter"
      >
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
                  <h3 className="mb-4">Donate Money</h3>
                  <p>
                    Your support can make a significant difference in the lives
                    of those in need.
                  </p>
                  <p>
                    <a href="/Donate" className="btn btn-white px-3 py-2 mt-2">
                      Donate Now
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-3">
            <div className="col-md-7 heading-section ftco-animate text-center">
              <h2 className="mb-4">Latest Works</h2>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.
              </p>
            </div>
          </div>
          <div className="row">
            {works.length > 0 ? (
              works.map((work) => (
                <div className="col-md-4 mb-4" key={work.id}>
                  <div className="card shadow-sm">
                    <img
                      src={`http://localhost:8081/uploads/${work.proof}`}
                      className="card-img-top"
                      alt="Proof of Work"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{work.description}</h5>
                      <p className="card-text">
                        Total Expenses: ₹{work.expenses}
                      </p>
                      <p className="card-text">Submitted by: {work.ngoName}</p>
                      <p className="card-text text-muted">
                        <small>
                          {new Date(work.date).toLocaleDateString()}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No works submitted yet.</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
