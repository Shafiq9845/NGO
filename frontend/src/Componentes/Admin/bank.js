import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import Nav from "./Nav";
import Footer from "../User/Footer";
import ibg_4 from "../../images/header-bg.jpg";

const Bank = () => {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/bank/list");
        setBanks(response.data);
      } catch (error) {
        console.error("Error fetching bank list:", error);
        toast.error(`Failed to fetch bank list: ${error.message}`);
      }
    };

    fetchBanks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/bank/${id}`);
      setBanks(banks.filter((bank) => bank.id !== id));
      toast.success("Bank entry deleted successfully.");
    } catch (error) {
      console.error("Error deleting bank entry:", error);
      toast.error(`Failed to delete bank entry: ${error.message}`);
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
              <h1 className="mb-3 bread title">Bank List</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4 bank-container position-relative " style={{ marginBottom: "900px", top:"100px"}}>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>NGO Name</th>
                <th>Name</th>
                <th>Bank Name</th>
                <th>Account Number</th>
                <th>Branch</th>
                <th>IFSC Code</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banks.length > 0 ? (
                banks.map((bank, index) => (
                  <tr key={bank.id}>
                    <td>{index + 1}</td>
                    <td>{bank.ngo_name}</td>
                    <td>{bank.acc_hol_name}</td>
                    <td>{bank.bank_name}</td>
                    <td>{bank.acc_no}</td>
                    <td>{bank.branch_name}</td>
                    <td>{bank.ifsc}</td>
                    <td>{bank.contact}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(bank.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">No banks found.</td>
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

export default Bank;
