import { useState } from "react";
import axios from "axios";

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
    <div className="sign-up-form-container" style={formStyle}>
      <form onSubmit={handleSignUp}>
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
        {signUpError && <p style={{ color: "red" }}>{signUpError}</p>}
      </form>
    </div>
  );
}

const formStyle = {
  position: "fixed",
  width: "400px",
  top: 90,
  right: 0,
  background: "#EB8921",
  marginRight: "30px",
  padding: 10,
  border: "1px solid #93C560",
  borderRadius: 5,
  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  zIndex: 1000,
};

export default SignUpForm;
