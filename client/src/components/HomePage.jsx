import "../styles/Homepage.css";

const Homepage = () => {
  return (
    <div className="home-containter">
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
        </div>

        <div className="features-grid">
          {/* Card 1 */}
          <div className="feature-card">
            <i className="features-icon">📝</i>
            <h3>Easy Submission</h3>
            <p>
              Submit maintenance requests quickly with our user-friendly form
            </p>
          </div>
          {/* Card 2 */}
          <div className="feature-card">
            <i className="features-icon">📱</i>
            <h3>Real-time Tracking</h3>
            <p>Monitor the status of your requests in real-time</p>
          </div>
          {/* Card 3 */}
          <div className="feature-card">
            <i className="features-icon">📊</i>
            <h3>Efficient Management</h3>
            <p>Streamlined workflow for maintenance teams</p>
          </div>
          {/* Card 4 */}
          <div className="feature-card">
            <i className="features-icon">📊</i>
            <h3>Efficient Management</h3>
            <p>Streamlined workflow for maintenance teams</p>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn primary">Submit Request</button>
          <button className="btn secondary">View Active Requests</button>
          <button className="btn admin-login">Admin</button>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2025 DPWFlow. All rights reserved.</p>
        <p>Privacy Policy | Terms of Service</p>
      </footer>
    </div>
  );
};

export default Homepage;
