
import axios from "axios";
import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Home/NavBar";
import { CartProvider } from "react-use-cart";
function SignUp() {
    const [full_name, setFullName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();
    const handelSubmit = async (e) => {
        e.preventDefault();

        // Password validation
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            setMessageType("error");
            return;
        }

        try {
           const response = await axios.post(
             "https://ecommerce-backend-production-6748.up.railway.app/auth/register",
             {
               full_name: full_name,
               email: email,
               password: password,
               confirmPassword: confirmPassword,
             },
          );
          localStorage.setItem("token",response.data.token)
            setMessage("Account created successfully!");
          setMessageType("success");
          navigate("/")

        } catch (error) {
              console.log("ERROR:", error);
              console.log("RESPONSE:", error.response?.data);
            setMessage("Something went wrong. Please try again.");
            setMessageType("error");
        }
    };

  return (
    <CartProvider>
      <div className="auth-container">
        <Navbar />
        <form className="auth-box" onSubmit={handelSubmit}>
          <h2>Create Account</h2>

          <input
            type="text"
            placeholder="Enter your Full name"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">Sign up</button>

          {message && <p className={messageType}>{message}</p>}
        </form>
      </div>
    </CartProvider>
  );
}

export default SignUp;

