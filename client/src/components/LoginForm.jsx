import { useRef, useEffect, useState } from "react";
import axios from "axios";
import "../styles/FormModal.css";

function LoginForm({ setLoginForm, setSignedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const formRef = useRef(null);

  // Close form if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setLoginForm(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/auth/login", {
        username,
        password,
      });
      console.log("Login response:", res.data);
      if (res.data.success) {
        setLoginForm(false);
        setSignedIn(true);
        setUsername("");
        setPassword("");
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
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
    <div className="form-modal login-form-container" ref={formRef}>
      <div className="form-top-buttons">
        <button className="close-button" onClick={() => setLoginForm(false)}>
          X
        </button>
      </div>

      <form onSubmit={handleLogin}>
        <h2 className="form-title">Login</h2>
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
        {loginError && <p className="error-text">{loginError}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
