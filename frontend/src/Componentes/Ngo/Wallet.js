import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Css/open-iconic-bootstrap.min.css';
import '../../Css/animate.css';
import '../../Css/owl.carousel.min.css';
import '../../Css/owl.theme.default.min.css';
import '../../Css/magnific-popup.css';
import '../../Css/aos.css';
import '../../Css/ionicons.min.css';
import '../../Css/bootstrap-datepicker.css';
import '../../Css/jquery.timepicker.css';
import '../../Css/flaticon.css';
import '../../Css/icomoon.css';
import '../../Css/style.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Nav';
import Footer from '../User/Footer';

const Wallet = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [balance, setBalance] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const donationsResponse = await axios.get('http://localhost:8081/api/donations', {
          params: { ngoId: userId },
        });
        const worksResponse = await axios.get('http://localhost:8081/api/works', {
          params: { ngoId: userId },
        });

        const donationTransactions = donationsResponse.data.map(donation => ({
          type: 'Donation',
          amount: donation.damount,
          date: donation.date,
          description: `Donation from ${donation.dname}`,
        }));

        const workTransactions = worksResponse.data.map(work => ({
          type: 'Debit',
          amount: work.expenses,
          date: work.date,
          description: `Work: ${work.description}`,
        }));

        const totalDonations = donationsResponse.data.reduce((acc, donation) => acc + donation.damount, 0);
        const totalExpenses = worksResponse.data.reduce((acc, work) => acc + work.expenses, 0);
        const newBalance = totalDonations - totalExpenses;

        setBalance(newBalance); 
        localStorage.setItem('balance', newBalance);
        console.log(newBalance);
        setTransactions([...donationTransactions, ...workTransactions]);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  return (
    <>
    <Nav />
    <div className="container" style={{ position: 'relative', top: '100px', marginBottom: "25vw" }}>
      <h2>Wallet Transactions</h2>
      <h4>Current Balance: ₹{balance}</h4>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.type}</td>
                  <td>₹{transaction.amount}</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <ToastContainer />
    </div>
    <Footer />
    </>
  );
};

export default Wallet;
