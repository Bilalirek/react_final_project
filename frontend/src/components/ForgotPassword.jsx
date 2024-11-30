import { useState } from "react";

export default function ForgotPassword({ setShowForm }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(""); // To handle any errors
  const [message, setMessage] = useState(""); // To handle success or info messages

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if email is valid before sending the request
    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true); // Set loading state to true
    setError(""); // Clear previous error messages
    setMessage(""); // Clear any previous success messages

    try {
      const response = await fetch(
        "http://localhost:3000/user/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // On success, set the success message
        setMessage(data.message);

        // After 4 seconds, show the reset password form to let the user see the message
        setTimeout(() => {
          setShowForm("resetPassword"); // Show the reset password form
        }, 4000);
      } else {
        // Handle error response from the backend
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Set loading state back to false
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
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.25)", // Stronger shadow
            }}
          >
            <div className="card-body">
              <h2 className="card-title text-center">Forgot Password</h2>
              <form id="forgot-password-form-element" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="forgot-email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="forgot-email"
                    className="form-control"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                {/* Display error message */}
                {error && (
                  <div className="mb-4 text-danger">
                    <strong>{error}</strong>
                  </div>
                )}

                {/* Display success or informational message */}
                {message && (
                  <div className="mb-4 text-success">
                    <strong>{message}</strong>
                  </div>
                )}

                <div className="mb-4 d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary p-2 w-75"
                    style={{ height: "50px", fontSize: "18px" }}
                    disabled={loading} // Disable the button if the request is in progress
                  >
                    {loading ? "Sending..." : "Reset Password"}
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowForm("login")}
                    className="btn btn-link"
                  >
                    Remembered your password? Login here.
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
