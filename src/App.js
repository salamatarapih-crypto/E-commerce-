
import Navbar from "./Home/NavBar";
import Hero from "./Home/Hero";
import { CartProvider } from "react-use-cart";
function App() {

  return (
 <CartProvider className="App">
      <Navbar />
  
      <Hero/>
 </CartProvider>
  );
}

export default App;
