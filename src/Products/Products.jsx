import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Home/NavBar";
import { Link } from "react-router-dom";
import { CartProvider } from "react-use-cart";
function Products() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://ecommerce-backend-production-6748.up.railway.app/categories",
      )
      .then((response) => {
        console.log("RESPONSE:", response);
        console.log("DATA:", response.data);
        setCategory(response.data.categories);
      })
      .catch((error) => {
        console.log("ERROR:", error);
        console.log("ERROR RESPONSE:", error.response);
        console.log("ERROR DATA:", error.response?.data);
      });
  }, []);

  return (
    <CartProvider>
      <Navbar />
      <br />
      <br />
      <br />
      <div className="container mt-5">
        <div className="row mt-5">
          {Array.isArray(category) &&
            category.map((item) => {
              return (
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={item._id}>
                  <div className="card text-center h-100 shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <img
                        src={item.image?.url}
                        alt={item.name}
                        className="img-fluid mb-3 rounded"
                        loading="lazy"
                        style={{
                          height: "180px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                      <h2>{item.name}</h2>
                      <p className="text-muted">{item.slug}</p>
                      <p className="flex-grow-1">{item.description}</p>

                      <Link
                        className="btn btn-dark d-block mt-auto"
                        to={`/products/${item.slug}`}
                      >
                        view products
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </CartProvider>
  );
}

export default Products;
