import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const Blocked = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
      <div className="card shadow-lg p-4 bg-transparent" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body text-center ">
          <h2 className="card-title mb-3">Blocked</h2>
          <p className="card-text text-muted">The user has breached the terms and conditions agreed upon during registration.</p>
        </div>
      </div>
    </div>
  )
}

export default Blocked