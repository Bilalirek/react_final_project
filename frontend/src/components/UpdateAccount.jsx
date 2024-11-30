import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateAccount() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState(""); // to display success or error messages
  const navigate = useNavigate();

  const customerId = localStorage.getItem("customerId"); // Get the stored customerId

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect current values and set old values where empty
    const updatedUser = {
      userName: username || undefined, // Use undefined to signal no change
      email: email || undefined,
      pw: password || undefined,
      location: location || undefined,
    };

    try {
      // Send the update request via fetch
      const response = await fetch("http://localhost:3000/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId, ...updatedUser }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("Account updated successfully!");
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/home"); // Redirect to the homepage
        }, 2000); // 2 seconds delay
      } else {
        setMessage("Failed to update account.");
      }
    } catch (error) {
      console.log("Error updating account:", error);
      setMessage("An error occurred. Please try again.");
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
              <h2 className="card-title text-center mb-3">
                Update Information
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="update-username" className="form-label">
                    New Username:
                  </label>

                  <input
                    type="text"
                    id="update-username"
                    className="form-control"
                    placeholder="Leave blank to keep current username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="update-email" className="form-label">
                    New Email:
                  </label>
                  <input
                    type="email"
                    id="update-email"
                    name="email"
                    className="form-control"
                    placeholder="Leave blank to keep current email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="update-password" className="form-label">
                    New Password:
                  </label>
                  <input
                    type="password"
                    id="update-password"
                    name="password"
                    className="form-control"
                    placeholder="Leave blank to keep current password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="update-location" className="form-label">
                    New Location:
                  </label>
                  <input
                    type="text"
                    id="update-location"
                    className="form-control"
                    placeholder="Leave blank to keep current location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                {message && <div className="alert alert-info">{message}</div>}

                <div className="mb-3 d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary p-2 w-75"
                    style={{ height: "50px", fontSize: "18px" }}
                  >
                    Update Account
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
