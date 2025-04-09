import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/NavBar.css";
import { createPortal } from "react-dom";
import axios from "axios";

axios.defaults.withCredentials = true;
function LoginForm({
  username,
  password,
  setUsername,
  setPassword,
  setLoginForm,
  setSignedIn,
}) {
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("handleLogin called");
    try {
      const response = await axios.post(`http://localhost:8000/login`, {
        username,
        password,
      });
      console.log("Response data:", response.data);
      if (response.data.success) {
        console.log("Login successful");
        setLoginForm(false);
        setSignedIn(true);
        setUsername("");
        setPassword("");
        localStorage.setItem("token", response.data.token);
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="login-form-container"
      style={{
        position: "fixed",
        width: "200px",
        top: 90,
        right: 0,
        background: "#EB8921",
        marginRight: "30px",
        padding: 10,
        border: "1px solid #93C560",
        borderRadius: 5,
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
function SignUpForm({
  username,
  password,
  confirmPassword,
  setUsername,
  setPassword,
  setConfirmPassword,
  setSignUpForm,
  setSignedIn,
}) {
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        console.log("Passwords do not match");
        return;
      }
      if (!username || !password || !confirmPassword) {
        console.log("Please fill out all fields");
        return;
      }
      const response = await axios.post(`http://localhost:8000/signup`, {
        username,
        password,
        confirmPassword,
      });
      if (response.data.success) {
        console.log("User created successfully");
        setSignUpForm(false);
        setSignedIn(true);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      } else {
        console.log("Failed to create user");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="sign-up-form-container"
      style={{
        position: "fixed",
        width: "200px",
        top: 90,
        right: 0,
        background: "#EB8921",
        marginRight: "30px",
        padding: 10,
        border: "1px solid #93C560",
        borderRadius: 5,
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Create Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const [signedIn, setSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
  const [loginForm, setLoginForm] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);
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
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
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
            className={({ isActive }) =>
              `nav-link train-one-text ${isActive ? "active" : ""}`
            }
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

          {/* login/signup buttons */}
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
            />,
            document.body
          )}

        {signUpForm &&
          createPortal(
            <SignUpForm
              username={username}
              password={password}
              confirmPassword={confirmPassword}
              setUsername={setUsername}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              setSignUpForm={setSignUpForm}
              setSignedIn={setSignedIn}
              signUpError={signUpError}
            />,
            document.body
          )}
      </div>
    </nav>
  );
}

export default NavBar;
