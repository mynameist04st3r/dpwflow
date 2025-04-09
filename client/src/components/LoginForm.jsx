import { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

function LoginForm({ setLoginForm, setSignedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/auth/login", {
        username,
        password,
      });
      if (res.data.success) {
        setLoginForm(false);
        setSignedIn(true);
        setUsername("");
        setPassword("");
        localStorage.setItem("token", res.data.token);
      } else {
        setLoginError(res.data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      if (err.response) {
        setLoginError(err.response.data.message || "Login failed.");
      } else {
        setLoginError("Unable to connect to server.");
      }
    }
  };

  return (
    <div className="login-form-container" style={formStyle}>
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
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </form>
    </div>
  );
}

const formStyle = {
  position: "fixed",
  width: "250px",
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

export default LoginForm;
