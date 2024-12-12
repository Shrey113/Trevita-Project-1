import React, { useState } from "react";
import eye_visible from "./../../../Assets/Client/eye_visible.jpg";
import eye_hide from "./../../../Assets/Client/eye_hide.jpg";

export const CustomInputField = ({
  id,
  type,
  value,
  onChange,
  label,
  error,
  name,
  width,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="Login_register_input_group">
      <input
        type={isPasswordVisible ? "text" : type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        style={{ width: width || "300px" }}
        required
      />
      <span className="bar"></span>
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="show_password_button"
        >
          <img
            src={isPasswordVisible ? eye_visible : eye_hide}
            alt="Toggle Password Visibility"
          />
        </button>
      )}

      <label htmlFor={id}>{label}</label>

      {error && (
        <div id={`${id}_error`} className="all_error_for_input">
          {error}
        </div>
      )}
    </div>
  );
};
export default CustomInputField;
