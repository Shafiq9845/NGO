import React, { useState, useEffect } from 'react';
import '../../Css/style/bank.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../Ngo/Nav';
import Footer from '../User/Footer';
import axios from 'axios';

const Bank = () => {
  const [userId, setUserId] = useState('');
  const [bankDetails, setBankDetails] = useState({
    acc_hol_name: '',
    bank_name: '',
    acc_no: '',
    ifsc: '',
    branch_name: '',
    contact: '',
  });

  const [isUpdate, setIsUpdate] = useState(false);

  const handleChange = (event) => {
    setBankDetails({
      ...bankDetails,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const fetchBankDetails = () => {
    if (userId) {
      axios.get(`http://localhost:8081/ngo/bank/${userId}`)
        .then((res) => {
          if (res.data) {
            setBankDetails(res.data);
            setIsUpdate(true); 
          } else {
            toast.error('No bank details found for this user.');
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error('Failed to fetch bank details, please try again later.');
        });
    } else {
      toast.error('User ID not found.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...bankDetails,
      userId: userId,
    };

    if (isUpdate) {
      axios.put(`http://localhost:8081/ngo/bank/update`, dataToSend)
        .then((res) => {
          toast.success('Bank details updated successfully.');
        })
        .catch((err) => {
          console.error(err);
          toast.error('Something went wrong, please try again later.');
        });
    } else {
      axios.post('http://localhost:8081/ngo/bank', dataToSend)
        .then((res) => {
          toast.success('Bank details added successfully.');
        })
        .catch((err) => {
          console.error(err);
          toast.error('Something went wrong, please try again later.');
        });
    }
  };

  return (
    <>
      <Nav />
      <ToastContainer />
      <div className='container-fluid d-flex justify-content-center align-items-center vh-200 bank-container'>
        <div className='form p-4 rounded-lg shadow col-lg-4 col-md-6 col-sm-8 col-10'>
          <h2 className='title'>Bank Details</h2>
          
          <button
            type='button'
            className='btn btn-info mb-3 w-100'
            onClick={fetchBankDetails}
          >
            Fetch & Update Bank Details
          </button>

          <form onSubmit={handleSubmit}>
            <div className='mb-3 wrap-input-1'>
              <label htmlFor='accountHolderName'><strong>Account Holder Name</strong></label>
              <input
                type="text"
                name="acc_hol_name"
                value={bankDetails.acc_hol_name} 
                onChange={handleChange}
                required
                placeholder='Enter Name'
                className='input form-control rounded-0'
              />
              <span className='focus-border'></span>
            </div>

            <div className='mb-3 wrap-input-1'>
              <label htmlFor='bankName'><strong>Bank Name</strong></label>
              <input
                type="text"
                name="bank_name"
                value={bankDetails.bank_name} 
                onChange={handleChange}
                required
                placeholder='Enter Bank Name'
                className='input form-control rounded-0'
              />
              <span className='focus-border'></span>
            </div>

            <div className='mb-3 wrap-input-1'>
              <label htmlFor='accountNumber'><strong>Account Number</strong></label>
              <div className='position-relative'>
                <input
                  type='text'
                  name="acc_no"
                  value={bankDetails.acc_no} 
                  onChange={handleChange}
                  required
                  placeholder='Enter Account Number'
                  className='form-control input rounded-0 pr-5'
                />
                <span className='focus-border'></span>
              </div>
            </div>

            <div className='mb-3 wrap-input-1'>
              <label htmlFor='ifscCode'><strong>IFSC Code</strong></label>
              <div className='position-relative'>
                <input
                  type="text"
                  name="ifsc"
                  value={bankDetails.ifsc} 
                  onChange={handleChange}
                  required
                  placeholder='Enter IFSC Code'
                  className='form-control input rounded-0 pr-5'
                />
                <span className='focus-border'></span>
              </div>
            </div>

            <div className='mb-3 wrap-input-1'>
              <label htmlFor='branchName'><strong>Branch Name</strong></label>
              <div className='position-relative'>
                <input
                  type="text"
                  name="branch_name"
                  value={bankDetails.branch_name}
                  onChange={handleChange}
                  required
                  placeholder='Enter Branch Name'
                  className='form-control input rounded-0 pr-5'
                />
                <span className='focus-border'></span>
              </div>
            </div>

            <div className='mb-3 wrap-input-1'>
              <label htmlFor='contact'><strong>Contact</strong></label>
              <div className='position-relative'>
                <input
                  type="number"
                  name="contact"
                  value={bankDetails.contact} 
                  onChange={handleChange}
                  required
                  placeholder='Enter Contact'
                  className='form-control input rounded-0 pr-5'
                />
                <span className='focus-border'></span>
              </div>
            </div>

            <button type='submit' className='btn-39 w-100 rounded-0 rounded-pill'>
              <strong>
                <span className='new'>{isUpdate ? 'Update' : 'Submit'}</span>
                <span className='old'>{isUpdate ? 'Update' : 'Submit'}</span>
              </strong>
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Bank;
