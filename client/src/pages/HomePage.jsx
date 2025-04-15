import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import "../styles/HomePage.css";
import LoginForm from "../components/LoginForm";

const HomePage = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleAdminClick = () => {
    setLoginForm(true);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I submit a maintenance request?",
      answer:
        "Click the 'Submit Request' button and fill out the simple form with your location and maintenance issue details.",
    },
    {
      question: "How can I track my request?",
      answer:
        "Use the 'View Active Requests' button to see real-time updates on all your maintenance requests.",
    },
    {
      question: "What are the response times?",
      answer:
        "Response times vary based on priority. Emergency issues are addressed within 24 hours, routine maintenance within 3-5 business days.",
    },
    {
      question: "Who can submit requests?",
      answer:
        "All military personnel and authorized civilian staff in barracks and garrison facilities can submit maintenance requests.",
    },
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>DPWFlow</h1>
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

          <div className="features-grid">
            {/* Card 1 */}
            <div className="feature-card">
              <span className="features-icon">📝</span>
              <h3>Easy Submission</h3>
              <p>
                Submit maintenance requests quickly with our user-friendly form
              </p>
            </div>
            {/* Card 2 */}
            <div className="feature-card">
              <span className="features-icon">📱</span>
              <h3>Real-time Tracking</h3>
              <p>Monitor the status of your requests in real-time</p>
            </div>
            {/* Card 3 */}
            <div className="feature-card">
              <span className="features-icon">📊</span>
              <h3>Efficient Management</h3>
              <p>Streamlined workflow for maintenance teams</p>
            </div>
          </div>
        </div>

        <div className="intro-content">
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-accordion">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${
                    expandedFaq === index ? "expanded" : ""
                  }`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="faq-question">
                    <h3>{faq.question}</h3>
                    <span className="faq-icon">
                      {expandedFaq === index ? "−" : "+"}
                    </span>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
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
            className="btn primary"
            onClick={() => navigate("/active-request")}
          >
            View Active Requests
          </button>
          <button className="btn admin-login" onClick={handleAdminClick}>
            Admin
          </button>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2025 DPWFlow. All rights reserved.</p>
        <p>Privacy Policy | Terms of Service</p>
      </footer>

      {loginForm &&
        createPortal(
          <LoginForm setLoginForm={setLoginForm} setSignedIn={setSignedIn} />,
          document.body
        )}
    </div>
  );
};

export default HomePage;
