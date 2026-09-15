
import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      style={{
        height: "100vh",
        overflow: "hidden",
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(255,255,255,1) 0%,
            rgba(255,255,255,0.98) 32%,
            rgba(255,255,255,0.75) 55%,
            rgba(255,255,255,0.08) 100%
          ),
          url("/img/0160c564-d3e2-4027-b7aa-39d700b11148.jpe")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-7">

            <div className="mb-4">
              <span
                className="d-inline-block px-3 py-2 rounded-pill border border-dark text-dark"
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  letterSpacing: "1.5px",
                }}
              >
                NEW COLLECTION
              </span>
            </div>

            <h1
              className="fw-bold text-dark mb-4"
              style={{
                fontSize: "clamp(46px, 6vw, 78px)",
                lineHeight: "0.98",
                letterSpacing: "-3px",
              }}
            >
              Technology
              <br />
              <span className="text-secondary">
                Made Simple.
              </span>
            </h1>

            <p
              className="text-secondary mb-4"
              style={{
                maxWidth: "520px",
                fontSize: "17px",
                lineHeight: "1.7",
              }}
            >
              Discover smart technology, modern electronics and everyday
              essentials designed to fit your lifestyle.
            </p>

            <div className="d-flex flex-wrap gap-3 mb-5">
              <Link
                to="/products"
                className="btn btn-dark rounded-pill px-4 py-3"
              >
                Shop Now →
              </Link>

              <Link
                to="/categories"
                className="btn btn-outline-dark rounded-pill px-4 py-3"
              >
                Browse Categories
              </Link>
            </div>

            <div className="d-flex align-items-center gap-4">
              <div>
                <h5 className="fw-bold mb-0">100+</h5>
                <small className="text-secondary">Products</small>
              </div>

              <div
                style={{
                  width: "1px",
                  height: "35px",
                  backgroundColor: "#ccc",
                }}
              />

              <div>
                <h5 className="fw-bold mb-0">Fast</h5>
                <small className="text-secondary">Delivery</small>
              </div>

              <div
                style={{
                  width: "1px",
                  height: "35px",
                  backgroundColor: "#ccc",
                }}
              />

              <div>
                <h5 className="fw-bold mb-0">Secure</h5>
                <small className="text-secondary">Shopping</small>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

