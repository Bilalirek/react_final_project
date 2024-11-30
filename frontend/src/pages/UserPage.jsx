import Login from "../components/Login";
import { useState } from "react";
import { useLocation } from "react-router-dom"; // To access the passed state
import CreateAccount from "../components/CreateAccount";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import UpdateAccount from "../components/UpdateAccount";
import pizzaBackGround from "../images/pizza-background.jpg";

export default function UserPage() {
  const location = useLocation();
  const [showForm, setShowForm] = useState(location.state?.showForm || "login");

  const backgroundImageStyle = {
    backgroundImage: `url(${pizzaBackGround})`, // Using the imported image
    backgroundSize: "cover", // Ensures the image covers the entire page
    backgroundPosition: "center center", // Centers the background image
    backgroundAttachment: "fixed", // Keeps the image fixed while scrolling
  };

  return (
    <div style={backgroundImageStyle}>
      {showForm === "login" ? (
        <Login setShowForm={setShowForm} />
      ) : showForm === "createAccount" ? (
        <CreateAccount setShowForm={setShowForm} />
      ) : showForm === "updateaccount" ? (
        <UpdateAccount setShowForm={setShowForm} />
      ) : showForm === "forgotPassword" ? (
        <ForgotPassword setShowForm={setShowForm} />
      ) : (
        <ResetPassword setShowForm={setShowForm} />
      )}
    </div>
  );
}
