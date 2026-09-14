import React from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Navbar from "../Home/NavBar";
import "./ContactUs.css";

function ContactUs() {
  return (
    <div>
      <Navbar />

      <section className="contact-section">
        <div className="container">
          {/* Header */}
          <div className="contact-header">
            <span>GET IN TOUCH</span>

            <h1>
              Contact <b>Us</b>
            </h1>

            <p>
              We're two passionate developers who built this project together.
              <br />
              Feel free to reach out to us on any platform below.
            </p>

            <div className="header-line"></div>
          </div>

          {/* Developers */}
          <div className="row justify-content-center g-4">
            {/* Ahmed */}
            <div className="col-md-6">
              <div className="developer-card">
                <div className="developer-top">
                  <div className="developer-image">
                    <img
                      src="/img/WhatsApp Image 2026-09-14 at 11.22.33 PM.jpeg"
                      alt="Backend Developer"
                    />
                  </div>

                  <div className="developer-title">
                    <h2>Ahmed Elhabet</h2>
                    <span className="developer-role">Backend Developer</span>
                  </div>
                </div>

                <p className="developer-description">
                  I'm Ahmed, a backend developer. I work on building robust APIs
                  and server-side applications using Node.js, Express, and
                  NestJS, with hands-on experience in MongoDB and MySQL.
                </p>

                <div className="card-line"></div>

                <div className="contact-links">
                  <a
                    href="https://github.com/ahmedelhabet900/Social-app"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub />
                    <div>
                      <strong>GitHub</strong>
                      <small>View Profile →</small>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/ahmed-elhabet"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedin />
                    <div>
                      <strong>LinkedIn</strong>
                      <small>View Profile →</small>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/201061396904"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaWhatsapp />
                    <div>
                      <strong>WhatsApp</strong>
                      <small>Chat Now →</small>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Salama */}
            <div className="col-md-6">
              <div className="developer-card">
                <div className="developer-top">
                  <div className="developer-image salama-image">
                    <img
                      src="/img/WhatsApp Image 2026-09-14 at 11.36.21 PM.jpeg"
                      alt="Frontend Developer"
                    />
                  </div>

                  <div className="developer-title">
                    <h2>Salama Mohamed</h2>
                    <span className="developer-role frontend-role">
                      Frontend Developer
                    </span>
                  </div>
                </div>

                <p className="developer-description">
                  I'm Salama, a frontend developer. I focus on building modern
                  and responsive user interfaces using React, and I love turning
                  ideas into smooth and interactive web experiences.
                </p>

                <div className="card-line"></div>

                <div className="contact-links">
                  <a
                    href="https://github.com/salamatarapih-crypto"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub />
                    <div>
                      <strong>GitHub</strong>
                      <small>View Profile →</small>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/salama-mohamed-457a36364"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedin />
                    <div>
                      <strong>LinkedIn</strong>
                      <small>View Profile →</small>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/201061549979"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaWhatsapp />
                    <div>
                      <strong>WhatsApp</strong>
                      <small>Chat Now →</small>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bottom-contact">
            <div className="bottom-icon">
              <FaGithub />
            </div>

            <div>
              <span>OUR PROJECT</span>
              <h3>Better Code, Together</h3>
              <p>Built with passion, teamwork, and modern web technologies.</p>
            </div>

            <div className="bottom-badge">
              <span>VOLTRIX</span>
              <small>Development Team</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
