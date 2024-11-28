import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Css/style.css";
import {useNavigate } from 'react-router-dom';
import Nav from './Nav';
import Footer from '../User/Footer';

const Home = () => {
  const navigate = useNavigate();
  const [works, setWorks] = useState([]);
  const [userId, setUserId] = useState('');
  const [ngoName, setNgoName] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [donors, setDonors] = useState([]);


  const boxShadowStyle = "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px";

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedNgoName = localStorage.getItem('ngoName');

    if (storedUserId && storedNgoName) {
      setUserId(storedUserId);
      setNgoName(storedNgoName);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/works?ngoId=${userId}`);
        setWorks(response.data);
      } catch (error) {
        console.error('Error fetching works:', error);
        toast.error('Error fetching works, please try again later.');
      }
    };

    if (userId) {
      fetchWorks();
    }
  }, [userId]);

  const handleDelete = async (workId) => {
    if (window.confirm('Are you sure you want to delete this work?')) {
      try {
        await axios.delete(`http://localhost:8081/api/works/${workId}`);
        toast.success('Work deleted successfully');
        
        setWorks(works.filter((work) => work.id !== workId));
      } catch (error) {
        console.error('Error deleting work:', error);
        toast.error('Error deleting work, please try again later.');
      }
    }
  };
  useEffect(()=>{
    
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/image/${userId}`);
        setBackgroundImage(`http://localhost:8081/uploads/${response.data.image}`);
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    };
    if (userId) {
      fetchImage();
    }
  }, [userId])
  

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/donors?ngoId=${userId}`);
        setDonors(response.data);
      } catch (error) {
        console.error('Error fetching donors:', error);
        toast.error('Error fetching donors, please try again later.');
      }
    };

    if (userId) {
      fetchDonors();
    }
  }, [userId]);

  return (
    <>
      <Nav />

      <div
        className="hero-wrap"
        style={{ backgroundImage: `url(${backgroundImage})` }}
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

      <div className="container" style={{ position: 'relative', top: '100px', marginBottom: "25vw" }}>
        <h2>Donors List</h2>
        <div className="row">
          {donors.length > 0 ? (
            donors.map((donor) => (
              <div className="col-md-4 mb-4" key={donor.id}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{donor.dname}</h5>
                    <p className="card-text">Amount : ₹{donor.damount}</p>
                    <p className="card-text">Email: ₹{donor.demail}</p>
                    <p className="card-text">Mobile: ₹{donor.dphone}</p>
                    <p className="card-text text-muted">
                      <small>{new Date(donor.date).toLocaleDateString()}</small>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No donors found.</p>
          )}
        </div>
      </div>


      <div className="container" style={{ position: 'relative', top: '-150px' }}>
        <h2>Submitted Works</h2>
        <div className="row">
          {works.length > 0 ? (
            works.map((work) => (
              <div className="col-md-4 mb-4" key={work.id}>
                <div className="card shadow-sm" style={{ boxShadow: boxShadowStyle }}>
                  <img
                    src={`http://localhost:8081/uploads/${work.proof}`}
                    className="card-img-top"
                    alt="Proof of Work"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{work.description}</h5>
                    <p className="card-text">Total Expenses: ₹{work.expenses} </p>
                    <p className="card-text">Submitted by: {work.ngoName}</p>
                    <p className="card-text text-muted">
                      <small>{new Date(work.date).toLocaleDateString()}</small>
                    </p>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(work.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No works submitted yet.</p>
          )}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Home;
