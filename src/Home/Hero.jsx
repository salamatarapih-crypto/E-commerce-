
import React from "react";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="py-5 mt-5">
      <div className="container">
        <div className="row align-items-center bg-light rounded-4 p-4 p-md-5 shadow-sm">
          <div className="col-md-6">
            <span className="badge bg-dark mb-3 px-3 py-2">New Collection</span>

            <h1 className="display-4 fw-bold mb-3">
              Discover Products
              <br />
              You'll Love
            </h1>

            <p className="lead text-secondary mb-4">
              Explore our latest collection of quality products, carefully
              selected to make your everyday life easier and better.
            </p>

            <p className="text-muted mb-4">
              ✨ Great quality &nbsp; • &nbsp; 🚚 Fast delivery &nbsp; • &nbsp;
              🔒 Secure shopping
            </p>

            <Link to="/products" className="btn btn-dark btn-lg px-4 me-2">
              Shop Now
            </Link>

            <Link to="/products" className="btn btn-outline-dark btn-lg px-4">
              Explore Products
            </Link>
          </div>

         
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="bg-white rounded-4 p-3 shadow-sm">
              <img
                src="/img/0160c564-d3e2-4027-b7aa-39d700b11148.jpe"
                className="img-fluid rounded-3"
                alt="Zentro products"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
;
