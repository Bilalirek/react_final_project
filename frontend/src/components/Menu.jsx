import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // To access the passed state
import SearchBar from "./SearchBar";
import Categories from "./Categories";
import GoToTopButton from "./GoToTopButton";
import carticon from "../images/cartButtonIcon.png";

export default function Menu({ cartCount, setCartCount }) {
  const location = useLocation();
  const [search, setSearch] = useState(""); // Track search query
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.selectedCategory || ""
  ); // Track selected category
  const [products, setProducts] = useState([]); // Store all fetched products
  const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered products based on search/category
  const [loading, setLoading] = useState(false); // Loading state for products
  const [error, setError] = useState("");
  const [messages, setMessages] = useState({}); // Object to store messages for each product

  // Fetch all products once when the component is mounted
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(""); // Clear previous errors
      try {
        const response = await fetch("http://localhost:3000/products/all");
        const data = await response.json();

        if (data.success) {
          setProducts(data.products); // Store all products in state
          setFilteredProducts(data.products); // Initially set filtered products to all products
        } else {
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products"); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs only once when the component is mounted

  // Update the filtered products based on the search and selected category
  useEffect(() => {
    let filtered = [...products]; // Start with all products

    // Filter by category if selected
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.Category === selectedCategory
      );
    }

    // Filter by search term
    if (search) {
      filtered = filtered.filter((product) =>
        product.ProductName.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    // Update filtered products state
    setFilteredProducts(filtered);
  }, [search, selectedCategory, products]); // Re-run the filter logic whenever search or category changes

  // Function to handle adding product to the cart
  const addToCart = async (ProductID) => {
    const customerId = localStorage.getItem("customerId");

    try {
      const response = await fetch(
        "http://localhost:3000/products/add-to-cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId,
            quantity: 1,
            ProductID,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        // Set success message for the specific product
        setCartCount(cartCount + 1);
        setMessages((prevMessages) => ({
          ...prevMessages,
          [ProductID]: "Product added to cart!",
        }));
        setTimeout(() => {
          setMessages((prevMessages) => ({
            ...prevMessages,
            [ProductID]: "",
          }));
        }, 1000); // Clear the message after 1 second
      } else {
        // Set failure message for the specific product
        setMessages((prevMessages) => ({
          ...prevMessages,
          [ProductID]: "Failed to add product to cart.",
        }));
        setTimeout(() => {
          setMessages((prevMessages) => ({
            ...prevMessages,
            [ProductID]: "",
          }));
        }, 1000); // Clear the message after 1 seconds
      }
    } catch (error) {
      console.log("Error adding product to cart:", error);
      setMessages((prevMessages) => ({
        ...prevMessages,
        [ProductID]: "Error adding product to cart.",
      }));
      setTimeout(() => {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [ProductID]: "",
        }));
      }, 1000); // Clear the message after 1 second
    }
  };

  return (
    <div className="container py-4" style={{ minHeight: "60vh" }}>
      {/* min-height to ensure footer stays at the bottom */}
      {/* Row for Search Bar and Categories Dropdown */}
      <div className="row mb-4 d-flex justify-content-center align-items-center">
        {/* Search Bar */}
        <div className="col-12 col-md-6 mb-3 mb-md-0 d-flex justify-content-center">
          <SearchBar setSearch={setSearch} />
        </div>

        {/* Category Dropdown */}
        <div className="col-12 col-md-6 d-flex justify-content-center">
          <Categories
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-danger">{error}</p>}

      {/* Products Section */}
      <div className="products-section">
        <h3
          style={{
            color: "#5f6368",
            fontSize: "2.25rem",
            paddingBottom: "10px",
          }}
        >
          Our Menu
        </h3>

        {loading && <p>Loading products...</p>}

        {/* Display filtered products */}
        <div className="row">
          {filteredProducts.length === 0 && !loading ? (
            <div className="col-12">
              <p>No products found matching your criteria.</p>
            </div>
          ) : (
            // Group products by category
            Array.from(
              new Set(filteredProducts.map((product) => product.Category))
            ).map((category) => (
              <div key={category} className="mb-5">
                {/* Category Header */}
                <h4
                  style={{
                    color: "#007bff",
                    fontSize: "2rem",
                    marginBottom: "1rem",
                    display: "inline-block", // Allow border to be only under the text
                    borderBottom: "2px solid #007bff", // Border only below text
                    paddingBottom: "5px", // Space between text and border
                  }}
                >
                  {category}
                </h4>

                {/* Product Cards */}
                <div className="row">
                  {filteredProducts
                    .filter((product) => product.Category === category)
                    .map((product) => (
                      <div
                        className="col-12 col-md-4 mb-4"
                        key={product.ProductID}
                      >
                        <div
                          className="card shadow-lg d-flex flex-column"
                          style={{ height: "100%" }} // Ensure cards have consistent height
                        >
                          {/* Image with fixed size and hover effect */}
                          <img
                            src={product.ImageLink}
                            alt={product.ProductName}
                            className="card-img-top"
                            style={{
                              height: "320px",
                              objectFit: "cover",
                              borderBottom: "2px solid #ddd",
                              transition: "transform 0.3s ease", // Smooth transition for hover effect
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.transform = "scale(1.05)")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.transform = "scale(1)")
                            }
                          />
                          <div className="card-body d-flex flex-column">
                            <h5 className="card-title">
                              {product.ProductName}
                            </h5>
                            <p
                              className="card-text"
                              style={{ fontSize: "1rem", flex: 1 }}
                            >
                              {product.Description}
                            </p>
                            <p
                              className="card-text"
                              style={{
                                fontSize: "1.25rem",
                                fontWeight: "bold",
                                color: "#28a745",
                              }}
                            >
                              ${product.Price}
                            </p>
                            {/* Add to Cart Button */}
                            <div style={{ position: "relative" }}>
                              <button
                                className="btn btn-primary"
                                style={{
                                  width: "100%",
                                  padding: "0.75rem",
                                  fontSize: "1rem",
                                  borderRadius: "4px",
                                  transition: "background-color 0.3s ease",
                                  display: "flex", // Ensures the icon and text align properly
                                  justifyContent: "center", // Centers the content horizontally
                                  alignItems: "center", // Aligns the content vertically
                                }}
                                onClick={() => addToCart(product.ProductID)}
                              >
                                <img
                                  src={carticon}
                                  alt="Add to Cart"
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    marginRight: "10px",
                                  }}
                                />
                                Add to Cart
                              </button>
                              {/* Message below the button */}
                              {messages[product.ProductID] && (
                                <div
                                  className="text-success mt-2"
                                  style={{ fontSize: "0.875rem" }}
                                >
                                  {messages[product.ProductID]}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <GoToTopButton />
    </div>
  );
}
