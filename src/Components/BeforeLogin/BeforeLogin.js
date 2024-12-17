import React, { useState, useEffect } from "react";
import "./BeforeLogin.css";
import mainLogin from "./../../Assets/BeforeLogin/mainLogo.jpeg";
import downRightArrow from "./../../Assets/BeforeLogin/downRightArrow.png";
import pintrest from "./../../Assets/BeforeLogin/pinterest.png";
import mainImage from "./../../Assets/BeforeLogin/mainImage.png";
import heart from "./../../Assets/BeforeLogin/heart.png";
import random_profile from "./../../Assets/BeforeLogin/random_profile.jpeg";
import close from "./../../Assets/BeforeLogin/close.png";
import mouseCursor from "./../../Assets/BeforeLogin/mouse-cursor.png";
import beforeLoginBackgroundImage from "./../../Assets/BeforeLogin/bgImageBeforeLogin.png";
import forRightContainer from "./../../Assets/BeforeLogin/forRightContainer.png";
import forRightContainer2 from "./../../Assets/BeforeLogin/forRightContainer2.png";
import Services1 from "./../../Assets/BeforeLogin/engangement.png";
import Services2 from "./../../Assets/BeforeLogin/eventPhotography.png";
import Services3 from "./../../Assets/BeforeLogin/PortraitPhotography.png";
import Services4 from "./../../Assets/BeforeLogin/photoEditing.png";
import Services5 from "./../../Assets/BeforeLogin/drone.png";
import Services6 from "./../../Assets/BeforeLogin/cinematic_wedding.png";
import freelancers from "./../../Assets/BeforeLogin/freelancer.png";
import businessAvailable from "./../../Assets/BeforeLogin/businessAvailable.png";
import security from "./../../Assets/BeforeLogin/securePayment.png";
import scheduling from "./../../Assets/BeforeLogin/easeScheduling.png";

