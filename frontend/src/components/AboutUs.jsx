import shopImg from "../images/cafe.jpg";

export default function AboutUs() {
  return (
    <div
      className="container py-5"
      style={{
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Title Section */}
      <div
        className="text-center mb-5"
        style={{
          padding: "30px",
          borderRadius: "8px",
          color: "black",
        }}
      >
        <h2
          className="display-4 font-weight-bold"
          style={{
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "#343a40", // Dark grey color for better contrast
          }}
        >
          About Our Café
        </h2>
        <p
          className="lead text-muted mb-4"
          style={{
            fontWeight: "300",
            fontSize: "1.2rem",
            color: "#495057",
          }}
        >
          Delicious cakes, ice cream, pizza, and more, all served with love!
        </p>
      </div>

      {/* About Us Content Section */}
      <div className="row">
        {/* Left Column with Text */}
        <div className="col-md-6">
          <h3 className="font-weight-bold text-dark mb-4">Our Mission</h3>
          <p
            className="text-muted"
            style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#495057" }}
          >
            At [GRAND DESSERT PALACE], we bring together the best of both
            worlds: sweet treats and savory delights. From indulgent delicacies
            to mouthwatering offerings, our mission is to offer a cozy place for
            family, friends, and food lovers to come together and enjoy the
            finest food and drinks in town.
          </p>

          <h3 className="font-weight-bold text-dark mb-4">Our Values</h3>
          <ul
            className="list-unstyled"
            style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#495057" }}
          >
            <li>
              <strong className="text-primary">Quality:</strong> We use only the
              finest ingredients to prepare our menu items.
            </li>
            <li>
              <strong className="text-primary">Variety:</strong> Whether you're
              craving something sweet or savory, we have something to satisfy
              every craving.
            </li>
            <li>
              <strong className="text-primary">Community:</strong> Our café is a
              place to relax, connect with loved ones, and enjoy good food in
              great company.
            </li>
            <li>
              <strong className="text-primary">Freshness:</strong> We ensure
              that all of our dishes are made fresh, ensuring a delightful
              experience with every bite.
            </li>
          </ul>
        </div>

        {/* Right Column with Image */}
        <div className="col-md-6">
          <div className="position-relative">
            <img
              src={shopImg}
              alt="Café Treats"
              className="img-fluid rounded shadow-lg"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
