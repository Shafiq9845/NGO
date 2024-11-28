import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const Pending = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
      <div className="card shadow-lg p-4 bg-transparent" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body text-center ">
          <h2 className="card-title mb-3">Application Pending...</h2>
          <p className="card-text text-muted">Your application is still under review. Please check back later for updates.</p>
        </div>
      </div>
    </div>
  );
};

export default Pending;
