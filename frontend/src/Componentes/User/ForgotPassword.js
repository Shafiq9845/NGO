import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    axios
      .post('http://localhost:8081/forgot-password', { email })
      .then((res) => {
        setLoading(false);
        if (res.data.status === 'success') {
          toast.success('Password reset link sent to your email!');
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError('Error sending reset link. Please try again later.');
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="form p-4 rounded-lg shadow col-lg-4 col-md-6 col-sm-8 col-10">
          <h2 className="title">Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <strong>Enter your email</strong>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <span className="text-danger">{error}</span>}
            <button type="submit" className="btn-39 w-100 rounded-0 rounded-pill" disabled={loading}>
              {loading ? 'Sending...' : 'Send Password Reset Link'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
