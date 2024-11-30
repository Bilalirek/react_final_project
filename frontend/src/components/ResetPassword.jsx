import { useState } from "react";

export default function ResetPassword({ setShowForm }) {
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(""); // To handle error messages
  const [message, setMessage] = useState(""); // To handle success or info messages

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default submission

    // Check if token and new password are provided
    if (!resetToken.trim() || !newPassword.trim()) {
      setError("Token and new password are required");
      return;
    }

    setLoading(true); // Set loading state to true
    setError(""); // Clear any previous error messages
    setMessage(""); // Clear previous message

    try {
      // Make the fetch request to reset password
      const response = await fetch("http://localhost:3000/user/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: resetToken, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // If password reset is successful, show success message
        setMessage(data.message);

        // show login form after 4 seconds to allow the user to login
        setTimeout(() => {
          setShowForm("login");
        }, 4000);
      } else {
        // If there's an error (e.g., invalid or expired token)
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
              <h2 className="card-title text-center">Reset Password</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="reset-token" className="form-label">
                    Reset Token:
                  </label>
                  <input
                    type="text"
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    id="reset-token"
                    className="form-control"
                    placeholder="Enter your reset token"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="new-password" className="form-label">
                    New Password:
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    id="new-password"
                    className="form-control"
                    placeholder="Enter your new password"
                    required
                  />
                </div>

                {/* Display the error message */}
                {error && (
                  <div className="mb-4 text-danger">
                    <strong>{error}</strong>
                  </div>
                )}

                {/* Display the success or info message */}
                {message && (
                  <div className="mb-4 text-success">
                    <strong>{message}</strong>
                  </div>
                )}

                <div className="mb-3 d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary p-2 w-75"
                    style={{ height: "50px", fontSize: "18px" }}
                    disabled={loading} // Disable button if request is in progress
                  >
                    {loading ? "Resetting..." : "Reset Password"}
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
