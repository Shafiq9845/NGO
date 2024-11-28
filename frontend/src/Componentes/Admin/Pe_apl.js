import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from './Nav';
import '../../Css/style/pendingApli.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../User/Footer";
import ibg_4 from "../../images/event-5.jpg";


const Pe_apl = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchPendingApplications = async () => {
        try {
          const response = await axios.get("http://localhost:8081/api/ngo/pending");
          setApplications(response.data);
        } catch (error) {
          console.error("Error fetching pending applications:", error);
          toast.error(`Failed to fetch applications: ${error.message}`);
        }
      };
      

    fetchPendingApplications();
  }, []);


  const handleAction = async (id, action) => {
    try {
      const url = `http://localhost:8081/api/ngo/${action}/${id}`;
      await axios.post(url);
      toast.success(`Application ${action}ed successfully!`);
  
      const response = await axios.get("http://localhost:8081/api/ngo/pending");
      setApplications(response.data);
    } catch (error) {
      console.error(`Error ${action}ing application:`, error);
      toast.error(`Failed to ${action} application: ${error.message}`);
    }
  };
  

  return (
    <>
      <Nav />
      <ToastContainer/>
      <div
        className="hero-wrap"
        style={{ backgroundImage: `url(${ibg_4})` }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center">
            <div className="col-md-7 ftco-animate text-center">
              <h1 className="mb-3 bread title">Pending Applications</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4 pending-container position-relative" style={{marginBottom:"900px"}}>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Registration Number</th>
                <th>Address</th>
                <th>Date Submitted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr key={application.id}>
                  <td>{index + 1}</td>
                  <td>{application.Name}</td>
                  <td>{application.email}</td>
                  <td>{application.ngo_reg_no}</td>
                  <td>{application.address}</td>
                  <td>
                    {application.date ? new Date(application.date).toLocaleDateString() : "N/A"}
                  </td>
                  <td>{application.status}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleAction(application.id, 'accept')}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleAction(application.id, 'reject')}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>  
      <Footer />  
    </>
  );
};

export default Pe_apl;
