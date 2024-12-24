import React, { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "./BeforeLogin.css";
import mainLogin from "./../../Assets/BeforeLogin/mainLogo.jpeg";
import downRightArrow from "./../../Assets/BeforeLogin/downRightArrow.png";
import pintrest from "./../../Assets/BeforeLogin/pinterest.png";
import mainImage from "./../../Assets/BeforeLogin/mainImage.png";
import heart from "./../../Assets/BeforeLogin/heart.png";
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

// for slider images
import wedding1 from "./../../Assets/BeforeLogin/wedding1.jpg";
import wedding2 from "./../../Assets/BeforeLogin/wedding2.jpg";
import wedding3 from "./../../Assets/BeforeLogin/wedding3.jpg";

import food1 from "./../../Assets/BeforeLogin/food1.jpeg";
import food2 from "./../../Assets/BeforeLogin/food2.jpeg";
import food3 from "./../../Assets/BeforeLogin/food3.jpeg";

import aesthetic1 from "./../../Assets/BeforeLogin/aesthetic1.jpeg";
import aesthetic2 from "./../../Assets/BeforeLogin/aesthetic2.jpeg";
import aesthetic3 from "./../../Assets/BeforeLogin/aesthetic3.jpeg";

import testimonial1 from "./../../Assets/BeforeLogin/testimonial1.jpeg";
import testimonial2 from "./../../Assets/BeforeLogin/testimonial2.jpeg";
import testimonial3 from "./../../Assets/BeforeLogin/testimonial3.jpeg";
import instagram from "./../../Assets/BeforeLogin/instagram.png";
import facebook from "./../../Assets/BeforeLogin/facebook.png";
import telegram from "./../../Assets/BeforeLogin/telegram.png";
import github from "./../../Assets/BeforeLogin/github.png";
import profile from "./../../Assets/BeforeLogin/profile.png";
import buttonProfile from "./../../Assets/BeforeLogin/buttonProfile.png";

import clientPhotography from "./../../Assets/BeforeLogin/clientPhotography.png";
import offerPhotography from "./../../Assets/BeforeLogin/offerPhotography.png";

import ContactPage from "./sub_parts/ContactPage";
import FAQ from "./sub_parts/FAQ";

function BeforeLogin() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [buttonAtBottom, setButtonAtBottom] = useState(false);
  const [contact_page_visible, set_contact_page_visible] = useState(false);
  // const [buttonBottom, setButtonBottom] = useState(30);

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
      subtitle: "Easy booking & scheduling",
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
      name: "Shrey Patel",
      specialist: "Wedding",
      location: "Vadodara, Gujarat",
      description:
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores est nihil voluptates nulla soluta doloremque ut similique nostrum ipsa commodi.",
      img: [wedding1, wedding2, wedding3],
    },
    {
      id: 2,
      name: "Praharsh Patni",
      specialist: "Food Photography",
      location: "Ahemadabad, Gujarat",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores est nihil voluptates nulla soluta doloremque ut similique nostrum ipsa commodi.",
      img: [food1, food2, food3],
    },
    {
      id: 3,
      name: " James Carter",
      specialist: "Aesthetic",
      location: "Surat, Gujarat",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores est nihil voluptates nulla soluta doloremque ut similique nostrum ipsa commodi.",
      img: [aesthetic1, aesthetic2, aesthetic3],
    },
  ];
  const testimonialData = [
    {
      img: testimonial1,
      name: " James Carter",
      role: "Wedding Client",
      feedback:
        "The photos captured our wedding beautifully. Highly professional!",
    },
    {
      img: testimonial2,
      name: "Michael Davis",
      role: "Event Organizer",
      feedback:
        "Fantastic service with attention to detail. Exceeded expectations!",
    },
    {
      img: testimonial3,
      name: "John Anderson",
      role: "Portrait Session",
      feedback:
        "I loved the creativity and professionalism during the photoshoot.",
    },
  ];
  const socialMediaIcons = [
    { id: 1, img: instagram },
    { id: 2, img: facebook },
    { id: 3, img: telegram },
    { id: 4, img: github },
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
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.body.scrollHeight;

    if (window.scrollY > 200) {
      // Show button when scrolled 200px down
      setShowButton(true);
    } else {
      setShowButton(false);
    }

    if (pageHeight - scrollPosition < 50) {
      setButtonAtBottom(true); // Custom state to move button when at the bottom
    } else {
      setButtonAtBottom(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleContactUs = () => {
    set_contact_page_visible(!contact_page_visible);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPosition);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScrollPosition);
    };
  }, []);
  return (
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
            <button className="before_login_button" onClick={handleContactUs}>
              Contact Us
            </button>
          </div>
        </nav>
        {contact_page_visible ? <ContactPage /> : ""}
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
                ?
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
                  <img src={offerPhotography} alt="select option" />
                </label>

                <label className="option">
                  <input
                    type="radio"
                    name="companySize"
                    value="Hire a Photographer"
                    onChange={handleOptionChange}
                  />
                  <p>Hire a Photographer</p>
                  <img src={clientPhotography} alt="select option" />
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
            <h1>Get Organized. Get Business. Get Paid.</h1>

            <div className="data_container">
              <div className={`data_content `}>
                <h1>{data[currentIndex].title}</h1>
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
            style={{
              backgroundColor: "yellowgreen",
              padding: "0px 5px",
              borderRadius: "5px",
            }}
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
          The{" "}
          <span
            style={{
              backgroundColor: "yellowgreen",
              padding: "0px 5px",
              borderRadius: "5px",
            }}
          >
            Creative
          </span>{" "}
          Mind
        </h2>
        <div className="packages-container">
          {packageData.map((pkg) => (
            <div key={pkg.id} className="package-card">
              <div className="package_image_container">
                <div className="package_speciality">{pkg.specialist}</div>
                <Swiper
                  modules={[Pagination, Autoplay]}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 4000 }}
                  loop={true}
                  className="package-slider"
                >
                  {/* Map through images and create SwiperSlide for each one */}
                  {pkg.img && pkg.img.length > 0 ? (
                    pkg.img.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image}
                          alt={`${pkg.name} slider ${index + 1}`}
                          className="package-img"
                        />
                      </SwiperSlide>
                    ))
                  ) : (
                    <div>No images available</div>
                  )}
                </Swiper>
              </div>

              <div className="package_data_container">
                <div className="profile_container">
                  <img src={profile} alt="user profile" />
                  <div className="profile_name_location">
                    <h1>{pkg.name}</h1>
                    <p>{pkg.location}</p>
                  </div>
                </div>
                <div className="description_container">
                  <div className="pricing_container">
                    <p>Pricing starts at INR 10,000</p>
                  </div>
                  <div className="profile_description">
                    <p>{pkg.description}</p>
                  </div>
                </div>
                <button className="profile_button">
                  <img src={buttonProfile} alt="buttonProfile " />
                  <p onClick={handleGetStartedClick}>view Artist</p>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonial" id="testimonial">
        <h2 className="testimonial-title">
          What Our{" "}
          <span
            style={{
              backgroundColor: "yellowgreen",
              padding: "0px 5px",
              borderRadius: "5px",
            }}
          >
            Clients
          </span>{" "}
          Say
        </h2>
        <div className="testimonial-container">
          {testimonialData.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              {/* Testimonial Content */}
              <div className="testimonial-image">
                <img src={testimonial.img} alt={testimonial.name} />
              </div>
              <div className="testimonial-info">
                <h3 className="testimonial-name">{testimonial.name}</h3>
                <p className="testimonial-role">{testimonial.role}</p>
                <p className="testimonial-text">{testimonial.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FAQ />
      <footer>
        <div className="footer_image_container">
          <img src={businessAvailable} alt="" />
        </div>
        <div className="footer_links">
          <p onClick={() => handleScroll("home")}>Welcome Page</p>
          <p onClick={() => handleScroll("business")}>Grow Your Business</p>
          <p onClick={() => handleScroll("services")}>Services</p>
          <p onClick={() => handleScroll("packages")}>Packages</p>
          <p onClick={() => handleScroll("testimonial")}>Testimonials</p>
        </div>
        <div className="footer_online_platforms">
          {socialMediaIcons.map((obj) => (
            <div className="footer_img_container" key={obj.id}>
              <img src={obj.img} alt={`Social media icon ${obj.id}`} />
            </div>
          ))}
        </div>
      </footer>
      {/* Back to Top button */}
      {showButton && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          style={{ bottom: buttonAtBottom ? "75px" : "30px" }}
        >
          <img src={mouseCursor} alt="top" />
        </button>
      )}
    </div>
  );
}
export default BeforeLogin;
