import React from "react";
import { Link } from "react-router-dom";
import "../Css/HomeComponent.css";


function HomeComponent() {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="col-12 col-md-8 col-lg-6 bg-white rounded-4 shadow p-5 text-center">
        <h2 className="fw-semibold mb-3">🔐 Authentication System Demo</h2>

        <p className="text-muted mb-4">
          This project demonstrates a complete authentication system built with
          <b> Django REST Framework </b> & <b> React Redux</b>. 
          Explore the features below:
        </p>

        <div className="d-flex flex-wrap justify-content-center gap-3">
          <Link to="/register" className="btn btn-primary px-4 py-2 rounded-3">Register</Link>
          <Link to="/verify" className="btn btn-outline-primary px-4 py-2 rounded-3">Verify Email</Link>
          <Link to="/login" className="btn btn-primary px-4 py-2 rounded-3">Login</Link>
          <Link to="/profile" className="btn btn-outline-primary px-4 py-2 rounded-3">Profile</Link>
          <Link to="/reset-password" className="btn btn-primary px-4 py-2 rounded-3">Forgot Password</Link>
          <Link to="/reset-password/confirm/" className="btn btn-outline-primary px-4 py-2 rounded-3">Reset Confirm</Link>
        </div>

        <p className="mt-5 text-muted small">⚡ Built by <b>Yousaf</b> – Django + React</p>
      </div>
    </div>
  );
}

export default HomeComponent;
