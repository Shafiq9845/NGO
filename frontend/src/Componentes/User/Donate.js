import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
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
import Footer from "./Footer";
import ibg_3 from "../../images/bg_3.jpg";
import ibg_2 from "../../images/bg_2.jpg";
import ibg_4 from "../../images/bg_4.jpg";
import { Link } from "react-router-dom";

const Donate = () => {
  const itemsPerPage = 3;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [bankDetails, setBankDetails] = useState(null);
  const [flipped, setFlipped] = useState({});
  const [errors, setErrors] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleFlip = (id) => {
    setFlipped((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!donorDetails.dname) {
      formErrors.dname = "Name is required";
    }

    if (!donorDetails.demail || !emailPattern.test(donorDetails.demail)) {
      formErrors.demail = "A valid email is required";
    }

    if (!donorDetails.dphone || donorDetails.dphone.length < 10) {
      formErrors.dphone = "Phone number must be at least 10 digits";
    }

    if (!donorDetails.damount || donorDetails.damount <= 0) {
      formErrors.damount = "Amount should be greater than zero";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const [donorDetails, setDonorDetails] = useState({
    dname: "",
    demail: "",
    dphone: "",
    damount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonorDetails({
      ...donorDetails,
      [name]: value,
    });
  };

  const handleImageClick = (url) => {
    setSelectedImage(url); 
  };

  const closeZoomModal = () => {
    setSelectedImage(null); 
  };

  const [values, setValues] = useState({
    name: "",
    email: "",
    pNo:"",
    message: "",
    adrr:"",
  });

  const handleInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8081/volunteer", values).then((res) => {
      if (res.data.status === "Success") {
        toast.success("Volunteer registration successful");
      }
    });
  };

  const handleDonation = (event) => {    
    event.preventDefault();
    if (validateForm()) {
      const ngoId = selectedApplication;
      console.log(ngoId);
      axios
        .post(`http://localhost:8081/donation/${ngoId}`, donorDetails)
        .then((res) => {
          if (res.data.status === "Success") {
            toast.success("Thank You For Your Help");
            setDonorDetails({
              dname: "",
              demail: "",
              dphone: "",
              damount: "",
            }); 
            handleCloseModal();
          }
        });
    } else {
      toast.error("Form Validation Failed");
    }
  };

  const handleGalleryClick = (id) => {

    axios.get(`http://localhost:8081/api/ngo/images/${id}`)
      .then((res) => {
        setGalleryImages(res.data); 
        setShowGallery(true); 
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        const errorMessage = error.response && error.response.data ? error.response.data : "Failed to load gallery"; 
        toast.error(errorMessage); 
      })
    
  };
  


  useEffect(() => {
    const fetchNGOs = async () => {
        const response = await fetch('http://localhost:8081/api/ngo/accept');
        const data = await response.json();
        setApplications(data);
    };

    fetchNGOs();
}, []);



  useEffect(() => {
    if (selectedApplication) {
      const fetchBankDetails = async (userId) => {
        try {
          const response = await axios.get(
            `http://localhost:8081/api/bank/details/${userId}`
          );
          setBankDetails(response.data);
        } catch (error) {
          console.error("Error fetching bank details:", error);
          toast.error("Failed to fetch bank details");
        }
      };

      fetchBankDetails(selectedApplication);
    }
  }, [selectedApplication]);

  const filteredApplications = applications.filter(
    (application) =>
      application.Name &&
      application.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentApplications = filteredApplications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDonateClick = (id) => {
    setSelectedApplication(id);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
    setBankDetails(null);
  };
  return (
    <>
      <ToastContainer />
      <Nav />
      <div
        className="hero-wrap"
        style={{ backgroundImage: `url(${ibg_2})` }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center">
            <div className="col-md-7 ftco-animate text-center">
              <h1 className="mb-3 bread title">Donations</h1>
            </div>
          </div>
        </div>
      </div>

      <section className="ftco-section bg-light" id="container">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12">
              <div className="search-bar mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            {currentApplications.length === 0 ? (
              <p>No NGOs found</p>
            ) : (
              currentApplications.map((application) => (
                <div
                  key={application.id}
                  className={`col-lg-4 d-flex mb-sm-4 ftco-animate flip-card 
                  ${flipped[application.id] ? "flipped" : ""}`}
                >
                  
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <div style={{position:"relative", width:"100%", backgroundColor:"#00000024", color:"black", textTransform: "uppercase", fontFamily:"Cursive", fontWeight:"bolder"}}>{application.Name}</div>
                      <div
                        className="img br-0"
                        style={{
                          backgroundImage: `url(http://localhost:8081/uploads/${application.pImage})`,
                          height: "250px",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <div className="info ml-4 p-3">
                        <h3>{application.name}</h3>
                        <button
                          type="button"
                          className="btn btn-white px-3 py-2 mt-2 mr-1 w-100"
                          onClick={() => handleGalleryClick(application.id)}
                        >
                          Gallery
                        </button>
                        <Link
                          to={""}
                          className="btn btn-white px-3 py-2 mt-2 mr-1 w-100"
                          onClick={() => handleDonateClick(application.id)}
                        >
                          Donate
                        </Link>
                        <button
                          type="button"
                          className="btn btn-white px-3 py-2 mt-2 mr-1 w-100"
                          onClick={() => toggleFlip(application.id)}
                        >
                          Info
                        </button>
                      </div>
                    </div>

                    <div className="flip-card-back">
                      <div className="position">
                        <strong>Name:</strong> {application.Name}
                      </div>
                      <div className="position">
                        <strong>Email:</strong> {application.email}
                      </div>
                      <div className="position">
                        <strong>Reg No:</strong> {application.ngo_reg_no}
                      </div>
                      <div className="position">
                        <strong>Phone:</strong> {application.p_no}
                      </div>
                      <div className="position">
                        <strong>Mobile:</strong> {application.c_p_no}
                      </div>
                      <div className="position">
                        <strong>Address:</strong> {application.address}
                      </div>
                      <div className="position">
                        <strong>City:</strong> {application.city}
                      </div>
                      <div className="position">
                        <strong>Pincode:</strong> {application.pincode}
                      </div>
                      <div className="position">
                        <strong>Type:</strong> {application.type}
                      </div>
                      <button
                        type="button"
                        className="btn btn-white px-3 py-2 mt-2 mr-1 w-100"
                        onClick={() => toggleFlip(application.id)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="row mt-5">
            <div className="col text-center">
              <div className="block-27">
                <ul>
                  <li>
                    <a
                      href="#container"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) handlePageChange(currentPage - 1);
                      }}
                      className={currentPage === 1 ? "disabled" : ""}
                    >
                      &lt;
                    </a>
                  </li>
                  {[...Array(totalPages).keys()].map((number) => (
                    <li
                      key={number + 1}
                      className={number + 1 === currentPage ? "active" : ""}
                    >
                      <a
                        href="#container"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(number + 1);
                        }}
                      >
                        {number + 1}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#container"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          handlePageChange(currentPage + 1);
                      }}
                      className={currentPage === totalPages ? "disabled" : ""}
                    >
                      &gt;
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="ftco-section-3 img"
        style={{ backgroundImage: `url(${ibg_3})` }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row d-md-flex">
            <div className="col-md-6 d-flex ftco-animate">
              <div className="donate-img"></div>
            </div>
            <div className="col-md-6 ftco-animate makedonation pl-md-5">
              <h3>Volunteer</h3>
              <form onSubmit={handleSubmit} className="request-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    value={values.email}
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
                <div className="form-group">
                  <textarea
                    cols="30"
                    rows="3"
                    className="form-control"
                    name="message"
                    placeholder="Message"
                    value={values.message}
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
                <div className="form-group">
                  <button type="submit" className="btn btn-white w-100">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {selectedApplication && bankDetails && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title font-weight-bold">Bank Details</h4>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                >
                  &times;
                </button>
              </div>
              <div
                className="modal-body"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <h5>Bank Details</h5>
                <p>
                  <strong>Name:</strong> {bankDetails.acc_hol_name}
                </p>
                <p>
                  <strong>Bank Name:</strong> {bankDetails.bank_name}
                </p>
                <p>
                  <strong>Account Number:</strong> {bankDetails.acc_no}
                </p>
                <p>
                  <strong>IFSC Code:</strong> {bankDetails.ifsc}
                </p>
                <p>
                  <strong>Mobile Number:</strong> {bankDetails.contact}
                </p>
                <QRCode
                  value={`Bank Name: ${bankDetails.bank_name}\nAccount Number: ${bankDetails.acc_no}\nIFSC Code: ${bankDetails.ifsc}\nContact: ${bankDetails.contact}`}
                  size={256}
                />
                <hr />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label className="font-weight-bold">Name:</label>
                    <input
                      className="form-control mb-2"
                      type="text"
                      name="dname"
                      value={donorDetails.dname}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                      required
                    />
                    {errors.dname && (
                      <div className="text-danger">{errors.dname}</div>
                    )}
                  </div>

                  <div>
                    <label className="font-weight-bold">Email:</label>
                    <input
                      className="form-control mb-2"
                      type="email"
                      name="demail"
                      value={donorDetails.demail}
                      onChange={handleChange}
                      placeholder="Enter Your Email"
                      required
                    />
                    {errors.demail && (
                      <div className="text-danger">{errors.demail}</div>
                    )}
                  </div>

                  <div>
                    <label className="font-weight-bold">Phone:</label>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="dphone"
                      value={donorDetails.dphone}
                      onChange={handleChange}
                      placeholder="Enter Your Phone Number"
                      required
                    />
                    {errors.dphone && (
                      <div className="text-danger">{errors.dphone}</div>
                    )}
                  </div>

                  <div>
                    <label className="font-weight-bold">Amount:</label>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="damount"
                      value={donorDetails.damount}
                      onChange={handleChange}
                      placeholder="Amount in rupees"
                      required
                    />
                    {errors.damount && (
                      <div className="text-danger">{errors.damount}</div>
                    )}
                  </div>

                 
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleDonation}
                    >
                      Pay
                    </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {showGallery && (
              <div className="modal" style={{ display: "flex", width: "auto" ,zIndex: 1000}}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">Image Gallery</h4>
                      <button
                        type="button"
                        className="close"
                        onClick={() => setShowGallery(false)}
                      >
                        &times;
                      </button>
                    </div>
                    <div className="modal-body">
                      <div 
                        className="image-gallery"
                        style={{
                          maxHeight: "400px",
                          overflowY: "auto",
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between"
                        }}
                      >
                        {galleryImages.length > 0 ? (
                          galleryImages.map((image, index) => (
                            <img
                              key={image.id}
                              src={image.url}
                              alt={`Gallery Image ${index + 1}`}
                              className="img-fluid mb-2"
                              style={{
                                width: "48%",
                                maxHeight: "150px",
                                marginBottom: "10px",
                                cursor: "pointer" 
                              }}
                              onClick={() => handleImageClick(image.url)} 
                              onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url.png'; }} 
                            />
                          ))
                        ) : (
                          <p>No images available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          
          {selectedImage && (
                  <div className="zoom-modal" style={{ 
                      display: "flex", 
                      justifyContent: "center", 
                      alignItems: "center", 
                      position: "fixed", 
                      top: 0, 
                      left: 0, 
                      width: "100%", 
                      height: "100%", 
                      backgroundColor: "rgba(0, 0, 0, 0.8)", 
                      zIndex: 2000 
                    }}>
                    <img
                      src={selectedImage}
                      alt="Zoomed Image"
                      style={{ 
                        maxWidth: "90%", 
                        maxHeight: "90%", 
                        cursor: "zoom-out" 
                      }} 
                      onClick={closeZoomModal} 
                    />
                  </div>
                )}


      <Footer />
    </>
  );
};

export default Donate;
