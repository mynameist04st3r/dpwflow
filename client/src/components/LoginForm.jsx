import { useRef, useEffect, useState } from "react";
import "../styles/FormModal.css";

function LoginForm({ setLoginForm, setSignedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [minimized, setMinimized] = useState(false);

  const formRef = useRef(null);

  // Close if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setMinimized(true); // instead of closing
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    // ... axios login logic
  };

  return (
    <div
      className={`form-modal login-form-container ${
        minimized ? "minimized" : ""
      }`}
      ref={formRef}
    >
      <button className="close-button" onClick={() => setLoginForm(false)}>
        X
      </button>

      {minimized ? (
        <button onClick={() => setMinimized(false)}>🔽 Expand</button>
      ) : (
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
      )}
    </div>
  );
}

export default LoginForm;
