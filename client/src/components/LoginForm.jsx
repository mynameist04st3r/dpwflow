import axios from "axios";

function LoginForm({
  username,
  password,
  setUsername,
  setPassword,
  setLoginForm,
  setSignedIn,
  loginError,
  setLoginError,
}) {
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/login`, {
        username,
        password,
      });
      if (res.data.success) {
        setLoginForm(false);
        setSignedIn(true);
        setUsername("");
        setPassword("");
        localStorage.setItem("token", res.data.token);
      } else setLoginError("Login failed");
    } catch (err) {
      console.error(err);
      setLoginError("Login error");
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
        <button type="submit">Login</button>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </form>
    </div>
  );
}

const formStyle = {
  position: "fixed",
  width: "300px",
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
