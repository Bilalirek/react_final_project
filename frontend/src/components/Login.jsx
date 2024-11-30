import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login({ setShowForm }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Clear any previous messages or errors
    setErr("");
    // Validate form fields (check if they are empty)
    if (!userName || !password) {
      setErr("Username and password are required.");
      return; // Stop submission if validation fails
    }

    const userData = {
      userName,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setErr(""); // Clear any previous errors
        const data = await response.json();
        console.log("Log in success:", data); // Log the response data
        const customerId = data.customerId;
        localStorage.setItem("customerId", customerId);
        navigate("/home");

        // Clear form fields after success
        setUserName("");
        setPassword("");
      } else {
        // If the response isn't OK, handle the error from the backend
        const errorData = await response.json();
        setErr(errorData.message || "Invalid username or password");
        console.log("Error response:", errorData);
      }
    } catch (error) {
      console.log("Error during login:", error);
      setErr("An error occurred while logging in.");
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
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-4">
                  <label htmlFor="login-username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="login-username"
                    className="form-control"
                    placeholder="Enter your username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="login-password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="login-password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Display error message if there is an error */}
                {err && (
                  <div className="alert alert-danger" role="alert">
                    {err}
                  </div>
                )}

                <div className="mb-3 d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary p-2 w-75"
                    style={{ height: "50px", fontSize: "18px" }}
                  >
                    Login
                  </button>
                </div>

                <div className="mb-3 d-flex justify-content-center">
                  <button
                    type="button"
                    onClick={() => setShowForm("createAccount")}
                    className="btn btn-success p-2 w-75"
                    style={{ height: "50px", fontSize: "16px" }}
                  >
                    Create Account
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowForm("forgotPassword")}
                    className="btn btn-link"
                  >
                    Forgot Password?
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
