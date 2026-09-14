import React from "react";
import Navbar from "../Home/NavBar";
import { CartProvider, useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import "./Cart.css";

const optimizeImage = (url) => {
  if (!url) return "";

  return url.replace(
    "/upload/",
    "/upload/w_500,h_500,c_fill,q_auto,f_auto/"
  );
};

function Cart() {
  const {
    items,
    updateItemQuantity,
    removeItem,
    totalUniqueItems,
    emptyCart,
    isEmpty,
  } = useCart();

  if (isEmpty) {
    return (
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
    );
  }

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = items.reduce(
    (total, item) => total + item.finalPrice * item.quantity,
    0
  );

  const discountAmount = subtotal - total;

  return (
    <div className="cart-page">
      <div className="container">
        <div className="row g-4">

          {/* LEFT SIDE */}
          <div className="col-lg-8">

            <div className="cart-header">

              <div className="cart-heading">

                <div className="cart-icon">
                  🛒
                </div>

                <div>
                  <h2>Your Cart</h2>

                  <p>
                    You have {totalUniqueItems}{" "}
                    {totalUniqueItems === 1 ? "item" : "items"} in your cart
                  </p>
                </div>

              </div>

              <button
                className="clear-cart"
                onClick={() => emptyCart()}
              >
                🗑 Clear Cart
              </button>

            </div>

            {/* PRODUCTS */}

            {items.map((item) => {
              return (
                <div className="cart-item" key={item.id}>

                  {/* IMAGE */}

                  <div className="cart-image-box">

                    <img
                      loading="lazy"
                      className="cart-image"
                      src={optimizeImage(item.images?.[0]?.url)}
                      alt={item.name}
                    />

                  </div>

                  {/* PRODUCT INFO */}

                  <div className="cart-product-info">

                    <h4>{item.name}</h4>

                    <p className="product-description">
                      {item.description}
                    </p>

                    <div className="price-row">

                      <span className="final-price">
                        {item.finalPrice.toLocaleString()}$
                      </span>

                      {item.discount > 0 && (
                        <>
                          <span className="old-price">
                            {item.price.toLocaleString()}$
                          </span>

                          <span className="discount">
                            {item.discount}% OFF
                          </span>
                        </>
                      )}

                    </div>

                  </div>

                  {/* QUANTITY */}

                  <div className="quantity-box">

                    <button
                      onClick={() =>
                        updateItemQuantity(
                          item.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateItemQuantity(
                          item.id,
                          Math.min(item.stock, item.quantity + 1)
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  {/* DELETE */}

                  <button
                    className="remove-item"
                    onClick={() => removeItem(item.id)}
                  >
                    🗑
                  </button>

                </div>
              );
            })}

            <Link
              to="/Products"
              className="continue-shopping"
            >
              ← Continue Shopping
            </Link>

          </div>

          {/* RIGHT SIDE */}

          <div className="col-lg-4">

            <div className="order-summary">

              {/* COUPON */}

              <div className="coupon">

                <div className="coupon-icon">
                  %
                </div>

                <div>
                  <h6>Use code HEALTH10</h6>
                  <p>Get 10% off on your first order</p>
                </div>

                <span>›</span>

              </div>

              <h3>Order Summary</h3>

              <div className="summary-row">

                <span>
                  Subtotal ({totalUniqueItems} items)
                </span>

                <strong>
                  {subtotal.toLocaleString()}$
                </strong>

              </div>

              <div className="summary-row discount-row">

                <span>Discount</span>

                <strong>
                  - {discountAmount.toLocaleString()}$
                </strong>

              </div>

              <div className="summary-row">

                <span>Shipping</span>

                <strong>Free</strong>

              </div>

              <hr />

              <div className="total-row">

                <span>Total</span>

                <strong>
                  {total.toLocaleString()}$
                </strong>

              </div>

              <Link
                to="/checkout"
                className="checkout-btn"
              >
                🔒 Proceed to Checkout →
              </Link>

              <p className="secure">
                🛡 Your information is safe and secure
              </p>

              <div className="benefits">

                <div>
                  🚚
                  <strong>Free Shipping</strong>
                  <small>On orders over $50</small>
                </div>

                <div>
                  🛡
                  <strong>Secure Payment</strong>
                  <small>100% protected</small>
                </div>

                <div>
                  ↻
                  <strong>Easy Returns</strong>
                  <small>Within 14 days</small>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

function AllCart() {
  return (
    <CartProvider>

      <Navbar />
<br/>
<br/>
<br/>
<br/>
      <div className="cart-space"></div>

      <Cart />

    </CartProvider>
  );
}

export default AllCart;