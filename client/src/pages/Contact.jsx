import React from "react";
import "../styles/Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p className="subtitle">Get in touch with our support team</p>
      </header>

      {/* Emergency Section */}
      <div className="emergency-banner">
        <div className="emergency-content">
          <span className="emergency-icon">🚨</span>
          <div className="emergency-text">
            <h2>Emergency Contacts</h2>
            <div className="emergency-numbers">
              <div className="emergency-item">
                <span className="label">Work Orders:</span>
                <a href="tel:7108675209">710-867-5209</a>
              </div>
              <div className="emergency-item">
                <span className="label">Life-Threatening:</span>
                <a href="tel:911">911</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Contact Grid */}
      <div className="contact-grid">
        {/* Building Managers */}
        <div className="contact-section managers">
          <div className="section-header">
            <span className="section-icon">👥</span>
            <h2>Building Managers</h2>
          </div>
          <div className="contact-cards">
            <div className="contact-card">
              <h3>SSG John Smith</h3>
              <div className="contact-info">
                <p>
                  <span className="icon">📱</span>{" "}
                  <a href="tel:+1234567890">123-456-7890</a>
                </p>
                <p>
                  <span className="icon">📧</span>{" "}
                  <a href="mailto:john.smith@military.mil">
                    john.smith@military.mil
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-card">
              <h3>SFC Jane Doe</h3>
              <div className="contact-info">
                <p>
                  <span className="icon">📱</span>{" "}
                  <a href="tel:+1234567890">123-456-7890</a>
                </p>
                <p>
                  <span className="icon">📧</span>{" "}
                  <a href="mailto:jane.doe@military.mil">
                    jane.doe@military.mil
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Administrative Support */}
        <div className="contact-section admin">
          <div className="section-header">
            <span className="section-icon">📊</span>
            <h2>Administrative Support</h2>
          </div>
          <div className="contact-cards">
            <div className="contact-card">
              <h3>Admin Office</h3>
              <div className="contact-info">
                <p>
                  <span className="icon">📱</span>{" "}
                  <a href="tel:+1234567890">123-456-7890</a>
                </p>
                <p>
                  <span className="icon">📧</span>{" "}
                  <a href="mailto:admin@dpwflow.mil">admin@dpwflow.mil</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Support */}
        <div className="contact-section support">
          <div className="section-header">
            <span className="section-icon">💻</span>
            <h2>Technical Support</h2>
          </div>
          <div className="contact-cards">
            <div className="contact-card">
              <h3>Team BLB</h3>
              <div className="contact-info">
                <p>
                  <span className="icon">📧</span>{" "}
                  <a href="mailto:support@dpwflow.mil">support@dpwflow.mil</a>
                </p>
                <p>
                  <span className="icon">ℹ️</span> Available 24/7 for technical
                  assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
