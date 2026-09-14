import React, { useState } from "react";
import Navbar from "../Home/NavBar";
import { CartProvider, useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import "./AllCheckout.css";

function Checkout() {
  const { items, cartTotal, totalUniqueItems, emptyCart, isEmpty } = useCart();

  const [payment, setPayment] = useState("cash");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Customer:", formData);
    console.log("Payment:", payment);
    console.log("Products:", items);
    console.log("Total:", cartTotal);

    alert("Order placed successfully!");
  };

  if (isEmpty) {
    return (
      <div className="checkout-empty">
        <h2>Your Cart is Empty</h2>

        <p>You need to add some products before checking out.</p>

        <Link to="/Products" className="checkout-shop-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-title">
          <h2>Checkout</h2>
          <p>Complete your order information</p>
        </div>

        <div className="row g-4">
          {/* LEFT SIDE */}

          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              {/* CUSTOMER INFORMATION */}

              <div className="checkout-card">
                <div className="section-title">
                  <div className="section-number">1</div>

                  <div>
                    <h4>Contact Information</h4>
                    <p>Enter your contact details</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group-custom">
                      <label>Full Name</label>

                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-group-custom">
                      <label>Email Address</label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-group-custom">
                      <label>Phone Number</label>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SHIPPING ADDRESS */}

              <div className="checkout-card">
                <div className="section-title">
                  <div className="section-number">2</div>

                  <div>
                    <h4>Shipping Address</h4>
                    <p>Where should we deliver your order?</p>
                  </div>
                </div>

                <div className="input-group-custom">
                  <label>Address</label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address"
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group-custom">
                      <label>City</label>

                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter your city"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-group-custom">
                      <label>Country</label>

                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Enter your country"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* PAYMENT */}

              <div className="checkout-card">
                <div className="section-title">
                  <div className="section-number">3</div>

                  <div>
                    <h4>Payment Method</h4>
                    <p>Choose your preferred payment method</p>
                  </div>
                </div>

                <div className="payment-options">
                  <label
                    className={
                      payment === "cash"
                        ? "payment-option active"
                        : "payment-option"
                    }
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={payment === "cash"}
                      onChange={(e) => setPayment(e.target.value)}
                    />

                    <div className="payment-icon">💵</div>

                    <div>
                      <strong>Cash on Delivery</strong>
                      <p>Pay when your order arrives</p>
                    </div>
                  </label>

                  <label
                    className={
                      payment === "card"
                        ? "payment-option active"
                        : "payment-option"
                    }
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={payment === "card"}
                      onChange={(e) => setPayment(e.target.value)}
                    />

                    <div className="payment-icon">💳</div>

                    <div>
                      <strong>Credit / Debit Card</strong>
                      <p>Pay securely with your card</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* SUBMIT */}

              <button type="submit" className="place-order-btn">
                🔒 Place Order
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}

          <div className="col-lg-4">
            <div className="checkout-summary">
              <h3>Order Summary</h3>

              <p className="summary-items">
                {totalUniqueItems} {totalUniqueItems === 1 ? "item" : "items"}
              </p>

              {/* PRODUCTS */}

              <div className="checkout-products">
                {items.map((item) => (
                  <div className="checkout-product" key={item.id}>
                    <div className="checkout-product-image">
                      <img src={item.images?.[0]?.url} alt={item.name} />

                      <span>{item.quantity}</span>
                    </div>

                    <div className="checkout-product-info">
                      <h5>{item.name}</h5>

                      <p>
                        {item.quantity} × {item.finalPrice.toLocaleString()}$
                      </p>
                    </div>

                    <strong>
                      {(item.finalPrice * item.quantity).toLocaleString()}$
                    </strong>
                  </div>
                ))}
              </div>

              <hr />

              <div className="summary-line">
                <span>Subtotal</span>

                <strong>
                  {items
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0,
                    )
                    .toLocaleString()}
                  $
                </strong>
              </div>

              <div className="summary-line">
                <span>Discount</span>

                <strong className="summary-discount">
                  -
                  {items
                    .reduce(
                      (total, item) =>
                        total + (item.price - item.finalPrice) * item.quantity,
                      0,
                    )
                    .toLocaleString()}
                  $
                </strong>
              </div>

              <div className="summary-line">
                <span>Shipping</span>

                <strong className="free">Free</strong>
              </div>

              <hr />

              <div className="summary-total">
                <span>Total</span>

                <strong>
                  {items
                    .reduce(
                      (total, item) => total + item.finalPrice * item.quantity,
                      0,
                    )
                    .toLocaleString()}
                  $
                </strong>
              </div>

              <div className="secure-message">
                🔒 Secure and encrypted payment
              </div>
            </div>

            <Link to="/Cart" className="back-cart">
              ← Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function AllCheckout() {
  return (
    <CartProvider>
      <Navbar />

      <div className="checkout-space"></div>

      <Checkout />
    </CartProvider>
  );
}

export default AllCheckout;
