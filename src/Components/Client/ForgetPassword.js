import { React, useState } from "react";
import "./CSS File/ForgetPassword.css";
import CustomInputField from "./sub_component/CustomInputField.js";
import close from "./../../Assets/Client/close.png";
import leftArrow from "./../../Assets/Client/left-arrow.png";
import { data } from "react-router-dom";
function ForgetPassword({ set_show_forget_password }) {
  const [forget_email, set_forget_email] = useState("");
  const [forget_email_error, set_forget_email_error] = useState("");

  const [password, set_password] = useState("");
  const [password_error, set_password_error] = useState("");
  const [confirm_password, set_confirm_password] = useState("");
  const [confirm_password_error, set_confirm_password_error] = useState("");

  const [otp, set_otp] = useState("");
  const [otp_error, set_otp_error] = useState("");

  const [is_email_valid, set_is_email_valid] = useState(false);

  const [forget_first, set_forget_first] = useState(true);
  const validate_email = (email) => {
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email_pattern.test(email);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let is_valid = true;

    if (otp.length < 4) {
      set_otp_error("invalid OTP or Enter valid field");
      is_valid = false;
    } else {
      set_otp_error(" ");
    }
    if (is_valid) {
      try {
        const response = await fetch(
          "http://localhost:4000/verify_forget_otp_client",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: forget_email,
              type: "client",
              otp: otp,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            alert(data.message);
            set_forget_first(false);
          } else {
            alert(data.message);
          }
        } else {
          const errorText = await data.message;
          console.error("Error response:", errorText);
          alert("An error occurred while verifying the email.");
        }
      } catch (e) {
        console.log("error occured while fetching data", e);
        alert("error occured while fetching data");
      }

      console.log("validated");
    }
  }

  async function handle_password_change(e) {
    e.preventDefault();
    let is_valid = true;
    if (password.length < 4) {
      set_password_error("Length must be at least 4 characters");
      is_valid = false;
    } else if (!/\d/.test(password)) {
      set_password_error("Must contain at least one digit");
      is_valid = false;
    } else if (!/[a-zA-Z]/.test(password)) {
      set_password_error("Must contain at least one letter");
      is_valid = false;
    } else if (!/[A-Z]/.test(password)) {
      set_password_error("Must contain at least one uppercase letter");
      is_valid = false;
    } else {
      set_password_error("");
    }

    if (password !== confirm_password) {
      set_confirm_password_error("Password does not match");
    } else {
      set_confirm_password_error("");
    }

    if (is_valid) {
      try {
        const response = await fetch(
          "http://localhost:4000/client_password_verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: password, email: forget_email }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            console.log(data.message);

            alert("Password changed Successfuly");
            set_show_forget_password(false);
          } else {
            alert(data.message);
          }
        } else {
          console.error("response error");
          alert("response error");
        }
      } catch (e) {
        console.error("error occurred while fetching data", e);
        alert("error occurred while fetching data");
      }
    }
  }

  const handle_second_close = () => {
    if (password === "" && confirm_password === "") {
      let userResult = window.confirm("Are you sure you want to quit?");
      if (userResult) {
        set_show_forget_password(false);
      }
    }
    if (password && confirm_password) {
      let userResult = window.confirm(
        "Password will not be changed if you close"
      );
      if (userResult) {
        set_show_forget_password(false);
      }
    }
  };

  const handle_email_check = async (e) => {
    e.preventDefault();

    let is_valid = true;
    if (validate_email(forget_email)) {
      set_forget_email_error(" ");
    } else {
      set_forget_email_error("Invalid email");
      is_valid = false;
    }

    if (is_valid) {
      try {
        const response = await fetch(
          "http://localhost:4000/client_email_verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: forget_email }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            alert("Email exists in the system.");
            set_is_email_valid(true);
          } else {
            alert(data.message);
          }
        } else {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          alert("An error occurred while verifying the email.");
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="overlay">
      <div className="forgetPassword_con">
        {forget_first ? (
          <form onSubmit={handleSubmit} className="first_form">
            <img
              src={close}
              alt="close_image"
              onClick={set_show_forget_password}
              className="closeImage"
            />
            <h2>Forgot your password</h2>
            <p>Enter your email address to change password.</p>

            <CustomInputField
              type={"text"}
              label={"Email"}
              id={"forget_email"}
              name={"forget_email"}
              value={forget_email}
              error={forget_email_error}
              onChange={(e) => {
                set_forget_email(e.target.value);
              }}
              width="300px"
            />

            <div
              className="Login_register_input_group"
              style={{ opacity: `${!is_email_valid ? "0.5" : "1"}` }}
            >
              <input
                type={"text"}
                id={"otp"}
                name={"otp"}
                value={otp}
                onChange={(e) => {
                  set_otp(e.target.value);
                }}
                disabled={!is_email_valid ? true : false}
                required
              />
              <span className="bar"></span>
              <label htmlFor={"otp"}>{"OTP"}</label>

              <div id={`set_otp_error`} className="all_error_for_input">
                {otp_error}
              </div>
            </div>
            {!is_email_valid ? (
              <button onClick={handle_email_check} className="forget_button">
                Send OTP
              </button>
            ) : (
              <button
                className="forget_button"
                type="submit"
                onSubmit={handleSubmit}
              >
                {" "}
                Continue
              </button>
            )}
          </form>
        ) : (
          <form onSubmit={handle_password_change} className="second_form">
            <img
              src={close}
              alt="close_image"
              onClick={handle_second_close}
              className="closeImage"
            />
            <img
              src={leftArrow}
              alt=""
              className="backImage"
              onClick={() => {
                set_forget_first(true);
              }}
            />
            <p>Reset Your Password</p>
            <CustomInputField
              type={"password"}
              label={"Enter Password"}
              id={"password"}
              name={"password"}
              value={password}
              error={password_error}
              onChange={(e) => {
                set_password(e.target.value);
              }}
            />
            <CustomInputField
              type={"password"}
              label={"Confirm Password"}
              id={"confirm_password"}
              name={"confirm_password"}
              value={confirm_password}
              error={confirm_password_error}
              onChange={(e) => {
                set_confirm_password(e.target.value);
              }}
            />
            <button className="forget_button">Password Change</button>
          </form>
        )}
      </div>
    </div>
  );
}
export default ForgetPassword;
