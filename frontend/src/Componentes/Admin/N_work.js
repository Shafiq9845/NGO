import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import Nav from "./Nav";
import Footer from "../User/Footer";
import ibg_4 from "../../images/event-1.jpg";

const NgoWork = () => {
  const [ngoWorks, setNgoWorks] = useState([]);

  useEffect(() => {
    const fetchNgoWorks = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/ngo/works");
        setNgoWorks(response.data);
      } catch (error) {
        console.error("Error fetching NGO works:", error);
        toast.error(`Failed to fetch NGO works: ${error.message}`);
      }
    };

    fetchNgoWorks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const url = `http://localhost:8081/api/ngo/delete/work/${id}`;
      await axios.delete(url);
      setNgoWorks(ngoWorks.filter(work => work.id !== id));
      toast.success('NGO work deleted successfully.');
    } catch (error) {
      console.error("Error deleting NGO work:", error);
      toast.error("Failed to delete NGO work.");
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
              <h1 className="mb-3 bread title">Works List</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4 ngo-work-container position-relative" style={{ marginBottom: "900px", top: "100px" }}>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>NGO Name</th>
                <th>Description</th>
                <th>Expense</th>
                <th>Proof of Work</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ngoWorks.length > 0 ? (
                ngoWorks.map((work, index) => (
                  <tr key={work.id}>
                    <td>{index + 1}</td>
                    <td>{work.ngoName}</td>
                    <td>{work.description}</td>
                    <td>{work.expenses}</td>
                    <td>
                        {work.proof ? (
                            work.proof.endsWith(".pdf") ? (
                            <a href={`http://localhost:8081/uploads/${work.proof}`} target="_blank" rel="noopener noreferrer">Preview PDF</a>
                            ) : (
                            <a href={`http://localhost:8081/uploads/${work.proof}`} target="_blank" rel="noopener noreferrer">View Proof</a>
                            )
                        ) : 'No proof available'}
                    </td>
                    <td>{new Date(work.date).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(work.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No NGO works found.</td>
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

export default NgoWork;
