const Footer = () => {
  return (
    <footer
      className="footer text-center"
      style={{
        backgroundColor: "#343a40",
        color: "white",
        padding: "20px 0",
        marginTop: "auto", // This makes the footer stick to the bottom
      }}
    >
      <p>Follow Us</p>
      <div>
        <a href="#" className="btn btn-outline-light mx-2">
          Facebook
        </a>
        <a href="#" className="btn btn-outline-light mx-2">
          Instagram
        </a>
        <a href="#" className="btn btn-outline-light mx-2">
          Twitter
        </a>
      </div>
      <p className="mt-3">© 2024 Grand Dessert Palace | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
