import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/NavBar.css";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const handleLoginToggle = () => {
    setLoginForm(!loginForm);
    setSignUpForm(false);
  };
  const handleSignUpToggle = () => {
    setSignUpForm(!signUpForm);
    setLoginForm(false);
  };

  const getUserRole = () => {
    const stored = sessionStorage.getItem("user");
    if (!stored) return 1;
    try {
      const parsed = JSON.parse(stored);
      return parsed.role || 1;
    } catch {
      return 1;
    }
  };

  const userRole = getUserRole();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setSignedIn(!!token);
  }, [loginForm, signUpForm]);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="burger" onClick={toggleMenu}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/maintenance-request" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
            Maintenance Request
          </NavLink>
          <NavLink to="/active-request" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
            Active Request
          </NavLink>

          {userRole >= 2 && (
            <NavLink to="/my-requests" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
              My Requests
            </NavLink>
          )}
          {userRole >= 3 && (
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
              Dashboard
            </NavLink>
          )}
          {userRole === 4 && (
            <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
              Admin
            </NavLink>
          )}
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
            Contact
          </NavLink>
          {userRole >= 2 && (
            <NavLink to="/user-profile" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
              My Profile
            </NavLink>
          )}

          <div className="header-buttons-container">
            {signedIn ? (
              <button
                className="logout-button"
                onClick={() => {
                  setSignedIn(false);
                  sessionStorage.clear();
                  window.location.replace("/");
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <button className="login-button" onClick={handleLoginToggle}>
                  Login
                </button>
                <button className="signup-button" onClick={handleSignUpToggle}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>

        {loginForm && (
          <LoginForm setLoginForm={setLoginForm} setSignedIn={setSignedIn} />
        )}
        {signUpForm && (
          <SignUpForm setSignUpForm={setSignUpForm} setSignedIn={setSignedIn} />
        )}
      </div>
    </nav>
  );
}

export default NavBar;
