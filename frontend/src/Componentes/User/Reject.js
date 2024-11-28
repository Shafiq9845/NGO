import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const Reject = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
    <div className="card shadow-lg p-4 bg-transparent" style={{ maxWidth: '400px', width: '100%' }}>
      <div className="card-body text-center ">
        <h2 className="card-title mb-3">Rejected.</h2>
        <p className="card-text text-muted"> The application does not meet the specified guidelines or criteria. </p>
      </div>
    </div>
  </div>
  )
}

export default Reject