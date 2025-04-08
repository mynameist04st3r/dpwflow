import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>DPWflow</h1>
        <p className="subtitle">Digital Work Order Management System</p>
      </header>

      <section className="intro-section">
        <div className="intro-content">
          <h2>Streamlined Maintenance Management</h2>
          <p>
            DPWflow simplifies maintenance requests and tracking for military
            barracks and garrison facilities. Submit, track, and manage work
            orders efficiently in one centralized platform.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <i className="feature-icon">📝</i>
            <h3>Easy Submission</h3>
            <p>
              Submit maintenance requests quickly with our user-friendly form
            </p>
          </div>
          <div className="feature-card">
            <i className="feature-icon">📱</i>
            <h3>Real-time Tracking</h3>
            <p>Monitor the status of your requests in real-time</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon">📊</i>
            <h3>Efficient Management</h3>
            <p>Streamlined workflow for maintenance teams</p>
          </div>
        </div>

        <div className="action-buttons">
          <button
            className="btn primary"
            onClick={() => navigate("/maintenance-request")}
          >
            Submit Request
          </button>
          <button
            className="btn secondary"
            onClick={() => navigate("/my-requests")}
          >
            View My Requests
          </button>
          <button
            className="btn tertiary"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </section>

      <footer className="home-footer">
        <p>Directorate of Public Works Digital Solutions</p>
      </footer>
    </div>
  );
};

export default HomePage;
