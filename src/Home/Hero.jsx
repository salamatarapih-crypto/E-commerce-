import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="py-5 mt-5">
      <div className="container">
        <div className="row align-items-center g-4 bg-dark text-white rounded-5 p-4 p-md-5 shadow">
          <div className="col-12 col-lg-6 text-center text-lg-start">
            <span className="badge bg-white text-dark rounded-pill px-3 py-2 mb-3">
              New Collection
            </span>

            <h1 className="display-4 fw-bold mb-3">
              Discover Products
              <br />
              You'll Love
            </h1>

            <p className="lead text-white-50 mb-4">
              Explore our latest collection of quality products, carefully
              selected to make your everyday life easier and better.
            </p>

            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-2 mb-4">
              <span className="small">✨ Great Quality</span>
              <span className="small">🚚 Fast Delivery</span>
              <span className="small">🔒 Secure Shopping</span>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-2">
              <Link
                to="/products"
                className="btn btn-light btn-lg px-4 rounded-pill"
              >
                Shop Now
              </Link>

              <Link
                to="/products"
                className="btn btn-outline-light btn-lg px-4 rounded-pill"
              >
                Explore Products
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="bg-white rounded-4 p-2 shadow">
              <img
                src="/img/0160c564-d3e2-4027-b7aa-39d700b11148.jpe"
                className="img-fluid w-100 rounded-4"
                alt="VOLTRIX products"
                style={{
                  maxHeight: "450px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
