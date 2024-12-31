import { React, useEffect, useState, useRef } from "react";
import { localstorage_key_for_client, Server_url } from "./../../redux/AllData";
import "./CSS File/HomePage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
// import "swiper/css/thumbs";
import "swiper/css";
import "swiper/css/autoplay";

import AfterLoginsliderImage1 from "./../../Assets/Client/AfterLogin/AfterLoginsliderImage1.png";
import AfterLoginsliderImage2 from "./../../Assets/Client/AfterLogin/AfterLoginsliderImage2.png";
import AfterLoginsliderImage3 from "./../../Assets/Client/AfterLogin/AfterLoginsliderImage3.png";
import AfterLoginsliderImage4 from "./../../Assets/Client/AfterLogin/AfterLoginsliderImage4.png";
import userProfileIcon from "./../../Assets/Client/AfterLogin/userProfileIcon.png";
import booking from "./../../Assets/Client/AfterLogin/booking.png";
import heart from "./../../Assets/Client/AfterLogin/heart.png";
import logout from "./../../Assets/Client/AfterLogin/logout.png";
import companyLogo from "./../../Assets/Client/AfterLogin/companyLogo.png";
import profile from "./../../Assets/BeforeLogin/mainLogo.jpeg";

import SearchBar from "./sub_component/SearchBar.js";
import UserProfilePage from "./sub_component/UserProfilePage.js";
import WhishList from "./sub_component/WhishList.js";
import Bookings from "./sub_component/Bookings.js";
import Photographer from "./sub_component/Photographer.js";

import menu from "./../../Assets/Client/AfterLogin/menu.png";
import close from "./../../Assets/Client/AfterLogin/close.png";
import { Title } from "chart.js";
import { Cursor } from "mongoose";

