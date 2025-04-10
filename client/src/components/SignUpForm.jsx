import { useRef, useEffect, useState } from "react";
import axios from "axios";
import "../styles/FormModal.css";

axios.defaults.withCredentials = true;

function SignUpForm({ setSignUpForm, setSignedIn }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rank, setRank] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpError, setSignUpError] = useState(null);
  const [minimized, setMinimized] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setMinimized(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword)
      return setSignUpError("Please fill out all fields");
    if (password !== confirmPassword)
      return setSignUpError("Passwords do not match");

    try {
      const res = await axios.post("http://localhost:8000/auth/signup", {
        first_name: firstName,
        last_name: lastName,
        rank,
        username,
        password,
        confirmPassword,
        phone_number: phoneNumber,
        email,
      });
      if (res.data.success) {
        setSignUpForm(false);
        setSignedIn(true);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setSignUpError(res.data.message || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      if (err.response) {
        setSignUpError(err.response.data.message || "Signup failed.");
      } else {
        setSignUpError("Unable to connect to server.");
      }
    }
  };

  return (
    <div
      className={`form-modal sign-up-form-container ${
        minimized ? "minimized" : ""
      }`}
      ref={formRef}
    >
      <div className="form-top-buttons">
        {minimized ? (
          <button
            className="minimize-button"
            onClick={() => setMinimized(false)}
          >
            🔽 Expand
          </button>
        ) : null}
        <button className="close-button" onClick={() => setSignUpForm(false)}>
          X
        </button>
      </div>

      {!minimized && (
        <form onSubmit={handleSignUp}>
          <h2 className="form-title">Sign Up Form</h2>

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <input
            type="text"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            placeholder="Rank"
          />
          <input
            type="tel"
            value={phoneNumber}
            pattern="[0-9]{10}"
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
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
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <button type="submit">Submit</button>
          {signUpError && <p className="signup-error">{signUpError}</p>}
        </form>
      )}
    </div>
  );
}

export default SignUpForm;
