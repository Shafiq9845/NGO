import React, { useState, useEffect } from "react";
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
import "../../Css/style/loginsignup.css";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Modal from "../Model";
import Footer from "../User/Footer";
import ic_2 from "../../images/cause-2.jpg";
import ic_3 from "../../images/cause-3.jpg";
import ic_4 from "../../images/cause-4.jpg";
import ic_5 from "../../images/cause-5.jpg";
import ic_6 from "../../images/cause-6.jpg";
import ie_2 from "../../images/event-2.jpg";
import { useAuth } from "../../context/authContext";

const Home = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [contacts, setContacts] = useState([]); 
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      login();
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/contacts");
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (contactId) => {
    try {
      await fetch(`http://localhost:8081/api/contacts/${contactId}`, {
        method: "DELETE",
      });
      setContacts(contacts.filter(contact => contact.id !== contactId)); 
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const openModal = (imageUrl) => {
    setCurrentImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentImage("");
  };

  return (
    <>
      <Nav />
      <div
        className="hero-wrap"
        style={{ backgroundImage: `url(${ie_2})` }}
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
              data-scrollax=" properties: { translateY: '70%' }"
            >
              <h1
                className="mb-4 title"
                data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"
              >
                Doing Nothing is Not An Option of Our Life
              </h1>
            </div>
          </div>
        </div>
      </div>

      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4 d-flex align-self-stretch ftco-animate">
              <div className="media block-6 d-flex services p-3 py-4 d-block">
                <div className="icon d-flex mb-3">
                  <span className="flaticon-donation-1"></span>
                </div>
                <div className="media-body pl-4">
                  <h3 className="heading">Make Donation</h3>
                  <p>
                    Even the all-powerful Pointing has no control about the
                    blind texts it is an almost unorthographic.
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
                  <h3 className="heading">Become A Volunteer</h3>
                  <p>
                    Even the all-powerful Pointing has no control about the
                    blind texts it is an almost unorthographic.
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
                    Even the all-powerful Pointing has no control about the
                    blind texts it is an almost unorthographic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section">
        <div className="container">
          <h2 className="mb-4">Contact Us List</h2>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <td>Sl.No</td>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact ,index) => (
                  <tr key={contact.id}>
                    <td>{index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.msg}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(contact.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
        </div>
      </section>
      <Modal
        isOpen={modalIsOpen}
        imageUrl={currentImage}
        onClose={closeModal}
      />
      <Footer />
    </>
  );
};

export default Home;
