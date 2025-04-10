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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setSignedIn(true);
    }
  }, []);

  // const storedUser = sessionStorage.getItem("user");
  // const user = storedUser ? JSON.parse(storedUser) : null;

  // // const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="burger" onClick={toggleMenu}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/maintenance-request"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            Maintenance Request
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/maintenance-tracker"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            Maintenance Tracker
          </NavLink>
          <NavLink
            to="/my-requests"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            My Requests
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            Admin
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            Contact
          </NavLink>

          <div className="header-buttons-container">
            {signedIn ? (
              <button
                className="header-buttons"
                onClick={() => {
                  setSignedIn(false);
                  sessionStorage.removeItem("token");
                  sessionStorage.removeItem("user");
                }}
              >
                {/* Hi {user?.first_name || "User"}, Logout */} Logout
              </button>
            ) : (
              <>
                <button className="header-buttons" onClick={handleLoginToggle}>
                  Login
                </button>
                <button className="header-buttons" onClick={handleSignUpToggle}>
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