function HomePage() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showProfileBox, setShowProfileBox] = useState(false);
  const profileBoxRef = useRef(null);
  const profileContainerRef = useRef(null);
  const [navigation, setNavigation] = useState("HomePage");
  const [showDropdown, setShowDropdown] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    {
      name: "Home Page",
      icon: menu,
      active_icon: menu,
    },
    {
      name: "Packages",
      icon: menu,
      active_icon: menu,
    },
    {
      name: "Bookings",
      icon: menu,
      active_icon: menu,
    },
    {
      name: "Whishlist",
      icon: menu,
      active_icon: menu,
    },
    // {
    //   name: "Packages and Pricing",
    //   icon: menu,
    //   active_icon: menu,
    // },
  ];
  const popular_search = [
    { name: "Wedding" },
    { name: "Baby Shower" },
    { name: "Baby Shower" },
    { name: "Baby Shower" },
    { name: "Baby Shower" },
    { name: "Baby Shower" },
    { name: "Pre Wedding" },
    { name: "Videogrpahy" },
  ];
  const categories = [
    { name: "Wedding" },
    { name: "Baby Shower" },
    { name: "Baby Shower" },
    { name: "Baby Shower" },
    { name: "Baby Shower" },
    { name: "Baby Shower" },
    { name: "Pre Wedding" },
    { name: "Videogrpahy" },
  ];

  // const handleItemClick = (index) => {
  //   setActiveIndex(index);
  // };

  const [photos, setPhotos] = useState([
    {
      imgUrl: AfterLoginsliderImage3,
      PhotographerUrl: companyLogo,
      PhotographerName: "Praharsh Patni",
      Speciality: "Natural Photographer",
    },
    {
      imgUrl: AfterLoginsliderImage2,
      PhotographerUrl: profile,
      PhotographerName: "Praharsh Patni",
      Speciality: "Natural Photographer",
    },
    {
      imgUrl: AfterLoginsliderImage1,
      PhotographerUrl: profile,
      PhotographerName: "Praharsh Patni",
      Speciality: "Natural Photographer",
    },
    {
      imgUrl: AfterLoginsliderImage4,
      PhotographerUrl: profile,
      PhotographerName: "Shrey Patel",
      Speciality: "Natural Photographer",
    },
  ]);

  // for logging out
  const handle_user_logout = () => {
    window.localStorage.removeItem(localstorage_key_for_client);
    window.location.reload();
  };

  useEffect(() => {
    const checkUserToken = async () => {
      const jwtToken = localStorage.getItem(localstorage_key_for_client);
      if (!jwtToken) {
        return;
      }

      try {
        const response = await fetch(`${Server_url}/check-user-jwt`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: jwtToken }),
        });

        const result = await response.json();

        if (response.ok) {
          if (result.message === "Token is valid") {
            if (result.data.user_name && result.data.user_email) {
              setUserName(result.data.user_name);
              setUserEmail(result.data.user_email);
            }
          }
        } else {
          console.log(result);
        }
      } catch (err) {
        console.error("Client token check error");
      }
    };
    checkUserToken();
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileBoxRef.current &&
        !profileBoxRef.current.contains(event.target) &&
        profileContainerRef.current &&
        !profileContainerRef.current.contains(event.target)
      ) {
        setShowProfileBox(false); // Close the profile box if clicked outside
      }
    };
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const toggleProfileBox = () => {
    setShowProfileBox((prevState) => !prevState);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleItemClick = (index) => {
    setActiveIndex(index);
    switch (menuItems[index].name) {
      case "Home":
        setNavigation("HomePage");
        break;
      case "Bookings":
        setNavigation("bookings");
        break;
      case "Whishlist":
        setNavigation("whishlist");
        break;
      case "Packages":
        setNavigation("packages");
        break;
      default:
        setNavigation("HomePage");
    }
  };

  const handleScroll = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {navigation === "HomePage" && (
        <div className="Client_home_page">
          <nav>
            <img src={companyLogo} className="logo" alt="" />
            {/* <div className="search_container">
                <SearchBar />
              </div> */}
            <ul>
              <li className="dropdown" onClick={toggleDropdown}>
                <p style={{ cursor: "pointer" }}>Find Artist</p>{" "}
                {showDropdown && (
                  <div className="dropdown-menu">
                    <div className="categories">
                      {categories.map((title, index) => (
                        <div className="wrapper_category" key={index}>
                          <div className="category_name">{title.name}</div>
                        </div>
                      ))}
                    </div>

                    <div className="popular_search">
                      <h1>Popular Search</h1>
                      {popular_search.map((title, index) => (
                        <div className="wrapper" key={index}>
                          <div className="title_container">{title.name}</div>
                        </div>
                      ))}
                    </div>

                    <div className="image_container">
                      <img src={AfterLoginsliderImage1} alt="dropdown" />
                    </div>
                  </div>
                )}
              </li>
              <li style={{ cursor: "pointer" }}>How it Works</li>
            </ul>

            <div
              className="profile_container"
              onClick={toggleProfileBox}
              ref={profileContainerRef}
            >
              <img src={profile} alt="profile" />
            </div>
          </nav>
          {showProfileBox && (
            <div className="profile-box" ref={profileBoxRef}>
              <ul>
                <li
                  onClick={() => {
                    setNavigation("userProfile");
                  }}
                >
                  <img src={userProfileIcon} alt="userProfile" />
                  View Profile
                </li>
                <li
                  onClick={() => {
                    setNavigation("bookings");
                  }}
                >
                  <img src={booking} alt="booking" />
                  Bookings
                </li>
                <li
                  style={{ borderBottom: "1px solid black" }}
                  onClick={() => {
                    setNavigation("whishlist");
                  }}
                >
                  <img src={heart} alt="whishlist" />
                  Wishlist
                </li>
                <li onClick={handle_user_logout}>
                  <img src={logout} alt="logout" />
                  Logout
                </li>
              </ul>
            </div>
          )}
          <div className="home_page_after_login">
            <div className="slider_section">
              <div className="center_text_section">
                <h1>Capture Your Moments with Top Photographer!</h1>
                <h3>Find,Select and Book Photographer Easily</h3>
              </div>

              <Swiper
                modules={[Pagination, Autoplay]}
                autoplay={{ delay: 5000 }}
                loop={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
                  display: "flex",
                }}
                className="image-swiper"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
              >
                {photos.length > 0 ? (
                  photos.map((photo, index) => (
                    <SwiperSlide key={index} className="swiper-slide">
                      <img
                        src={photo.imgUrl}
                        alt={`Slide ${index}`}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />

                      <div className="photographer-container">
                        <img
                          src={photo.PhotographerUrl || profile} // Default to profile if no photographer image
                          alt="Photographer"
                          className="photographer-image"
                        />
                        <div className="name_and_speciality">
                          <h4>
                            {photo.PhotographerName || "Unknown Photographer"}
                          </h4>
                          <p>{photo.Speciality || "No Speciality defined"}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                ) : (
                  <p>Loading images...</p>
                )}
                <div className="swiper-pagination" />
              </Swiper>

              <button
                className="explorePhotographer"
                onClick={() => {
                  setNavigation("Photographer");
                }}
              >
                Explore Photographer
              </button>
            </div>
            <div className="category_of_photography">
              <div
                className="category"
                onClick={() => handleScroll("all_photogrpaher")}
              >
                All Photographer
              </div>
              <div className="category" onClick={() => handleScroll("wedding")}>
                Wedding
              </div>
              <div
                className="category"
                onClick={() => handleScroll("pre_wedding")}
              >
                Pre Wedding
              </div>
              <div
                className="category"
                onClick={() => handleScroll("baby_shower")}
              >
                Baby Shower
              </div>
              <div
                className="category"
                onClick={() => handleScroll("videography")}
              >
                VideoGraphy
              </div>
              <div
                className="category"
                onClick={() => handleScroll("equipment")}
              >
                Equipment
              </div>
            </div>
          </div>
          <div className="all_photogrpher" id="all_photogrpaher">
            all Photographer
          </div>
          <div className="Wedding" id="wedding">
            wedding
          </div>
          <div className="pre_wedding" id="pre_wedding">
            pre wedding
          </div>
          <div className="baby_shower" id="baby_shower">
            baby shower
          </div>
          <div className="videography" id="videography">
            videogrpahy
          </div>
          <div className="equipment" id="equipment">
            equipment
          </div>
        </div>
      )}

      {/* <div
        className="side_bar"
        style={{ width: isSidebarOpen ? "340px" : "70px" }}
      >
        <div
          className="toggle_button_con"
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        >
          {isSidebarOpen ? (
            <img src={close} alt="" />
          ) : (
            <img src={menu} alt="" />
          )}
        </div>
        <div className="side_bar_title">
          <div className="title_bar_img">
            <img src={menu} alt="" />
          </div>
          {isSidebarOpen && <div className="title_bar_text">Owner </div>}
        </div>

        <div className="category_con">
          {activeIndex <= menuItems.length && (
            <div
              className={`active_me_slider ${isSidebarOpen ? "" : ""}`}
              style={{
                top: `${activeIndex * 60}px`,
                transition: "all 0.2s ease-in-out",
              }}
            >
              {isSidebarOpen && <div className="side_menu"></div>}
            </div>
          )}

          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`item ${index === activeIndex && "active"}`}
              onClick={() => handleItemClick(index)}
            >
              <div className="icon">
                {item.active_icon ? (
                  activeIndex === index ? (
                    <img src={item.active_icon} alt={item.name} />
                  ) : (
                    <img src={item.icon} alt={item.name} />
                  )
                ) : (
                  <img src={item.icon} alt={item.name} />
                )}
              </div>
              {isSidebarOpen && <div className={`text`}>{item.name}</div>}
            </div>
          ))}
        </div>

        <div
          className="user_profile"
          onClick={() => {
            setNavigation("userProfile");
            setActiveIndex(menuItems.length + 1);
          }}
        >
          <div className="user_icon_1">
            <img src={profile} alt="" />
          </div>
          {isSidebarOpen && (
            <div className="user_data">
              <div className="user_name">{userName}</div>
              <div className="user_email">{userEmail}</div>
            </div>
          )}
        </div>
      </div> */}

      {navigation === "userProfile" && <UserProfilePage />}
      {navigation === "bookings" && <Bookings />}
      {navigation === "whishlist" && <WhishList />}
      {navigation === "Photographer" && <Photographer />}
    </>
    //   <nav>
    //   <h2>Welcome, {userName ? userName : "User"}!</h2>
    //   <p>Email: {userEmail ? userEmail : "not found"}</p>
    // </nav>

    // <button onClick={handle_user_logout}>Logout</button>
  );
}

export default HomePage;
