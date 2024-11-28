import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from './Nav';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../User/Footer";
import ibg_4 from "../../images/image_6.jpg";


const Acp_apl = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchAcceptedApplications = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/ngo/accepted");
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching accepted applications:", error);
        toast.error(`Failed to fetch applications: ${error.message}`);
      }
    };

    fetchAcceptedApplications();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const url = `http://localhost:8081/api/ngo/${action}/${id}`;
      await axios.post(url);
      const response = await axios.get("http://localhost:8081/api/ngo/accepted");
      setApplications(response.data);
      toast.success(`Application ${action}d successfully.`);
    } catch (error) {
      console.error(`Error ${action} application:`, error);
      toast.error(`Failed to ${action} application.`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const url = `http://localhost:8081/api/ngo/delete/${id}`;
      await axios.delete(url);
      const response = await axios.get("http://localhost:8081/api/ngo/accepted");
      setApplications(response.data);
      toast.success('Application deleted successfully.');
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application.");
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
              <h1 className="mb-3 bread title">Accepted List</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4 accepted-container position-relative" style={{ marginBottom: "900px", top: "100px" }}>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Sl.NO</th>
                <th>Name</th>
                <th>Email</th>
                <th>Registration Number</th>
                <th>Address</th>
                <th>Date Accepted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((application, index) => (
                  <tr key={application.id}>
                    <td>{index + 1}</td>
                    <td>{application.Name}</td>
                    <td>{application.email}</td>
                    <td>{application.ngo_reg_no}</td>
                    <td>{application.address}</td>
                    <td>
                      {new Date(application.date).toLocaleDateString()}
                    </td>
                    <td>{application.status}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleAction(application.id, 'block')}
                      >
                        Block
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(application.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No accepted applications yet.</td>
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

export default Acp_apl;
