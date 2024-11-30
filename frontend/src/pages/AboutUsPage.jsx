import Header from "../components/Header";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import { useState } from "react";
export default function AboutUsPage() {
  const [cartCount, setCartCount] = useState(0);
  return (
    <div>
      <Header cartCount={cartCount} setCartCount={setCartCount} />
      <AboutUs />
      <Footer />
    </div>
  );
}
