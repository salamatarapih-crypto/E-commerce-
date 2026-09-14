import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Products from "./Products/Products";
import CategoryProducts from "./Products/CategoryProducts";
import LogIn from "./Log/LogIn";
import SignUp from "./Log/SignUp";
import AllWishList from "./WishList/AllWishList";
import AllCart from "./Cart/AllCart";
import AllCheckout from "./CheackOut/AllCheckout";
import About from "./About/About";
import ContactUs from "./Contact/ContactUs";
import { CartProvider } from "react-use-cart";

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:slug",
    element: <CategoryProducts />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/AllCart",
    element: <AllCart />,
  },
  {
    path: "/wishList",
    element: <AllWishList />,
  },
  {
    path: "/checkout",
    element: <AllCheckout />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element:<ContactUs/>
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <ScrollToTop smooth />
    <RouterProvider router={router} />
  </CartProvider>,
);
