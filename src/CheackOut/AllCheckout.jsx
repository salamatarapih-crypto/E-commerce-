import React, { useEffect, useState } from "react";
import Navbar from "../Home/NavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllCheckout.css";

const backend = "https://ecommerce-backend-production-6748.up.railway.app";

const SHIPPING_COST = 5;
const TAX_RATE = 0.1;

const optimizeImage = (url) => {
  if (!url) return "";

  return url.replace("/upload/", "/upload/w_500,h_500,c_fill,q_auto,f_auto/");
};

function AllCheckout() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [payment, setPayment] = useState("cash_on_delivery");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getCart = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`${backend}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("GET CART:", response.data);

        setItems(response.data.cart?.items || []);
      } catch (error) {
        console.error("GET CART ERROR:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    getCart();
  }, [navigate, token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);

  const shippingCost = SHIPPING_COST;

  const tax = Number((subtotal * TAX_RATE).toFixed(2));

  const total = Number((subtotal + shippingCost + tax).toFixed(2));

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setPlacingOrder(true);

      const orderData = {
        shippingInfo: {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        },
        paymentMethod: payment,
      };

      console.log("ORDER DATA:", orderData);

      const response = await axios.post(`${backend}/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("ORDER RESPONSE:", response.data);

      navigate("/Products");
    } catch (error) {
      console.error("CREATE ORDER ERROR:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        navigate("/login");
        return;
      }

      console.log(
        "Order error:",
        error.response?.data?.message ||
          "Something went wrong while placing the order",
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="text-center" style={{ paddingTop: "150px" }}>
          <h4>Loading Checkout...</h4>
        </div>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />

        <div className="checkout-empty">
          <h2>Your Cart is Empty</h2>

          <p>You need to add some products before checking out.</p>

          <Link to="/Products" className="checkout-shop-btn">
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="checkout-space"></div>

      <div className="checkout-page">
        <div className="container">
          <div className="checkout-title">
            <h2>Checkout</h2>

            <p>Complete your order information</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-8">
              <form onSubmit={handleSubmit}>
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
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          autoComplete="name"
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
                          autoComplete="email"
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
                          autoComplete="tel"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

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
                      autoComplete="street-address"
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
                          autoComplete="address-level2"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="input-group-custom">
                        <label>Postal Code</label>

                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          placeholder="Enter postal code"
                          autoComplete="postal-code"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

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
                        payment === "cash_on_delivery"
                          ? "payment-option active"
                          : "payment-option"
                      }
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="cash_on_delivery"
                        checked={payment === "cash_on_delivery"}
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

                <button
                  type="submit"
                  className="place-order-btn"
                  disabled={placingOrder}
                >
                  {placingOrder ? "Placing Order..." : "🔒 Place Order"}
                </button>
              </form>
            </div>

            <div className="col-lg-4">
              <div className="checkout-summary">
                <h3>Order Summary</h3>

                <p className="summary-items">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>

                <div className="checkout-products">
                  {items.map((item) => {
                    const product = item.product;

                    const itemFinalPrice = item.lineTotal / item.quantity;

                    return (
                      <div className="checkout-product" key={product._id}>
                        <div className="checkout-product-image">
                          <img
                            src={optimizeImage(product.images?.[0]?.url)}
                            alt={product.name}
                          />

                          <span>{item.quantity}</span>
                        </div>

                        <div className="checkout-product-info">
                          <h5>{product.name}</h5>

                          <p>
                            {item.quantity} × {itemFinalPrice.toLocaleString()}$
                          </p>
                        </div>

                        <strong>{item.lineTotal.toLocaleString()}$</strong>
                      </div>
                    );
                  })}
                </div>

                <hr />

                <div className="summary-line">
                  <span>Subtotal</span>

                  <strong>{subtotal.toLocaleString()}$</strong>
                </div>

                <div className="summary-line">
                  <span>Shipping</span>

                  <strong>{shippingCost}$</strong>
                </div>

                <div className="summary-line">
                  <span>Tax</span>

                  <strong>{tax.toLocaleString()}$</strong>
                </div>

                <hr />

                <div className="summary-total">
                  <span>Total</span>

                  <strong>{total.toLocaleString()}$</strong>
                </div>

                <div className="secure-message">
                  🔒 Secure and encrypted payment
                </div>
              </div>

              <Link to="/AllCart" className="back-cart">
                ← Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllCheckout;
