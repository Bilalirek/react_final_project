import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import cakeImg from "../images/Cakes category.png";
import foodImg from "../images/food category.jpg";
import iceCreamImg from "../images/ice-cream category.jpg";
import drinksImg from "../images/Caramel latte.jpg";

import pizzaImg from "../images/Super Supreme.jpeg";
import customer1 from "../images/customer1.jpg";
import customer2 from "../images/customer2.jpg";
import customer3 from "../images/customer3.jpg";
import GoToTopButton from "./GoToTopButton";

const MainSection = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    navigate("/menu", { state: { selectedCategory: category } });
    window.scrollTo(0, 0);
  };
  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: 'url("/photos/home-background.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          color: "white",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div>
          <h1>Welcome to Grand Dessert Palace</h1>
          <p style={{ color: "black" }}>
            Your cozy corner for the best coffee and treats!
          </p>
          <Link to="/menu" className="btn btn-light btn-lg">
            Explore Our Menu
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Our Services</h2>
          <div className="row">
            {/* Cakes */}
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card shadow-sm">
                <img
                  src={cakeImg}
                  className="card-img-top"
                  onClick={() => handleCategorySelect("Cakes")}
                  alt="Cakes"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "250px",
                    cursor: "pointer",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">Delicious Cakes</h5>
                  <p className="card-text">
                    Indulge in our selection of freshly baked cakes, perfect for
                    any occasion!
                  </p>
                </div>
              </div>
            </div>

            {/* Ice Cream */}
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card shadow-sm">
                <img
                  src={iceCreamImg}
                  className="card-img-top"
                  onClick={() => handleCategorySelect("Ice Creams")}
                  alt="Ice Cream"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "250px",
                    cursor: "pointer",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">Creamy Ice Cream</h5>
                  <p className="card-text">
                    Cool off with our rich, creamy ice cream made with the
                    finest ingredients.
                  </p>
                </div>
              </div>
            </div>

            {/* Western Food */}
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card shadow-sm">
                <img
                  src={foodImg}
                  className="card-img-top"
                  onClick={() => handleCategorySelect("Food")}
                  alt="Western Food"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "250px",
                    cursor: "pointer",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">Western Food</h5>
                  <p className="card-text">
                    Enjoy hearty, flavorful western dishes for breakfast, lunch,
                    or dinner.
                  </p>
                </div>
              </div>
            </div>

            {/* Drinks */}
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card shadow-sm">
                <img
                  src={drinksImg}
                  className="card-img-top"
                  onClick={() => handleCategorySelect("Drinks")}
                  alt="Drinks"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "250px",
                    cursor: "pointer",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">Refreshing Drinks</h5>
                  <p className="card-text">
                    Sip on our wide variety of refreshing drinks, from juices to
                    iced coffee.
                  </p>
                </div>
              </div>
            </div>

            {/* Pizza - New Service */}
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card shadow-sm">
                <img
                  src={pizzaImg}
                  className="card-img-top"
                  onClick={() => handleCategorySelect("Pizza")}
                  alt="Pizza"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "250px",
                    cursor: "pointer",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">Delicious Pizza</h5>
                  <p className="card-text">
                    Savor our freshly made pizzas with a variety of toppings to
                    satisfy every craving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container my-5">
        <h2 className="text-center mb-4">What Our Customers Say</h2>
        <div className="row">
          {/* Testimonial 1 */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                {/* Profile Image */}
                <img
                  src={customer1}
                  alt="Emma Roberts"
                  className="rounded-circle mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <p>
                  "Grand Dessert Palace has been my go-to spot for years! The
                  cakes are to die for, and I always look forward to my
                  afternoon coffee."
                </p>
                <p className="text-muted">- Emma Roberts</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                {/* Profile Image */}
                <img
                  src={customer2}
                  alt="Liam Smith"
                  className="rounded-circle mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <p>
                  "I love their ice cream! Every bite is pure heaven. Plus, the
                  cozy atmosphere makes it the perfect place to relax."
                </p>
                <p className="text-muted">- Liam Smith</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                {/* Profile Image */}
                <img
                  src={customer3}
                  alt="Olivia Martinez"
                  className="rounded-circle mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <p>
                  "The Western food is fantastic! Whether it's a burger or a
                  pasta, everything is made with so much flavor. Highly
                  recommend!"
                </p>
                <p className="text-muted">- Olivia Martinez</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoToTopButton />
    </div>
  );
};

export default MainSection;
