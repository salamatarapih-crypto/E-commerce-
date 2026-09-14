import React from "react";
import Navbar from "../Home/NavBar";
import "./About.css";

function About() {
  return (
    <div>
      <Navbar />

      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <span>ABOUT VOLTRIX</span>
            <h1>
              Technology Meets
              <br />
              <strong>Modern Shopping.</strong>
            </h1>
            <p>
              VOLTRIX is a modern e-commerce platform built to provide customers
              with a smooth, secure, and enjoyable shopping experience.
            </p>
          </div>
        </div>
      </section>

      <section className="about-intro">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <span className="section-label">WHO WE ARE</span>

              <h2>
                More than just
                <br />
                an online store.
              </h2>

              <p>
                VOLTRIX is designed to make online shopping simple and
                convenient. Users can explore products, browse different
                categories, manage their shopping cart, create an account, and
                securely log in.
              </p>

              <p>
                Our goal is to combine a clean user interface with a powerful
                backend system to create a complete and reliable e-commerce
                experience.
              </p>
            </div>

            <div className="col-md-6">
              <div className="about-card">
                <div className="about-card-icon">⚡</div>
                <h3>Built for the Future</h3>
                <p>
                  A modern architecture designed to be scalable, maintainable,
                  and easy to develop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tech-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-label">OUR TECHNOLOGY</span>
            <h2>Built with modern technologies</h2>
            <p>
              VOLTRIX combines modern frontend and backend technologies to
              deliver a complete e-commerce platform.
            </p>
          </div>

          <div className="row g-4 mt-3">
            <div className="col-md-6">
              <div className="tech-card">
                <div className="tech-title">
                  <span>💻</span>
                  <h3>Frontend</h3>
                </div>

                <ul>
                  <li>React.js</li>
                  <li>React Router</li>
                  <li>Axios & Fetch API</li>
                  <li>Bootstrap</li>
                  <li>Responsive User Interface</li>
                  <li>Context API</li>
                  <li>LocalStorage</li>
                  <li>React Use Cart</li>
                  <li>Cloudinary Image Optimization</li>
                </ul>
              </div>
            </div>

            <div className="col-md-6">
              <div className="tech-card">
                <div className="tech-title">
                  <span>🚀</span>
                  <h3>Backend</h3>
                </div>

                <ul>
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>MongoDB & Mongoose</li>
                  <li>RESTful APIs</li>
                  <li>JWT Authentication & Authorization</li>
                  <li>Validation Middleware</li>
                  <li>Populate for Database Relationships</li>
                  <li>Multer + Cloudinary</li>
                  <li>Password Hashing & Security Tokens</li>
                  <li>Organized & Reusable Architecture</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="security-section">
        <div className="container">
          <div className="security-box">
            <div>
              <span className="section-label">SECURITY</span>
              <h2>Built with security in mind.</h2>

              <p>
                User authentication is handled using JWT. Passwords are securely
                hashed before being stored, while validation middleware helps
                protect requests and maintain reliable application behavior.
              </p>
            </div>

            <div className="security-icon">🔐</div>
          </div>
        </div>
      </section>

      <section className="architecture-section">
        <div className="container text-center">
          <span className="section-label">OUR ARCHITECTURE</span>

          <h2>Frontend + Backend</h2>

          <p className="architecture-text">
            VOLTRIX uses a separated frontend and backend architecture. This
            approach makes the application easier to maintain, develop, and
            scale in the future.
          </p>

          <div className="architecture-flow">
            <div className="flow-card">
              <span>💻</span>
              <h4>React Frontend</h4>
              <p>User Experience</p>
            </div>

            <div className="flow-arrow">→</div>

            <div className="flow-card">
              <span>🔗</span>
              <h4>REST API</h4>
              <p>Communication</p>
            </div>

            <div className="flow-arrow">→</div>

            <div className="flow-card">
              <span>🗄️</span>
              <h4>MongoDB</h4>
              <p>Data Storage</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-footer">
        <div className="container text-center">
          <h2>Built with passion.</h2>
          <p>Powered by modern technology. 🚀</p>
        </div>
      </section>
    </div>
  );
}

export default About;
