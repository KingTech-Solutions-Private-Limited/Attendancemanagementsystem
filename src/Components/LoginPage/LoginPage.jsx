import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import loginImage from "../../Images/Login.jpeg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "AMS@gmail.com" && password === "AMS") {
      navigate("/Home");
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">
      <header className="header">
        <h1 className="title">Attendance Management System</h1>
      </header>
      <div className="left-section">
        <img src={loginImage} alt="Login" className="login-image" />
      </div>
      <div className="right-section">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
