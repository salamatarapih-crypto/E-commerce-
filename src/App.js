
import Navbar from "./Home/NavBar";
import Hero from "./Home/Hero";
import { CartProvider } from "react-use-cart";
function App() {

  return (
 <CartProvider className="App">
      <Navbar />
      <br></br>
      <br></br>
      <br></br>
      <Hero/>
 </CartProvider>
  );
}

export default App;
