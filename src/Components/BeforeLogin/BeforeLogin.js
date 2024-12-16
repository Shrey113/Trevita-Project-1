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
    { title: "12k+", subtitle: "freelancers and businesses helped" },
    { title: "30+", subtitle: "businesses available" },
    { title: "500+", subtitle: "projects completed" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 5000);

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
          <h1>Groww Your Business</h1>
          <div className="services_content">
            <div className="left_container">
              <img src={pintrest} alt="good " />
              <h1>Get Organized. Get Business. Get Paid.</h1>
              <a href="/" style={{ color: "#5f5d6f" }}>
                Request a demo now
              </a>
              <div className="data_container">
                <div className={`data_content `}>
                  <h1>{data[currentIndex].title}</h1>
                  <p>{data[currentIndex].subtitle}</p>
                </div>
                <img src={random_profile} alt="" />
              </div>
            </div>
            <div className="center_container">
              <img src={mainImage} className="main_image" alt="" />
              <img src={heart} className="heart_image" alt="" />
            </div>
            <div className="right_container"></div>
          </div>
        </div>

        <div className="services" id="services"></div>

        <div className="packages" id="packages"></div>

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
