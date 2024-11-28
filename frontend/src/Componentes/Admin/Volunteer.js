  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import "react-toastify/dist/ReactToastify.css";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { toast, ToastContainer } from "react-toastify";
  import Nav from "./Nav";
  import Footer from "../User/Footer";
  import ibg_4 from "../../images/bg_4.jpg";

  const Volunteer = () => {
    const [volunteerApplications, setVolunteerApplications] = useState([]);

    useEffect(() => {
      const fetchVolunteerApplications = async () => {
        try {
          const response = await axios.get("http://localhost:8081/api/ngo/volunteer");
          setVolunteerApplications(response.data);
        } catch (error) {
          console.error("Error fetching volunteer applications:", error);
          toast.error(`Failed to fetch volunteer applications: ${error.message}`);
        }
      };

      fetchVolunteerApplications();
    }, []);

    const handleDelete = async (id) => {
      try {
        const url = `http://localhost:8081/api/ngo/delete/volunteer/${id}`;
        await axios.delete(url);
        const response = await axios.get("http://localhost:8081/api/ngo/volunteer");
        setVolunteerApplications(response.data);
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
              <h1 className="mb-3 bread title">Volunteers List</h1>
            </div>
          </div>
        </div>
      </div>
        <div className="container mt-4 volunteer-container position-relative" style={{ marginBottom: "900px", top: "100px" }}>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {volunteerApplications.length > 0 ? (
                  volunteerApplications.map((application, index) => (
                    <tr key={application.id}>
                      <td>{index + 1}</td>
                      <td>{application.name}</td>
                      <td>{application.email}</td>
                      <td>{application.pNo}</td>
                      <td>{application.adr}</td> 
                      <td>{new Date(application.date).toLocaleDateString()}</td>
                      <td>{application.msg}</td> 
                      <td>
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
                    <td colSpan="8" className="text-center">No volunteer applications yet.</td>
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

  export default Volunteer;
