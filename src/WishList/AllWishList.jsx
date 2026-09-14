import React, { useEffect, useState } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { useCart } from "react-use-cart";
import Navbar from "../Home/NavBar";
import { CartProvider } from "react-use-cart";
import "./AllWishList.css";

const optimizeImage = (url) => {
  if (!url) return "";

  return url.replace(
    "/upload/",
    "/upload/w_500,h_500,c_fill,q_auto,f_auto/"
  );
};

function AllWishList() {
  const [wishlist, setWishlist] = useState([]);
  const { addItem } = useCart();

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const newWishlist = wishlist.filter(
      (item) => item._id !== id
    );

    setWishlist(newWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(newWishlist)
    );
  };

  return (
    <CartProvider>
      <Navbar />

      <div className="container wish">
        <div className="row wishList-banner">
          <div className="col-md-8 wish-content">
            <div className="wislList-icon">
              <FaHeart />
            </div>

            <div>
              <h1>My Wish List</h1>

              <p>
                All your favorite products in one place. Save them for later.
              </p>
            </div>
          </div>

          <div className="col-md-4 wishlist-image">
            <img
              src="/img/ad05106a-4dc3-4d5f-b85e-b913e53eaa55.png"
              alt="Wishlist"
            />
          </div>
        </div>

        <div className="row mt-5">
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <div className="col-12 col-sm-6 col-lg-4 mb-4" key={item._id}>
                <div className="wishlist-card">
                  <div className="wishlist-product-image">
                    <img
                      src={optimizeImage(item.images?.[0]?.url)}
                      alt={item.name}
                    />

                    <button
                      className="remove-wishlist"
                      onClick={() => removeFromWishlist(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="wishlist-product-info">
                    <h3>{item.name}</h3>

                    <p>{item.description}</p>

                    <h4>{item.price}$</h4>

                    <button
                      className="btn btn-dark w-100"
                      onClick={() => addItem(item)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-wishlist">
              <FaHeart />

              <h2>Your Wishlist is Empty</h2>

              <p>You haven't added any products to your wishlist yet.</p>
            </div>
          )}
        </div>
      </div>
    </CartProvider>
  );
}

export default AllWishList;