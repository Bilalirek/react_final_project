import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartMainSection({ cartCount, setCartCount }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false); // State to track checkout progress
  const customerId = localStorage.getItem("customerId");
  const navigate = useNavigate(); // initialize the navigate function

  useEffect(() => {
    if (customerId) {
      loadCart(customerId);
    }
  }, [customerId]);

  const loadCart = async (customerId) => {
    try {
      const response = await fetch(
        "http://localhost:3000/cart/get-user-carts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customerId }),
        }
      );
      const data = await response.json();
      setCartItems(data.carts);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const removeItem = async (cartId) => {
    try {
      await fetch("http://localhost:3000/cart/remove-from-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Cart: cartId }),
      });

      // Reload the cart after removal
      loadCart(customerId);
      setCartCount(cartCount - 1);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleCheckout = async () => {
    if (!customerId) {
      alert("You need to log in to checkout.");
      return;
    }

    setLoading(true); // Show the spinner while the checkout is in progress

    try {
      const response = await fetch("http://localhost:3000/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId }),
      });

      const data = await response.json();
      if (data.success) {
        alert(
          "Your checkout was successful! A copy of your invoice has been sent to your email."
        );
        navigate("/home"); // Redirect to the home page after checkout
      } else {
        alert("Checkout failed: " + data.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout.");
    } finally {
      setLoading(false); // Hide the spinner when checkout completes
    }
  };

  // Calculate total price of all items in the cart
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.attachedProduct.Price * item.Quantity;
  }, 0);

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <h2 className="my-4">Your Cart</h2>

      {/* Cart items */}
      {cartItems.length > 0 ? (
        <div className="row">
          {cartItems.map((item) => (
            <div key={item.CartDetailID} className="col-md-4 mb-4">
              <div className="card" style={{ height: "auto" }}>
                <img
                  src={item.attachedProduct.ImageLink}
                  alt={item.attachedProduct.ProductName}
                  className="card-img-top"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover", // Maintain aspect ratio and fill the square
                    margin: "0 auto",
                    display: "block",
                    padding: "10px",
                  }}
                />
                <div className="card-body" style={{ paddingBottom: "1rem" }}>
                  <h5 className="card-title">
                    {item.attachedProduct.ProductName}
                  </h5>
                  <p className="card-text">
                    Quantity: <strong>{item.Quantity}</strong>
                  </p>
                  <p className="card-text">
                    Total Price: $
                    {(item.attachedProduct.Price * item.Quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.CartDetailID)}
                    className="btn btn-danger"
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info" role="alert">
          Your cart is empty.
        </div>
      )}

      {/* Total price */}
      {cartItems.length > 0 && (
        <div className="d-flex justify-content-between align-items-center my-4">
          <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
        </div>
      )}

      {/* Spinner (only shows when loading is true) */}
      {loading && (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Checkout Button */}
      <div className="d-flex justify-content-between my-4">
        <button
          onClick={() => navigate("/menu")} // Redirect to home page
          className="btn btn-secondary"
        >
          Return to Menu
        </button>

        {/* Checkout button with conditional disable */}
        <button
          onClick={handleCheckout}
          className="btn btn-primary"
          disabled={cartItems.length === 0 || loading} // Disable if cart is empty or checkout is in progress
        >
          {loading ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
}
