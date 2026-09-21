
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import Navbar from "../Home/NavBar";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://ecommerce-backend-production-6748.up.railway.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (response.ok) {
        localStorage.setItem("token", data.access_token);

        if (data.refreshToken) {
          localStorage.setItem(
            "refreshToken",
            data.refreshToken
          );
        }

        navigate("/");
      } else {
        setMessage(data.message || "Login failed");
        setMessageType("error");
      }
    } catch (error) {
      console.log(error);

      setMessage("Server Error. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div className="auth-container">
      <Navbar />

      <form className="auth-box" onSubmit={handelSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />

        <input
          type="password"
          placeholder="Enter Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button type="submit">Login</button>

        {message && (
          <p className={messageType}>{message}</p>
        )}

        <p>
          Don't have an account?{" "}
          <Link to="/signup">Create Account</Link>
        </p>
      </form>
    </div>
  );
}

export default LogIn;
