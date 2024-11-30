import { useState, useEffect } from "react";
import goToTop from "../images/top.png";

const GoToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowButton(true); // Show the button after scrolling down 200px
    } else {
      setShowButton(false); // Hide the button when scrolled back up
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Adding scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup the event listener
    };
  }, []);

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="btn btn-primary position-fixed bottom-0 end-0 m-4"
          style={{
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0, // Remove padding to ensure perfect centering
            backgroundColor: "#007bff",
            border: "none", // Remove default border
            cursor: "pointer",
            transition: "background-color 0.3s ease", // Smooth transition for hover effect
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          } // Darker blue on hover
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bff")
          } // Reset background on hover out
        >
          <img
            src={goToTop}
            alt="Go to Top"
            style={{
              width: "32px",
              height: "32px",
              filter: "invert(1)", // Inverts the color of the icon to white
            }}
          />
        </button>
      )}
    </>
  );
};

export default GoToTopButton;
