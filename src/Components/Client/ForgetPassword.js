import { React, useState } from "react";
import "./CSS File/ForgetPassword.css";
import CustomInputField from "./sub_component/CustomInputField.js";
import close from "./../../Assets/Client/close.png";

function ForgetPassword({ set_show_forget_password }) {
  const [forget_email, set_forget_email] = useState("");
  const [forget_email_error, set_forget_email_error] = useState("");

  const [password, set_password] = useState("");
  const [password_error, set_password_error] = useState("");
  const [confirm_password, set_confirm_password] = useState("");
  const [confirm_password_error, set_confirm_password_error] = useState("");

  const [otp, set_otp] = useState("");
  const [otp_error, set_otp_error] = useState("");

  const [forget_first, set_forget_first] = useState(true);
  const validate_email = (email) => {
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email_pattern.test(email);
  };

  function handleSubmit(e) {
    e.preventDefault();
    let is_valid = true;
    if (validate_email(forget_email)) {
      set_forget_email_error(" ");
    } else {
      set_forget_email_error("Invalid email");
      is_valid = false;
    }

    if (otp.length < 4) {
      set_otp_error("invalid OTP or Enter valid field");
      is_valid = false;
    } else {
      set_otp_error(" ");
    }
    if (is_valid) {
      console.log("validated");
      set_forget_first(false);
    }
  }
  function handle_password_change(e) {
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
      alert("Password changed Successfuly");
      return;
    }
  }

  return (
    <div className="forgetPassword_con">
      <img src={close} alt="close_image" onClick={set_show_forget_password} />

      {forget_first ? (
        <form onSubmit={handleSubmit}>
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
          />
          <CustomInputField
            type={"text"}
            label={"OTP"}
            id={"otp"}
            name={"otp"}
            value={otp}
            error={otp_error}
            onChange={(e) => {
              set_otp(e.target.value);
            }}
          />
          <button className="forget_button" type="submit">
            {" "}
            Send OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handle_password_change}>
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
  );
}
export default ForgetPassword;
