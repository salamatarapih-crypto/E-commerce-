import { useContext } from "react";
import { apiValue } from "./Data/AllData";
import Navbar from "./Home/NavBar";
import Hero from "./Home/Hero";
import { CartProvider, useCart } from "react-use-cart";
function App() {
  const data=useContext(apiValue)
  return (
 <CartProvider className="App">
      <Navbar />
      <Hero/>
 </CartProvider>
  );
}

export default App;
