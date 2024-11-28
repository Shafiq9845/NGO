import Nav from './Nav';
import Footer from '../User/Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';

const Work = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [ngoName, setNgoName] = useState('');
  const [balance, setBalance] = useState(0);
  const [values, setValues] = useState({
    description: '',
    expenses: '',
    proof: null,
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedNgoName = localStorage.getItem('ngoName');
    const storedBalance = localStorage.getItem('balance');

    if (storedUserId && storedNgoName) {
      setUserId(storedUserId);
      setNgoName(storedNgoName);
      setBalance(parseFloat(storedBalance) || 0);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setValues({
      ...values,
      proof: e.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const expensesValue = parseFloat(values.expenses);
    if (expensesValue > balance) {
      toast.error('Expenses exceed available balance. Please adjust the expenses.');
      return;
    }

    if (!values.description || !values.expenses || !values.proof) {
      toast.error('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('ngoName', ngoName);
    formData.append('description', values.description);
    formData.append('expenses', expensesValue); 
    formData.append('proof', values.proof);

    try {
      const response = await axios.post('http://localhost:8081/api/upload-proof', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Proof of work uploaded successfully!');
        setValues({
          description: '',
          expenses: '',
          proof: null,
        });
      } else {
        toast.error('Error uploading proof of work.');
      }
    } catch (error) {
      toast.error('An error occurred while uploading: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <Nav />
      <div className="container" style={{ position: 'relative', top: '100px', marginBottom: "25vw" }}>
        <h2>Submit Proof of Work</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              value={values.description}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expenses">Total Expenses</label>
            <input
              type="number"
              className="form-control"
              id="expenses"
              name="expenses"
              value={values.expenses}
              onChange={handleInput}
              required
              min="0" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="proof">Upload Proof of Work</label>
            <input
              type="file"
              className="form-control"
              id="proof"
              name="proof"
              onChange={handleFileChange}
              required
              accept=".jpg, .jpeg, .png, .pdf" 
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Work;
