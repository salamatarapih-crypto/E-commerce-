
import React from "react";
import { Link } from "react-router-dom";


function Navbar() {
 
  return (
    <nav
      className="navbar navbar-expand-lg bg-white shadow-sm py-3 "
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 9999,
      }}
    >
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-3" to="/">
          VOLTRIX
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/products">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/wishList">
                ❤ WishList
              </Link>
            </li>
<li className="nav-item">
  <Link className="nav-link px-3" to="/AllCart">
    🛒 Cart{" "}
    <span
      style={{
        position: "relative",
        top: "-2px",
        color: "black",
        fontSize: "15px",
        fontWeight: "bold",
        borderRadius: "50%",
        padding: "2px 6px",
      }}
    >
   
    </span>
  </Link>
</li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/login">
                👤 Login
              </Link>
            </li>
          </ul>

          {/* Search */}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search products..."
              aria-label="Search"
            />

            <button className="btn btn-dark px-3" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
;
