import Header from "../components/Header";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import { useState } from "react";

export default function ContactUSPage() {
  const [cartCount, setCartCount] = useState(0);
  return (
    <div>
      <Header cartCount={cartCount} setCartCount={setCartCount} />
      <ContactUs />
      <Footer />
    </div>
  );
}
