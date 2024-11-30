import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoToTopButton from "../components/GoToTopButton";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const customerId = localStorage.getItem("customerId"); // Get customerId from localStorage
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (customerId) {
      // Fetch purchase history using the fetch API with POST method
      fetch("http://localhost:3000/user/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Content type is JSON
        },
        body: JSON.stringify({ customerId }), // Send customerId in the request body
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setHistory(data.history); // Store the history data in the state
          } else {
            setError(
              "You haven't made any purchases yet. Start exploring our products!"
            );
          }
        })
        .catch((err) => {
          setError("Error fetching purchase history.");
          console.error(err);
        })
        .finally(() => setLoading(false));
    } else {
      setError("No customer ID found.");
      setLoading(false);
    }
  }, [customerId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="alert alert-info">{error}</div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-secondary p-2 m-4 text-center"
            onClick={() => navigate("/menu")}
          >
            Go to Menu
          </button>
        </div>
      </div>
    );
  }

  // Group products by OrderID
  const groupedHistory = history.reduce((acc, order) => {
    // If the OrderID is not already in the accumulator, create a new group for it
    if (!acc[order.OrderID]) {
      acc[order.OrderID] = {
        ...order,
        products: [],
      };
    }
    // Add the product to the order's products array
    acc[order.OrderID].products.push(order);
    return acc;
  }, {});

  return (
    <div className="container">
      <h2 className="text-primary mt-4">Purchase History</h2>
      {Object.keys(groupedHistory).length === 0 ? (
        <p>No purchase history found.</p>
      ) : (
        Object.values(groupedHistory).map((order) => (
          <div key={order.OrderID} className="list-group-item">
            <h5>Order ID: {order.OrderID}</h5>
            <p>Order Date: {new Date(order.OrderDate).toLocaleDateString()}</p>
            <p>Total Amount: ${order.TotalAmount}</p>

            <div className="list-group">
              {order.products.map((product, index) => (
                <div key={index} className="list-group-item">
                  <div className="row">
                    <div className="col-md-2">
                      <img
                        src={product.ImageLink}
                        alt={product.ProductName}
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-md-10">
                      <h6>{product.ProductName}</h6>
                      <p>Quantity: {product.Quantity}</p>
                      <p>Price: ${product.Price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <GoToTopButton />
          </div>
        ))
      )}
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-secondary p-2 m-4 text-center"
          onClick={handleClick}
        >
          Return to Home Page
        </button>
      </div>
    </div>
  );
}
