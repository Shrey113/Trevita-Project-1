import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./OwnerProfile.css";

import back_test_owner from "./../img/test_profile/test_1.jpg";
import user_backicon from "./../img/test_profile/tesst_profile.png";
import instagram_icon from "./../img/instagram.png";
import edit_icon from "./../img/edit.png";
import save_icon from "./../img/diskette.png";

import bag_icon from "./../img/owner_into/briefcase.png";
import adrees_icon from "./../img/owner_into/location.png";
import email_icon from "./../img/owner_into/mail.png";
import phone_icon from "./../img/owner_into/phone-call.png";

import { Server_url } from "./../../../redux/AllData.js";
import MorePartProfile from "./MorePartProfile.js";

function OwnerProfile() {
  const user = useSelector((state) => state.user);
  const [isEditable, setIsEditable] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };
  const [introTexts, setIntroTexts] = useState([
    { icon: email_icon, text: user.user_email || "", placeholder: "Email" },
    {
      icon: phone_icon,
      text: user.mobile_number || "",
      placeholder: "Phone Number",
    },
    {
      icon: adrees_icon,
      text: user.business_address || "",
      placeholder: "Address",
    },
    { icon: bag_icon, text: user.business_name || "", placeholder: "Work" },
  ]);
  const [hasChanges, setHasChanges] = useState(false);

  const toggleEditable = () => {
    setIsEditable((prevState) => !prevState);
  };

  const handleInputChange = (index, value) => {
    const updatedTexts = [...introTexts];
    updatedTexts[index].text = value;
    setIntroTexts(updatedTexts);
    setHasChanges(true);
  };

  const updateOwner = () => {
    const data = {
      user_email: user.user_email,
      mobile_number: introTexts[1].text,
      business_address: introTexts[2].text,
      business_name: introTexts[3].text,
    };

    fetch(`${Server_url}/owner/update-owner`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.error || "An error occurred");
          });
        }
        return response.json();
      })
      .then((result) => {
        setHasChanges(false);
        setIsEditable(false);
      })
      .catch((error) => {
        alert(error.message || "Failed to update");
      });
  };

  const subSubData = ({ icon, text, placeholder }, index) => {
    return (
      <div className="data_con" key={index}>
        <div className="icon">
          <img src={icon} alt="" />
        </div>
        <div
          className={`text ${
            isEditable && placeholder !== "Email" ? "editable" : "read-only"
          }`}
        >
          <input
            type="text"
            placeholder={placeholder}
            value={text}
            readOnly={placeholder === "Email" ? true : !isEditable}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="OwnerProfile_con">
      <div className="section_1">
        <div className="Owner_data_section_con">
          <div className="data_con">
            <div className="top_section_img">
              <div className="back_img">
                <img src={back_test_owner} alt="" />
              </div>
              <div className="user_profile_i">
                <img src={user_backicon} alt="" />
              </div>
            </div>
            <div className="bottom_section_info">
              <div className="user_data">
                <div className="user_info">
                  <div className="user_name">{user.user_name}</div>
                  <div className="small_about_user">CMO at Single Fire</div>
                </div>
                <div className="user_other_icon">
                  <div className="icon_img">
                    <img src={instagram_icon} alt="Instagram" />
                  </div>
                  <div className="icon_img">
                    <img src={instagram_icon} alt="Instagram" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="intro_section_con">
          <div className="intro_section">
            <div className="title">
              Intro
              {hasChanges ? (
                <div className="edite_button_container" onClick={updateOwner}>
                  <img src={save_icon} alt="Edit" />
                </div>
              ) : (
                <div
                  className="edite_button_container"
                  onClick={toggleEditable}
                >
                  <img src={edit_icon} alt="Edit" />
                </div>
              )}
            </div>
            {introTexts.map((item, index) => subSubData(item, index))}
          </div>
        </div>
      </div>


      <div className="about_section_con">
      <div className="about_section">
        <div className="about_section_title">About</div>
        <div className="about_section_text" style={{ maxHeight: isExpanded ? 'fit-content' : '40px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac felis eget nisi pretium aliquam. Fusce euismod nunc sit amet lectus sollicitudin, non vehicula libero tincidunt. Sed id arcu sit amet arcu scelerisque dictum. Integer nec sollicitudin leo. Mauris id orci sed enim dictum luctus non ac eros. Proin convallis dolor in odio blandit, sit amet egestas urna auctor. Nulla facilisi. Ut non risus orci. Donec id magna at elit dignissim viverra. Integer sollicitudin nunc vitae tincidunt tempus.
        </div>
        <div className="show-more" onClick={toggleText}>
          {isExpanded ? 'Show Less' : 'Show More'}
        </div>
      </div>
    </div>


    <MorePartProfile/>

    </div>
  );
}

export default OwnerProfile;
