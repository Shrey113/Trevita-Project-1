import React, { useState } from "react";
import "./CSS File/login_register.css";
import { CustomInputField } from "./sub_component/CustomInputField";
import Login_page_photo from "./../../Assets/Client/Login_page_photo.jpg";
import Register_page_photo from "./../../Assets/Client/Register_page_photo.jpg";
function LoginRegister() {
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

  const handle_login_submit = (event) => {
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
      console.log("good in login");
    }
  };

  const handle_register_submit = (e) => {
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
    // set_register_confirm_password("");
    if (is_valid) {
      console.log("good in register");
    }
  };
  return (
    <div className="Main_Container">
      {/* for register page */}

      <div
        className={`Register_Page ${!isLoginVisible ? "active" : ""}`}
        onSubmit={handle_register_submit}
      >
        <div className="register_form">
          <img src={Register_page_photo} alt="" />

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
              <span
                onClick={toggle_login_register}
                style={{ cursor: "pointer", color: "blue" }}
              >
                {" "}
                Login
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* for login page */}

      <div
        className={`Login_Page ${isLoginVisible ? "active" : ""}`}
        onSubmit={handle_login_submit}
      >
        <div className="login_form">
          <img src={Login_page_photo} alt="" />

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
            <p></p>
            <button id="custom_button">Login</button>

            <div className="terms_conditions">
              <input
                type="checkbox"
                id="terms_login"
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
              />
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
              New user?
              <span
                onClick={toggle_login_register}
                style={{ cursor: "pointer", color: "blue" }}
              >
                {" "}
                Register
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;