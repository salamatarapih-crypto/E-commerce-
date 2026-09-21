import React, {  useState } from "react";
import Navbar from "../Home/NavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css";

const backend = "https://ecommerce-backend-production-6748.up.railway.app";

const SHIPPING_COST = 5;
const TAX_RATE = 0.1;

const optimizeImage = (url) => {
  if (!url) return "";

  return url.replace("/upload/", "/upload/w_500,h_500,c_fill,q_auto,f_auto/");
};

function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(`${backend}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("GET CART:", response.data);

      setItems(response.data.cart?.items || []);
    } catch (error) {
      console.error("Get cart error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      }

      setItems([]);
    } finally {
      setLoading(false);
    }
  };

 
  const updateQuantity = async (productId, quantity) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (quantity < 1) {
      return;
    }

    try {
      const response = await axios.put(
        `${backend}/cart`,
        {
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("UPDATE CART:", response.data);

      await getCart();
    } catch (error) {
      console.error("Update cart error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      }
    }
  };

  const removeItem = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.delete(`${backend}/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("REMOVE ITEM:", response.data);

      await getCart();
    } catch (error) {
      console.error("Remove item error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      }
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setItems([]);
      return;
    }

    try {
      const response = await axios.delete(`${backend}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("CLEAR CART:", response.data);

      setItems([]);
    } catch (error) {
      console.error("Clear cart error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      }
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="text-center" style={{ paddingTop: "150px" }}>
          <h4>Loading Cart...</h4>
        </div>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />

        <div className="text-center empty-cart">
          <img
            src="/img/11010851.png"
            style={{ width: "300px" }}
            alt="Empty Cart"
          />

          <h4>Your Cart is empty</h4>

          <Link to="/Products" className="btn btn-dark mt-3">
            Shopping
          </Link>
        </div>
      </>
    );
  }

  const totalUniqueItems = items.length;

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const discountAmount = items.reduce(
    (total, item) =>
      total +
      (item.product.price - item.lineTotal / item.quantity) * item.quantity,
    0,
  );

  const cartSubtotalAfterDiscount = items.reduce(
    (total, item) => total + item.lineTotal,
    0,
  );

  const tax = Number((cartSubtotalAfterDiscount * TAX_RATE).toFixed(2));

  const total = Number(
    (cartSubtotalAfterDiscount + SHIPPING_COST + tax).toFixed(2),
  );

  return (
    <>
      <Navbar />

      <div className="cart-page">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="cart-header">
                <div className="cart-heading">
                  <div className="cart-icon">🛒</div>

                  <div>
                    <h2>Your Cart</h2>

                    <p>
                      You have {totalItems}{" "}
                      {totalItems === 1 ? "item" : "items"} in your cart
                    </p>
                  </div>
                </div>

                <button className="clear-cart" onClick={clearCart}>
                  🗑 Clear Cart
                </button>
              </div>

              {items.map((item) => {
                const product = item.product;

                const finalPrice =
                  product.price - (product.price * product.discount) / 100;

                return (
                  <div className="cart-item" key={product._id}>
                    <div className="cart-image-box">
                      <img
                        loading="lazy"
                        className="cart-image"
                        src={optimizeImage(product.images?.[0]?.url)}
                        alt={product.name}
                      />
                    </div>

                    <div className="cart-product-info">
                      <h4>{product.name}</h4>

                      <div className="price-row">
                        <span className="final-price">
                          {finalPrice.toLocaleString()}$
                        </span>

                        {product.discount > 0 && (
                          <>
                            <span className="old-price">
                              {product.price.toLocaleString()}$
                            </span>

                            <span className="discount">
                              {product.discount}% OFF
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="quantity-box">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(product._id, item.quantity - 1);
                          }
                        }}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => {
                          if (item.quantity < product.stock) {
                            updateQuantity(product._id, item.quantity + 1);
                          }
                        }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-item"
                      onClick={() => removeItem(product._id)}
                    >
                      🗑
                    </button>
                  </div>
                );
              })}

              <Link to="/Products" className="continue-shopping">
                ← Continue Shopping
              </Link>
            </div>

            <div className="col-lg-4">
              <div className="order-summary">
                <div className="coupon">
                  <div className="coupon-icon">%</div>

                  <div>
                    <h6>Use code HEALTH10</h6>

                    <p>Get 10% off on your first order</p>
                  </div>

                  <span>›</span>
                </div>

                <h3>Order Summary</h3>

                <div className="summary-row">
                  <span>Subtotal ({totalUniqueItems} items)</span>

                  <strong>{subtotal.toLocaleString()}$</strong>
                </div>

                <div className="summary-row discount-row">
                  <span>Discount</span>

                  <strong>- {discountAmount.toLocaleString()}$</strong>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>

                  <strong>{SHIPPING_COST}$</strong>
                </div>

                <div className="summary-row">
                  <span>Tax</span>

                  <strong>{tax.toLocaleString()}$</strong>
                </div>

                <hr />

                <div className="total-row">
                  <span>Total</span>

                  <strong>{total.toLocaleString()}$</strong>
                </div>

                <Link to="/checkout" className="checkout-btn">
                  🔒 Proceed to Checkout →
                </Link>

                <p className="secure">🛡 Your information is safe and secure</p>

                <div className="benefits">
                  <div>
                    🚚
                    <strong>Shipping</strong>
                    <small>$5 delivery</small>
                  </div>

                  <div>
                    🛡
                    <strong>Secure Payment</strong>
                    <small>100% protected</small>
                  </div>

                  <div>
                    ↻<strong>Easy Returns</strong>
                    <small>Within 14 days</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
