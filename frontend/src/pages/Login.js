import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { apiRequest, setAuth } from "../utils/api";
import logo from "../assets/sanjeevani.jpeg";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    try {
      const data = await apiRequest("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      // backend returns { token, email, role, mobile }
      setAuth({
        token: data.token,
        user: {
          email: data.email,
          role: data.role,
          mobile: data.mobile,
        },
      });

      if (data.role === "admin") navigate("/admin-dashboard");
      else if (data.role === "receiver") navigate("/receiver-dashboard");
      else navigate("/donor-dashboard");
    } catch (err) {
      setError(err?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img
          className="logo"
          // src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
          src={logo}
          alt="Food Value Platform"
        />

        <h2>Food Value Platform</h2>
        <p className="subtitle">Smart Shelf-Life & Food Sharing</p>

        {error && <p className="auth-error">{error}</p>}

        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <button className="submit-btn" onClick={handleLogin}>
          LOGIN TO YOUR ACCOUNT
        </button>

        <p className="auth-switch-text">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="auth-link-button"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;