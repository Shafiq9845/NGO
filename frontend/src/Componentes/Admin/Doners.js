import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import Nav from "./Nav";
import Footer from "../User/Footer";
import ibg_2 from "../../images/bg_2.jpg";
const Doners = () => {
  const [donors, setDonors] = useState([]);
  const [ngoNames, setNgoNames] = useState({});

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/ngo/donors");
        setDonors(response.data);
        await fetchNgoNames(response.data);
      } catch (error) {
        console.error("Error fetching donors:", error);
        toast.error(`Failed to fetch donors: ${error.message}`);
      }
    };

    fetchDonors();
  }, []);

  const fetchNgoNames = async (donorData) => {
    try {
      const ngoIdSet = new Set(donorData.map(donor => donor.ngo_id));
        const ngoNamePromises = Array.from(ngoIdSet).map(id =>
        axios.get(`http://localhost:8081/api/ngo/name/${id}`)
      );
      const ngoNameResponses = await Promise.all(ngoNamePromises);
      const ngoNameMap = ngoNameResponses.reduce((acc, response) => {
        acc[response.data.id] = response.data.Name; 
        return acc;
      }, {});
  
      setNgoNames(ngoNameMap);
    } catch (error) {
      console.error("Error fetching NGO names:", error);
      toast.error("Failed to fetch NGO names.");
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const url = `http://localhost:8081/api/ngo/delete/donor/${id}`;
      await axios.delete(url);
      setDonors(donors.filter(donor => donor.id !== id));
      toast.success('Donor deleted successfully.');
    } catch (error) {
      console.error("Error deleting donor:", error);
      toast.error("Failed to delete donor.");
    }
  };

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
                Doners List
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4 donor-container position-relative" style={{ marginBottom: "900px", top: "100px" }}>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>NGO Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donors.length > 0 ? (
                donors.map((donor, index) => (
                  <tr key={donor.id}>
                    <td>{index + 1}</td>
                    <td>{donor.dname}</td>
                    <td>{donor.demail}</td>
                    <td>{donor.dphone}</td>
                    <td>{ngoNames[donor.ngo_id] || 'Loading...'}</td>
                    <td>{donor.damount}</td>
                    <td>{new Date(donor.date).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(donor.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No donors found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Doners;
