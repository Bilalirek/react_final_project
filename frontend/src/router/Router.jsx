import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPage from "../pages/UserPage";
import HomePage from "../pages/HomePage";
import MenuPage from "../pages/MenuPage";
import CartPage from "../pages/CartPage";
import AboutUsPage from "../pages/AboutUsPage";
import HistoryPage from "../pages/HistoryPage";
import ContactUSPage from "../pages/ContactUsPage";

export default function AppRouter() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/contact" element={<ContactUSPage />} />
        </Routes>
      </div>
    </Router>
  );
}
