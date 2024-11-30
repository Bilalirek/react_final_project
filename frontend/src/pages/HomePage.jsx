import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MainSection from "../components/MainSection";
import Footer from "../components/Footer";
import { useState } from "react";

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);
  const customerId = localStorage.getItem("customerId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!customerId) {
      // If there's no customerId in localStorage(not logged in), redirect to login page
      navigate("/");
    }
  }, [customerId, navigate]);

  return (
    <div>
      <Header cartCount={cartCount} setCartCount={setCartCount} />
      <MainSection />
      <Footer />
    </div>
  );
}
