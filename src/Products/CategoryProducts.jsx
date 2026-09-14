import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Navbar from "../Home/NavBar";
import { CartProvider, useCart } from "react-use-cart";
import "./CategoryProducts.css";

const optimizeImage = (url) => {
  if (!url) return "";

  return url.replace("/upload/", "/upload/w_500,h_500,c_fill,q_auto,f_auto/");
};

function Page() {
  const [product, setProduct] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const { slug } = useParams();
  const { addItem } = useCart();

  // Get wishlist from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  }, []);

  // Get products
  useEffect(() => {
    const url = `https://ecommerce-backend-production-6748.up.railway.app/products?category=${encodeURIComponent(
      slug,
    )}`;

    axios
      .get(url)
      .then((response) => {
        console.log("SLUG:", slug);
        console.log("CATEGORY PRODUCTS RESPONSE:", response.data);

        setProduct(response.data.products || []);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }, [slug]);

  // Add / Remove Wishlist
  const toggleWishlist = (item) => {
    const alreadyExists = wishlist.some((product) => product._id === item._id);

    let newWishlist;

    if (alreadyExists) {
      newWishlist = wishlist.filter((product) => product._id !== item._id);
    } else {
      newWishlist = [...wishlist, item];
    }

    setWishlist(newWishlist);

    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  // Check if product is in wishlist
  const isInWishlist = (id) => {
    return wishlist.some((product) => product._id === id);
  };

  return (
    <div className="container py-4">
      <div className="row">
        {product.length > 0 ? (
          product.map((item) => (
            <div className="col-12 col-sm-6 col-lg-4 mb-4" key={item._id}>
              <div className="card h-100 shadow-sm border-0 position-relative">
                {/* Wishlist Button */}
                <button
                  className={`wishlist-btn ${
                    isInWishlist(item._id) ? "active" : ""
                  }`}
                  onClick={() => toggleWishlist(item)}
                  title="Add to Wishlist"
                >
                  <FaHeart />
                </button>

                <div className="card-body d-flex flex-column text-center">
                  <img
                    src={optimizeImage(item.images?.[0]?.url)}
                    alt={item.name}
                    loading="lazy"
                    className="img-fluid mb-3 rounded product-image"
                  />

                  <h2 className="product-title">{item.name}</h2>

                  <p className="text-muted flex-grow-1 product-description">
                    {item.description}
                  </p>

                  <h5 className="text-danger">Discount: {item.discount}%</h5>

                  <h4 className="text-success mb-3">Price: {item.price}$</h4>

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
          <p className="text-center mt-5">جاري التحميل....</p>
        )}
      </div>
    </div>
  );
}

function CategoryProducts() {
  return (
    <CartProvider>
      <Navbar />

      <div className="category-page-space"></div>

      <Page />
    </CartProvider>
  );
}

export default CategoryProducts;
