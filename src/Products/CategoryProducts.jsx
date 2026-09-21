import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Navbar from "../Home/NavBar";
import "./CategoryProducts.css";

const backend = "https://ecommerce-backend-production-6748.up.railway.app";

const optimizeImage = (url) => {
  if (!url) return "";

  return url.replace("/upload/", "/upload/w_500,h_500,c_fill,q_auto,f_auto/");
};

function Page() {
  const [product, setProduct] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const { slug } = useParams();

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  }, []);

  useEffect(() => {
    const url = `${backend}/products?category=${encodeURIComponent(slug)}`;

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

  const addToCart = async (item) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Please login first");
      return;
    }

    try {
      const response = await axios.post(
        `${backend}/cart`,
        {
          productId: item._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("ADD TO CART:", response.data);
    } catch (error) {
      console.log("ADD TO CART ERROR:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        console.log("Session expired. Please login again.");
        return;
      }

      console.log(error.response?.data?.message || "Something went wrong");
    }
  };

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
                    onClick={() => addToCart(item)}
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
    <>
      <Navbar />

      <div className="category-page-space"></div>

      <Page />
    </>
  );
}

export default CategoryProducts;
