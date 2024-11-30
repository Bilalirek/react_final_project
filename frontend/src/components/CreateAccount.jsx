import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccount({ setShowForm }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [err, setErr] = useState(""); // Error message state
  const [message, setMessage] = useState(""); // Success message state
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate the fields
    if (!userName || !email || !password || !location) {
      setErr("All fields are required.");
      return; // Stop submission if validation fails
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErr("Please enter a valid email address.");
      return;
    }

    // Password length check
    if (password.length < 6) {
      setErr("Password must be at least 6 characters long.");
      return;
    }

    // Clear any previous messages or errors
    setErr("");
    setMessage("");
    setLoading(true); // Show spinner

    const userData = {
      userName,
      email,
      password,
      location,
    };

    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setErr(""); // Clear any previous errors
        setMessage("Account created successfully");

        const data = await response.json();
        console.log("Account creation success:", data); // Log the response data
        const customerId = data.customerId;
        localStorage.setItem("customerId", customerId);

        // Clear form fields after success
        setUserName("");
        setEmail("");
        setPassword("");
        setLocation("");

        // Redirect after 3 seconds
        setTimeout(() => {
          navigate("/home"); // Redirect to the homepage
        }, 3000); // 3 seconds delay
      } else {
        const errorData = await response.json();
        setErr(
          errorData.message || "An error occurred while creating the account."
        );
        console.log("Error response:", errorData);
      }
    } catch (error) {
      console.log("Error creating account:", error);
      setErr("An error occurred while creating the account.");
    } finally {
      setLoading(false); // Hide spinner after process is complete
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div
            className="card"
            style={{
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div className="card-body">
              <h2 className="card-title text-center">Create Account</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="create-username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    id="create-username"
                    className="form-control"
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="create-email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="create-email"
                    className="form-control"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="create-password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="create-password"
                    className="form-control"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="Location" className="form-label">
                    Location:
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    id="Location"
                    className="form-control"
                    placeholder="Enter your Location"
                    required
                  />
                </div>

                {/* Display Error Message */}
                {err && <div className="alert alert-danger">{err}</div>}

                {/* Display Success Message */}
                {message && (
                  <div className="alert alert-success">{message}</div>
                )}

                {/* Spinner while loading */}
                {loading && (
                  <div className="d-flex justify-content-center mb-3">
                    <div
                      className="spinner-border text-primary"
                      style={{ width: "3rem", height: "3rem" }}
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}

                <div className="mb-3 d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary p-2 w-75"
                    style={{ height: "50px", fontSize: "18px" }}
                    disabled={loading} // Disable the button when loading
                  >
                    Create Account
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowForm("login")}
                    className="btn btn-link"
                  >
                    Already have an account? Login here.
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
