import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function MenuPage() {
  const [cartCount, setCartCount] = useState(0);
  const customerId = localStorage.getItem("customerId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!customerId) {
      // If there's no customerId in localStorage (not logged in) , redirect to login page
      navigate("/");
    }
  }, [customerId, navigate]);

  return (
    <div>
      <Header cartCount={cartCount} setCartCount={setCartCount} />
      <Menu cartCount={cartCount} setCartCount={setCartCount} />
      <Footer />
    </div>
  );
}
