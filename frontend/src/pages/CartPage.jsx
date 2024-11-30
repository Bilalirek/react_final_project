import Header from "../components/Header";
import CartMainSection from "../components/CartMainSection";
import Footer from "../components/Footer";
import { useState } from "react";
export default function CartPage() {
  const [cartCount, setCartCount] = useState(0);
  return (
    <div>
      <Header cartCount={cartCount} setCartCount={setCartCount} />
      <CartMainSection cartCount={cartCount} setCartCount={setCartCount} />
      <Footer />
    </div>
  );
}
