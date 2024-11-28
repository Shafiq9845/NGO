import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../Ngo/Nav';
import Footer from '../User/Footer';

const Profile = () => {
  const [ngoDetails, setNgoDetails] = useState(null);
  const [updateValues, setUpdateValues] = useState({
    address: '',
    city: '',
    pincode: '',
    password: '',
    confirmPassword: '',
    pImage: null,
  });

  const ngoId = localStorage.getItem('userId');

  useEffect(() => {
    if (ngoId) {
      axios.get(`http://localhost:8081/ngo/profile/${ngoId}`)
        .then((res) => {
          setNgoDetails(res.data);
          setUpdateValues({
            address: res.data.address || '',
            city: res.data.city || '',
            pincode: res.data.pincode || '',
            password: '',
            confirmPassword: '',
            pImage: null,
          });
        })
        .catch((err) => {
          console.error(err);
          toast.error('Failed to fetch NGO details.');
        });
    }
  }, [ngoId]);

  const handleInput = (event) => {
    const { name, value, files } = event.target;
    if (name === 'pImage' && files.length > 0) {
      setUpdateValues({ ...updateValues, pImage: files[0] });
    } else {
      setUpdateValues({ ...updateValues, [name]: value });
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    if (updateValues.password !== updateValues.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    const formData = new FormData();
    formData.append('address', updateValues.address);
    formData.append('city', updateValues.city);
    formData.append('pincode', updateValues.pincode);

    if (updateValues.password && updateValues.password.trim() !== '') {
        
      formData.append('password', updateValues.password);
    }

    if (updateValues.pImage) {
      formData.append('pImage', updateValues.pImage);
    }

    axios.put(`http://localhost:8081/ngo/profile/update/${ngoId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        toast.success('Profile updated successfully!');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to update profile.');
      });
  };

  return (
    <>
      <Nav />
      <ToastContainer />
      <div className="container"  style={{ position:'relative', top: '100px', marginBottom: '150px' }}>
        <h2>NGO Profile</h2>

        {ngoDetails ? (
          <>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Details</h5>
                <p><strong>NGO Name:</strong> {ngoDetails.Name || "Not available"}</p>
                <p><strong>NGO Type:</strong> {ngoDetails.type || "Not available"}</p>
                <p><strong>Registration Number:</strong> {ngoDetails.ngo_reg_no || "Not available"}</p>
                <p><strong>Address:</strong> {ngoDetails.address || "Not available"}</p>
                <p><strong>City:</strong> {ngoDetails.city || "Not available"}</p>
                <p><strong>Pincode:</strong> {ngoDetails.pincode || "Not available"}</p>
                <p><strong>Email:</strong> {ngoDetails.email || "Not available"}</p>
                <p><strong>Contact Person:</strong> {ngoDetails.contact_person || "Not available"}</p>
                <p><strong>Contact Person Phone:</strong> {ngoDetails.c_p_no || "Not available"}</p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Update Details</h5>
                <form onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={updateValues.address}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={updateValues.city}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pincode" className="form-label">Pincode</label>
                    <input
                      type="text"
                      className="form-control"
                      id="pincode"
                      name="pincode"
                      value={updateValues.pincode}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={updateValues.password}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={updateValues.confirmPassword}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pImage" className="form-label">Profile Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="pImage"
                      name="pImage"
                      onChange={handleInput}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Update</button>
                </form>
              </div>
            </div>
          </>
        ) : (
          <p>No NGO details available.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
