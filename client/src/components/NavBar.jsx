import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "../styles/NavBar.css";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import axios from "axios";

axios.defaults.withCredentials = true;

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rank, setRank] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loginForm, setLoginForm] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);

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
            className={({ isActive }) =>
              `nav-link train-one-text ${isActive ? "active" : ""}`
            }
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

          {/* Auth Buttons */}
          <div className="header-buttons-container">
            {signedIn ? (
              <button className="header-buttons">Account</button>
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

        {/* Login Form */}
        {loginForm &&
          createPortal(
            <LoginForm
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              setLoginForm={setLoginForm}
              setSignedIn={setSignedIn}
              loginError={loginError}
              setLoginError={setLoginError}
            />,
            document.body
          )}

        {/* Sign Up Form */}
        {signUpForm &&
          createPortal(
            <SignUpForm
              firstName={firstName}
              lastName={lastName}
              rank={rank}
              phoneNumber={phoneNumber}
              email={email}
              username={username}
              password={password}
              confirmPassword={confirmPassword}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setRank={setRank}
              setPhoneNumber={setPhoneNumber}
              setEmail={setEmail}
              setUsername={setUsername}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              setSignUpForm={setSignUpForm}
              setSignedIn={setSignedIn}
              signUpError={signUpError}
              setSignUpError={setSignUpError}
            />,
            document.body
          )}
      </div>
    </nav>
  );
}

export default NavBar;
