import React, { useState } from "react";
import "./CSS File/login_register.css";
import { CustomInputField } from "./sub_component/CustomInputField";

import ForgetPassword from "./ForgetPassword";

import Login_page_photo1 from "./../../Assets/Client/Login_page_photo1.jpg";
import Login_page_photo2 from "./../../Assets/Client/Login_page_photo2.jpg";
import Login_page_photo3 from "./../../Assets/Client/Login_page_photo3.jpg";
import Login_page_photo4 from "./../../Assets/Client/Login_page_photo4.jpg";

import Register_page_photo1 from "./../../Assets/Client/Register_page_photo1.jpg";
import Register_page_photo2 from "./../../Assets/Client/Register_page_photo2.jpg";
import Register_page_photo3 from "./../../Assets/Client/Register_page_photo3.jpg";
import Register_page_photo4 from "./../../Assets/Client/Register_page_photo4.jpg";

import close from "./../../Assets/Client/close.png";
import ShowLoder from "./../Owener/sub_components/show_loder";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import { localstorage_key_for_client } from "./../../redux/AllData";

function LoginRegisterClient() {
  const [isLoginVisible, setIsLoginVisible] = useState(true);

  const [login_password, set_login_password] = useState("");
  const [login_password_error, set_login_password_error] = useState("");
  const [login_email, set_login_email] = useState("");
  const [login_email_error, set_login_email_error] = useState("");

  const [register_username, set_register_username] = useState("");
  const [register_username_error, set_register_username_error] = useState("");
  const [register_password, set_register_password] = useState("");
  const [register_password_error, set_register_password_error] = useState("");
  const [register_confirm_password, set_register_confirm_password] =
    useState("");
  const [register_confirm_password_error, set_register_confirm_password_error] =
    useState("");
  const [register_email, set_register_email] = useState("");
  const [register_email_error, set_register_email_error] = useState("");

  const [termsChecked, setTermsChecked] = useState(false);
  const [termsError, setTermsError] = useState("");

  const [show_forget_password, set_show_forget_password] = useState(false);
  const [isShowLoader, setIsShowLoader] = useState(false);

  // for otp send verification
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const Server_url = "http://localhost:4000";

  const toggle_login_register = () => {
    setIsLoginVisible(!isLoginVisible);
    setTermsChecked(false);
    setTermsError("");
  };

  // for register
  const handle_register_username_change = (e) => {
    set_register_username(e.target.value);
  };
  const handle_register_email_change = (e) => {
    set_register_email(e.target.value);
  };

  const handle_register_password_change = (e) => {
    set_register_password(e.target.value);
  };
  const handle_register_conf_password_change = (e) => {
    set_register_confirm_password(e.target.value);
  };

  // for login
  const handle_login_password_change = (e) => {
    set_login_password(e.target.value);
  };
  const handle_login_email_change = (e) => {
    set_login_email(e.target.value);
  };

  const validate_email = (email) => {
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email_pattern.test(email);
  };

  const handle_login_submit = async (event) => {
    event.preventDefault();

    // for login email and password error
    let is_valid = true;
    if (validate_email(login_email)) {
      set_login_email_error("");
    } else {
      set_login_email_error("Invalid email");
      is_valid = false;
    }

    if (!termsChecked) {
      setTermsError("You must agree to the terms and conditions.");
      return;
    }
    setTermsError("");
    if (is_valid) {
      console.log("Submitting login request");

      try {
        const response = await fetch(`${Server_url}/client/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_email: login_email,
            user_password: login_password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Login successful:", data);

          // Perform actions after successful login
          set_login_password_error("");
          set_login_email_error("");

          if (!data.jwt_token) {
            alert("jwt not available");
          }
          localStorage.setItem(localstorage_key_for_client, data.jwt_token);
          setIsShowLoader(true);

          setTimeout(() => {
            setIsShowLoader(false);
          }, 3000);

          setTimeout(() => {
            window.location.reload();
          }, 4000);

          // Redirect to another page or store token/user info
        } else if (response.status === 401) {
          set_login_password_error("Invalid email or password");
        } else {
          console.error("Server-side error occurred");
          alert("An error occurred on the server. Please try again later.");
        }
      } catch (error) {
        console.error("Error occurred on the client side:", error);
        alert("Failed to connect to the server. Please check your connection.");
      }
    }
  };

  const handle_register_submit = async (e) => {
    e.preventDefault();
    let is_valid = true;

    if (!termsChecked) {
      setTermsError("You must agree to the terms and conditions.");
      return;
    }
    setTermsError("");

    if (register_username.length < 4) {
      set_register_username_error("Length must be 4 characters");
      is_valid = false;
    } else {
      set_register_username_error("");
    }

    if (validate_email(register_email)) {
      set_register_email_error("");
    } else {
      set_register_email_error("Invalid email");
      is_valid = false;
    }

    const temp_password = register_password;
    if (temp_password.length < 4) {
      set_register_password_error("Length must be at least 4 characters");
      is_valid = false;
    } else if (!/\d/.test(temp_password)) {
      set_register_password_error("Must contain at least one digit");
      is_valid = false;
    } else if (!/[a-zA-Z]/.test(temp_password)) {
      set_register_password_error("Must contain at least one letter");
      is_valid = false;
    } else if (!/[A-Z]/.test(temp_password)) {
      set_register_password_error("Must contain at least one uppercase letter");
      is_valid = false;
    } else {
      set_register_password_error("");
    }

    if (register_password !== register_confirm_password) {
      set_register_confirm_password_error("Passwords must match");
      is_valid = false;
    } else {
      set_register_confirm_password_error("");
    }
    if (is_valid) {
      console.log("Registering user...");
      const Data = {
        user_name: register_username,
        user_email: register_email,
        user_password: register_password,
      };
      try {
        const response = await fetch(`${Server_url}/client/register_user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Client added successfully", data);
          setOtp("");
          setShowOtpModal(true);
          // Send OTP email to the user
          await fetch(`${Server_url}/send_otp_email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: register_email, type: "client" }),
          });
        } else {
          console.log("Error adding client: ", data.error);
          if (data.error === "Email already exists") {
            set_register_email_error(data.error);
          } else if (data.error === "Username already exists") {
            set_register_username_error(data.error);
          } else {
            console.error("Unexpected error: ", data.error);
          }
        }
      } catch (e) {
        console.error("Error occured at client side ", e);
      }
    }
  };

  const handleOtpVerification = async () => {
    if (otp.length !== 6) {
      setOtpError("OTP must be 6 digits");
      return;
    }

    try {
      const response = await fetch(`${Server_url}/verify_otp_client`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: register_username,
          email: register_email,
          password: register_password,
          otp: otp,
          type: "client",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("OTP verified successfully");
        setShowOtpModal(false);

        // process of going to home page

        localStorage.setItem(localstorage_key_for_client, data.user_key);
        window.location.reload();
      } else {
        setOtpError(data.error || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="Main_Container">
      {isShowLoader ? <ShowLoder /> : ""}
      {/* for register page */}

      <div
        className={`Register_Page ${!isLoginVisible ? "active" : ""}`}
        onSubmit={handle_register_submit}
      >
        {showOtpModal && (
          <div className="otp-modal">
            <img
              src={close}
              alt=""
              style={{
                height: "17px",
                width: "17px",
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
              onClick={() => {
                setShowOtpModal(false);
              }}
            />
            <h2 style={{ width: "100%", textAlign: "left" }}>
              <span style={{ color: "rgb(91, 91, 238)" }}>Verify</span> OTP
            </h2>
            <div className="input_and_submit_button">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                maxLength="6"
              />
              {otpError && <p className="error">{otpError}</p>}
              <button onClick={handleOtpVerification}>Verify OTP</button>
            </div>
          </div>
        )}
        <div className="register_form">
          {/* <div className="swiper_contianer_wrapper"> */}

          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 2000 }}
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
            <SwiperSlide>
              <img
                src={Register_page_photo1}
                alt="Slide 1"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={Register_page_photo2}
                alt="Slide 2"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={Register_page_photo3}
                alt="Slide 3"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={Register_page_photo4}
                alt="Slide 4"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
            <div className="swiper-pagination" />
          </Swiper>
        </div>

        <form className="all_fields">
          <h1>Register</h1>
          <CustomInputField
            type={"text"}
            label={"User Name"}
            id={"login_username"}
            name={"register_username"}
            value={register_username}
            error={register_username_error}
            onChange={handle_register_username_change}
          />
          <CustomInputField
            type={"text"}
            label={"Email"}
            id={"register_email"}
            name={"register_email"}
            value={register_email}
            error={register_email_error}
            onChange={handle_register_email_change}
          />
          <CustomInputField
            type={"password"}
            label={"Password"}
            id={"register_password"}
            name={"register_password"}
            value={register_password}
            error={register_password_error}
            onChange={handle_register_password_change}
          />
          <CustomInputField
            type={"password"}
            label={"Confirm Password"}
            id={"register_conf_password"}
            name={"register_conf_password"}
            value={register_confirm_password}
            error={register_confirm_password_error}
            onChange={handle_register_conf_password_change}
          />

          <button id="custom_button">Register</button>

          <div className="terms_conditions">
            <input
              type="checkbox"
              id="terms_register"
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
            />
            <label htmlFor="terms_register">
              I agree to the terms and conditions
            </label>
            {termsError && (
              <p className="error" style={{ color: "red" }}>
                {termsError}
              </p>
            )}
          </div>

          <p>
            Already have an account?
            <span onClick={toggle_login_register}> Login</span>
          </p>
        </form>
      </div>

      {/* for login page */}
      <div
        className={`Login_Page ${isLoginVisible ? "active" : ""}`}
        onSubmit={handle_login_submit}
      >
        <div className="login_form">
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 2000 }}
            loop={true}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            className="image-swiper"
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <SwiperSlide>
              <img
                src={Login_page_photo1}
                alt="Slide 1"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={Login_page_photo2}
                alt="Slide 2"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={Login_page_photo3}
                alt="Slide 3"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={Login_page_photo4}
                alt="Slide 4"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
            <div className="swiper-pagination" />
          </Swiper>
        </div>
        <form className="all_fields">
          <h1>Login</h1>
          <CustomInputField
            type={"text"}
            label={"Email"}
            id={"login_email"}
            name={"login_email"}
            value={login_email}
            error={login_email_error}
            onChange={handle_login_email_change}
          />
          <CustomInputField
            type={"password"}
            label={"Password"}
            id={"login_password"}
            name={"login_password"}
            value={login_password}
            error={login_password_error}
            onChange={handle_login_password_change}
          />
          <span className="forgot_password_container">
            <p
              className="forgot_password"
              onClick={() => {
                set_show_forget_password(!show_forget_password);
              }}
            >
              {" "}
              forgot password?{" "}
            </p>
          </span>
          <button id="custom_button">Login</button>

          <div className="terms_conditions">
            <input
              type="checkbox"
              id="terms_login"
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
            />
            {"  "}
            <label htmlFor="terms_login">
              I agree to the terms and conditions
            </label>
            {termsError && (
              <p className="error" style={{ color: "red" }}>
                {termsError}
              </p>
            )}
          </div>

          <p>
            Are you new user?
            <span onClick={toggle_login_register}> Register</span>
          </p>
        </form>
        {/* </div> */}
      </div>
      {show_forget_password && (
        <ForgetPassword
          set_show_forget_password={() => {
            set_show_forget_password(false);
          }}
        />
      )}
    </div>
  );
}

export default LoginRegisterClient;
