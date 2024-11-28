import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Css/style/loginsignup.css";
import { toast, ToastContainer } from "react-toastify";
import Nav from "./Nav";
import Footer from "../User/Footer";
import ibg_4 from "../../images/bg_3.jpg";


const Blc_apl = () => {
  const [blockedApplications, setBlockedApplications] = useState([]);


  useEffect(() => {
    const fetchBlockedApplications = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/ngo/blocked");
        setBlockedApplications(response.data);
      } catch (error) {
        console.error("Error fetching blocked applications:", error);
        toast.error(`Failed to fetch blocked applications: ${error.message}`);
      }
    };

    fetchBlockedApplications();
  }, []);

  const handleUnblock = async (id) => {
    try {
      const url = `http://localhost:8081/api/ngo/unblock/${id}`;
      await axios.post(url);
      const response = await axios.get("http://localhost:8081/api/ngo/blocked");
      setBlockedApplications(response.data);  
      toast.success('Application unblocked successfully.');
    } catch (error) {
      console.error("Error unblocking application:", error);
      toast.error(`Failed to unblock application: ${error.message}`);
    }
  };

  return (
    <>
      <Nav />
      <ToastContainer />
      <div
        className="hero-wrap"
        style={{ backgroundImage: `url(${ibg_4})` }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center">
            <div className="col-md-7 ftco-animate text-center">
              <h1 className="mb-3 bread title">Blocked List</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4 blocked-container position-relative" style={{ marginBottom: "900px", top: "100px" }}>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Registration Number</th>
                <th>Address</th>
                <th>Date Blocked</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blockedApplications.length > 0 ? (
                blockedApplications.map((application, index) => (
                  <tr key={application.id}>
                    <td>{index + 1}</td>
                    <td>{application.Name}</td>
                    <td>{application.email}</td>
                    <td>{application.ngo_reg_no}</td>
                    <td>{application.address}</td>
                    <td>{new Date(application.date).toLocaleDateString()}</td>
                    <td>{application.status}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleUnblock(application.id)}
                      >
                        Unblock
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No blocked applications yet.</td>
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

export default Blc_apl;
