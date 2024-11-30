import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/logo.png";
import profilePicture from "../images/profile-account.png";
import cartIcon from "../images/icons8-shopping-cart.png";

export default function Header({ cartCount, setCartCount }) {
  const navigate = useNavigate();

  // Fetch cart count when the component mounts
  useEffect(() => {
    const customerId = localStorage.getItem("customerId");
    if (customerId) {
      fetchCartCount(customerId);
    }
  }, []);

  const fetchCartCount = async (customerId) => {
    try {
      const response = await fetch(
        "http://localhost:3000/cart/get-cart-count",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customerId }),
        }
      );

      const data = await response.json();
      setCartCount(data.cartCount); // Assuming the response contains cartCount
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("customerId");
    navigate("/"); // Redirect to the login page after logout
  };

  const handleUpdateAccount = () => {
    navigate("/", { state: { showForm: "updateaccount" } });
  };

  const handleViewHistory = () => {
    navigate("/history");
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container" style={{ maxWidth: "1200px" }}>
            <Link className="navbar-brand" to="/home">
              <img
                src={logo}
                alt="Logo"
                style={{ width: "180px", height: "auto" }}
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/menu">
                    Menu
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact Us
                  </Link>
                </li>
              </ul>

              <div className="d-flex align-items-center ms-auto me-3">
                <div className="dropdown">
                  <button
                    className="btn btn-link d-flex align-items-center"
                    id="profileDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      border: "none",
                      background: "transparent",
                      marginRight: "20px",
                    }}
                  >
                    <img
                      src={profilePicture}
                      alt="Profile"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                    />
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="profileDropdown"
                    style={{ minWidth: "200px" }}
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleUpdateAccount}
                      >
                        Update Information
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleViewHistory}
                      >
                        View Purchase history
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>

                <Link to="/cart" className="position-relative">
                  <img
                    src={cartIcon}
                    alt="Cart"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{
                      fontSize: "12px",
                      color: "white",
                      padding: "2px 6px",
                    }}
                  >
                    {cartCount}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
