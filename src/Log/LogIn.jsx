
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import Navbar from "../Home/NavBar";
import { CartProvider } from "react-use-cart";
import {  useNavigate } from "react-router-dom";

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
              },
            );

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);

                setMessage("Login successful!");
              setMessageType("success");
              navigate("/")
            } else {
                setMessage(data.message || "Login failed");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("Server Error. Please try again.");
            setMessageType("error");
        }
    };

    return (
      <CartProvider>
        <div className="auth-container">
          <Navbar />

          <form className="auth-box" onSubmit={handelSubmit}>
            <h2>Login</h2>

            <input
              type="email"
              placeholder="Enter Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>

            {message && <p className={messageType}>{message}</p>}

            <p>
              Don't have an account? <Link to="/signup">Create Account</Link>
            </p>
          </form>
        </div>
      </CartProvider>
    );
}

export default LogIn;

