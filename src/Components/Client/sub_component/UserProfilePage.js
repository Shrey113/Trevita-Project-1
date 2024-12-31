import { React, useState, useEffect } from "react";
import "./CSS Files/UserProfilePage.css";

import {
  localstorage_key_for_client,
  Server_url,
} from "./../../../redux/AllData";

import ProfilePageBackground from "./../../../Assets/Client/AfterLogin/ProfilePageBackground.png";
import defaultProfile from "./../../../Assets/BeforeLogin/mainLogo.jpeg";
import update_profile from "./../../../Assets/Client/AfterLogin/update_profile.png";
import back from "./../../../Assets/Client/AfterLogin/back.png";
import close from "./../../../Assets/BeforeLogin/close.png";
import HomePage from "../HomePage";

function UserProfilePage() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  const [initialUserName, setInitialUserName] = useState("");
  const [initialPhone, setInitialPhone] = useState("");
  const [initialAddress, setInitialAddress] = useState("");
  const [initialGender, setInitialGender] = useState("");

  const [image, setImage] = useState(null);

  const [base64Image, setBase64Image] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [imageSavePopup, setImageSavePopup] = useState(false);
  const [user_data_popup, set_user_data_popup] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [showSaveInfo, setShowSaveInfo] = useState(false);

  const [update_cancel_toggle, set_update_cancel_toggle] = useState(true);
  const [mainPage, setMainPage] = useState("userProfile");

  const [bookingData, setBookingData] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setBase64Image(reader.result.split(",")[1]);
        setShowSaveButton(true);
      };
      reader.readAsDataURL(file); // Read file as Data URL
    }
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
              setInitialUserName(result.data.user_name);

              // Fetch additional data (phone, address, gender) using user_email
              const email = result.data.user_email;

              const userDataResponse = await fetch(
                `${Server_url}/api/get-user-data`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ email }),
                }
              );

              const userDataResult = await userDataResponse.json();

              if (userDataResponse.ok) {
                // Assuming the result contains the fields you need
                setPhone(userDataResult.phone);
                setAddress(userDataResult.address);
                setGender(userDataResult.gender);

                // Set initial values for comparison later
                setInitialPhone(userDataResult.phone);
                setInitialAddress(userDataResult.address);
                setInitialGender(userDataResult.gender);
              } else {
                console.log(
                  userDataResult.message || "Failed to fetch user data."
                );
              }
            }
          }
        } else {
          console.log(result);
        }
      } catch (err) {
        console.error("Client token check error", err);
      }
    };

    checkUserToken();
  }, []);

  const saveImageToDatabase = async () => {
    // for little tasks

    setShowSaveButton(false);
    setImageSavePopup(true);
    setTimeout(() => {
      setImageSavePopup(false);
    }, 3000);
  };

  const saveUserProfile = async () => {
    const updatedProfile = {
      user_email: userEmail,
      user_name: userName,
      phone: phone,
      address: address,
      gender: gender,
    };

    try {
      const response = await fetch(`${Server_url}/api/update-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      const result = await response.json();

      if (response.ok) {
        // alert("Profile updated successfully!");
        setInitialUserName(userName);
        setInitialPhone(phone);
        setInitialAddress(address);
        setInitialGender(gender);
        setShowSaveInfo(false);
      } else {
        alert(result.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile.");
    }
    set_user_data_popup(true);
    setTimeout(() => {
      set_user_data_popup(false);
    }, 3000);
  };

  const handleButtonClick = () => {
    document.querySelector(".file-input").click();
  };

  const handleUpdateField = () => {
    setIsEditable(true);
    set_update_cancel_toggle(false);
  };
  const handleCancleField = () => {
    set_update_cancel_toggle(true);
    setIsEditable(false);
  };
  const handleSaveChanges = () => {
    saveUserProfile();
    setIsEditable(false);
    setShowSaveInfo(false);
    set_update_cancel_toggle(true);
    // alert("Changes saved successfully!");

    // Update initial values to match saved changes
    setInitialUserName(userName);
    setInitialPhone(phone);
    setInitialAddress(address);
    setInitialGender(gender);
  };
  const handleInputChange = (setter, initialValue) => (event) => {
    const value = event.target.value;
    setter(value);

    // Dynamically compare input with initial value
    const hasChanged =
      (setter === setUserName && value !== initialUserName) ||
      (setter === setPhone && value !== initialPhone) ||
      (setter === setAddress && value !== initialAddress) ||
      (setter === setGender && value !== initialGender);

    setShowSaveInfo(hasChanged);
  };

  const handleBack = () => {
    setMainPage("HomePage");
  };
  return (
    <>
      {mainPage === "userProfile" && (
        <div className="user_profile_page_main">
          <div className="back_button">
            <img src={back} alt="forBack" onClick={handleBack} />
          </div>

          <div className="image_container">
            <div className="user_information_card">
              <div className="user_profile_and_location">
                <div className="image_preview" onClick={handleButtonClick}>
                  {image ? (
                    <img src={image} alt="Uploaded Preview" />
                  ) : (
                    <img src={defaultProfile} alt="Uploaded Preview" />
                  )}
                </div>
                {showSaveButton ? (
                  <button className="save_button" onClick={saveImageToDatabase}>
                    Save Image
                  </button>
                ) : (
                  <button className="upload_button" onClick={handleButtonClick}>
                    Upload Image
                  </button>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                />
              </div>
              <div className="user_information">
                {update_cancel_toggle ? (
                  <button className="update_button" onClick={handleUpdateField}>
                    <img src={update_profile} alt="update_profile" />
                  </button>
                ) : (
                  <button className="cancel_button" onClick={handleCancleField}>
                    <img src={close} alt="close" />
                  </button>
                )}

                <div className="userInfo">
                  <label htmlFor="userName">User Name : </label>
                  <input
                    type="text"
                    htmlFor="uesrName"
                    value={userName}
                    disabled={!isEditable}
                    onChange={handleInputChange(setUserName, initialUserName)}
                  />
                </div>
                <div className="userInfo">
                  <label htmlFor="userEmail">Email : </label>
                  <input
                    type="text"
                    htmlFor="uesrEmail"
                    value={userEmail}
                    disabled={true}
                  />
                </div>
                <div className="userInfo">
                  <label htmlFor="userPhone">Phone : </label>
                  <input
                    type="text"
                    htmlFor="userPhone"
                    value={phone}
                    disabled={!isEditable}
                    onChange={handleInputChange(setPhone, initialPhone)}
                    pattern="[1-9]{1}[0-9]{9}"
                    maxlength="10"
                    placeholder="Enter Phone..."
                  />
                </div>
                <div className="userInfo">
                  <label htmlFor="userAddress">Address : </label>
                  <input
                    type="text"
                    htmlFor="userAddress"
                    value={address}
                    disabled={!isEditable}
                    onChange={handleInputChange(setAddress, initialAddress)}
                    placeholder="Enter Address..."
                  />
                </div>
                <div className="userInfo">
                  <label htmlFor="userGender">Gender : </label>
                  <select
                    value={gender}
                    disabled={!isEditable}
                    onChange={handleInputChange(setGender, initialGender)}
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {showSaveInfo && (
                  <button className="save_button" onClick={handleSaveChanges}>
                    Apply
                  </button>
                )}
              </div>
            </div>
            <img src={ProfilePageBackground} alt="profilepagebackground" />
          </div>

          <div className="order_information_container">
            <h1>Bookings</h1>
            <div className="all_bookings">
              {bookingData ? <></> : <p>No data Found !</p>}
            </div>
          </div>
          {imageSavePopup && (
            <div className="save_image_message">
              Your Image Saved Successfully !
            </div>
          )}
          {user_data_popup && (
            <div className="save_user_data_message">
              Data Saved Successfully !
            </div>
          )}
        </div>
      )}

      {mainPage === "HomePage" && <HomePage />}
    </>
  );
}
export default UserProfilePage;