function BeforeLogin() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSelectClick = () => {
    // Redirect based on selected option
    if (selectedOption === "Hire a Photographer") {
      window.location.href = "/client";
    } else if (selectedOption === "Offer Photography Services") {
      window.location.href = "/owner";
    } else {
      alert("Please select an option before proceeding.");
    }
  };

  const handleGetStartedClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const data = [
    {
      title: "12k+",
      subtitle: "freelancers and businesses helped",
      image: freelancers,
    },
    {
      title: "30+",
      subtitle: "businesses available",
      image: businessAvailable,
    },
    {
      title: "Ease in Scheduling",
      subtitle: "Easy booking and scheduling",
      image: scheduling,
    },
    {
      title: "Secure Payments",
      subtitle: "Secure payment options",
      image: security,
    },
  ];

  const serviceData = [
    {
      id: 1,
      title: "Wedding Photography",
      img: Services1,
      color: "#fee4fa",
      description:
        "Capturing your beautiful wedding moments with precision and creativity.",
    },
    {
      id: 2,
      title: "Event Photography",
      img: Services2,
      color: "#fff0cb",
      description:
        "High-quality photos for birthdays, corporate events, and special occasions.",
    },
    {
      id: 3,
      title: "Portrait Photography",
      img: Services3,
      color: "#d5fee9",
      description:
        "Professional portraits for individuals, families, or portfolios.",
    },
    {
      id: 4,
      title: "Photo Editing Services",
      img: Services4,
      color: "#fee6df",
      description:
        "Enhancing photos with professional editing tools and techniques.",
    },
    {
      id: 5,
      title: "Drone Photography",
      img: Services5,
      color: "#e1d1f9",
      description:
        "Aerial photography for events, landscapes, and creative projects.",
    },
    {
      id: 6,
      title: "Cinematic Wedding Films",
      img: Services6,
      color: "#fbdbda",
      description:
        "Aerial photography for events, landscapes, and creative projects.",
    },
  ];

  const packageData = [
    {
      id: 1,
      name: "Basic Package",
      price: "1999",
      features: [
        "2 Hours Photography",
        "50 Edited Photos",
        "Online Gallery",
        "Basic Photo Retouching",
      ],
      img: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      name: "Standard Package",
      price: "4999",
      features: [
        "5 Hours Photography",
        "200 Edited Photos",
        "Photo Album",
        "Advanced Retouching",
        "1 Cinematic Video",
      ],
      img: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      name: "Premium Package",
      price: "9999",
      features: [
        "Full Day Photography",
        "500+ Edited Photos",
        "Premium Photo Album",
        "Drone Photography",
        "Multiple Cinematic Videos",
      ],
      img: "https://via.placeholder.com/300x200",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [data.length]);

  const handleScroll = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollPosition = () => {
    if (window.scrollY > 200) {
      // Show button when scrolled 200px down
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPosition);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScrollPosition);
    };
  }, []);
  return (
    <>
      <div className="beforeLoginOuter_container">
        <div className="home" id="home">
          <div className="beforeLoginImage">
            <img src={beforeLoginBackgroundImage} alt="" />
          </div>
          <nav>
            <img src={mainLogin} alt="LoginLogo" />
            <div className="multiple_links">
              <p onClick={() => handleScroll("home")}>Welcome Page</p>
              <p onClick={() => handleScroll("business")}>Grow Your Business</p>
              <p onClick={() => handleScroll("services")}>Services</p>
              <p onClick={() => handleScroll("packages")}>Packages</p>
              <p onClick={() => handleScroll("testimonial")}>Testimonials</p>
            </div>

            <div className="buttons_for_login">
              <button className="before_login_button">Contact Us</button>
              {/* <button style={{ color: "white" }} onClick={handleGetStartedClick}>
              Get Started
            </button> */}
            </div>
          </nav>
          <main>
            <div className="main_content">
              <div className="text_content">
                <p>Create Your Dream Wedding</p>
                <h1>Your One-Stop Destination for Wedding Memories </h1>
              </div>
              <button onClick={handleGetStartedClick}>
                <p>Get Started</p>
                <img src={downRightArrow} alt="rightarrow" />
              </button>
            </div>
          </main>

          {showPopup && (
            <div className="popup-overlay">
              <div className="popup">
                <button className="close-popup" onClick={closePopup}>
                  <img src={close} alt="close_popup" />
                </button>
                <h2>
                  Are you{" "}
                  <span
                    style={{
                      backgroundColor: "lightgreen",
                      padding: "2px 5px",
                    }}
                  >
                    {" "}
                    looking for services
                  </span>{" "}
                  or{" "}
                  <span
                    style={{
                      backgroundColor: "lightgreen",
                      padding: "2px 5px",
                    }}
                  >
                    offering services
                  </span>
                  ? ?
                </h2>
                <div className="options-container">
                  <label className="option">
                    <input
                      type="radio"
                      name="companySize"
                      value="Offer Photography Services"
                      onChange={handleOptionChange}
                    />
                    <p>Offer Photography Services</p>
                    <img src={heart} alt="select option" />
                  </label>

                  <label className="option">
                    <input
                      type="radio"
                      name="companySize"
                      value="Hire a Photographer"
                      onChange={handleOptionChange}
                    />
                    <p>Hire a Photographer</p>
                    <img src={heart} alt="select option" />
                  </label>
                </div>
                <button className="next-button" onClick={handleSelectClick}>
                  Select
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="business" id="business">
          <h1>
            <span
              style={{
                backgroundColor: "yellowgreen",
                padding: "0px 10px",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Grow
            </span>{" "}
            Your Business
          </h1>

          <div className="services_content">
            <div className="left_container">
              <img src={pintrest} alt="good " />
              <h1 style={{ fontSize: "35px" }}>
                Get Organized. Get Business. Get Paid.
              </h1>

              <div className="data_container">
                <div className={`data_content `}>
                  <h1 style={{ fontSize: "22px" }}>
                    {data[currentIndex].title}
                  </h1>
                  <p>{data[currentIndex].subtitle}</p>
                </div>
                <img src={data[currentIndex].image} alt="changing" />
              </div>
            </div>
            <div className="center_container">
              <div className="message_container">4.5 ⭐</div>
              <h1>Transforming Moments Into Memory</h1>
              <img src={mainImage} className="main_image" alt="" />
              <img src={heart} className="heart_image" alt="" />
            </div>
            <div className="right_container">
              <h2 className="showcase_title">Our Achievements</h2>
              <div className="stats_flex">
                <div className="stat_item">
                  <img
                    src={forRightContainer}
                    alt="Projects Completed"
                    className="stat_icon"
                  />
                  <h3>5k+</h3>
                  <p>Successful Photoshoots</p>
                </div>

                {/* Stat 3 */}
                <div className="stat_item">
                  <img
                    src={forRightContainer2}
                    alt="Revenue Growth"
                    className="stat_icon"
                  />
                  <h3>300%</h3>
                  <p>Revenue Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="services" id="services">
          <h2 className="section-title">
            Our{" "}
            <span
              style={{ backgroundColor: "yellowgreen", padding: "0px 5px" }}
            >
              Services
            </span>
          </h2>
          <div className="services-container">
            {serviceData.map((service) => (
              <div
                key={service.id}
                className="service-card"
                style={{ backgroundColor: service.color }}
              >
                <div className="services_image_container">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="service-img"
                  />
                </div>

                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="packages" id="packages">
          <h2 className="package-title">
            Your{" "}
            <span
              style={{ backgroundColor: "yellowgreen", padding: "0px 5px" }}
            >
              Memories
            </span>{" "}
            , Our{" "}
            <span
              style={{ backgroundColor: "yellowgreen", padding: "0px 5px" }}
            >
              Packages
            </span>
          </h2>
          <div className="packages-container">
            {packageData.map((pkg) => (
              <div key={pkg.id} className="package-card">
                <div className="package_image_container">
                  <img src={pkg.img} alt={pkg.name} className="package-img" />
                </div>

                <div className="package_data_container">
                  <h3 className="package-title">{pkg.name}</h3>
                  <p className="package-price">{pkg.price}</p>
                  <ul className="package-features">
                    {pkg.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonial" id="testimonial"></div>
        {/* Back to Top button */}
      </div>

      {showButton && (
        <button className="back-to-top" onClick={scrollToTop}>
          <img src={mouseCursor} alt="top" />
        </button>
      )}
    </>
  );
}
export default BeforeLogin;
