import React, { useState, useEffect } from 'react'
import "./Profile.css";

import arrow from "./../img/right-arrow.png";
import AddProfileData from './profile_parts/AddProfileData';
import AddServicesData from './profile_parts/AddServicesData';
import SelectTime from './profile_parts/SelectTime';
import AddImg from './profile_parts/AddImg';
import PreviewProfile from './PreviewProfile';

function Profile() {
  // State for each checklist item
  const [isSharePlanCompleted, setIsSharePlanCompleted] = useState(false); // First one starts completed
  const [isAddDetailsCompleted, setIsAddDetailsCompleted] = useState(false);
  const [isBusinessInfoCompleted, setIsBusinessInfoCompleted] = useState(false);
  const [isCommunicationPrefsCompleted, setIsCommunicationPrefsCompleted] = useState(false);

  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showServicesPopup, setShowServicesPopup] = useState(false);
  const [showSelectTimePopup, setShowSelectTimePopup] = useState(false);
  const [showAddImgPopup, setShowAddImgPopup] = useState(false);

  const [showPreviewPopup, setShowPreviewPopup] = useState(false);

// 
// 
// 
// 
  useEffect(() => {
    setShowPreviewPopup(false);
    setIsSharePlanCompleted(true);
    setIsAddDetailsCompleted(false);
    setIsBusinessInfoCompleted(false)
  }, []);

//   
//   
//   
  // Calculate progress percentage
  const calculateProgress = () => {
    const completedItems = [
      isSharePlanCompleted,
      isAddDetailsCompleted,
      isBusinessInfoCompleted,
      isCommunicationPrefsCompleted
    ].filter(item => item).length;

    return (completedItems / 4) * 100;
  };

  const handleProfileClick = () => {
    setShowProfilePopup(true);
  };

  const handleServicesClick = () => {
    setShowServicesPopup(true);
  };

  const handleAddImgClick = () => {
    setShowAddImgPopup(true);
  };


  const handleSelectTimeClick = () => {
    setShowSelectTimePopup(true);
  };


  const skills = [
    'Technical Skills',
    'Professional Skills',
    'Core Competencies',
    'Key Skills',
    'Areas of Expertise',
    'Skills & Abilities',
    'Qualifications',
    'Competencies',
    'Strengths'
  ];

    // State to toggle the "show more" functionality
    const [showMore, setShowMore] = useState(false);

    // Function to handle the "Show More" toggle
    const toggleShowMore = () => setShowMore(!showMore);

      // Calculate the number of hidden items
  const hiddenSkillsCount = skills.length - 4;

  return (
    <div className="profile-container">



      {/* <div className="breadcrumb">
        <span>Home</span> / <span>My Profile</span>
      </div> */}

      <div className="profile-content">
        <div className="profile-left">
          <div className="profile-avatar">
            <div className="avatar-img_container">
              <div className="avatar-circle">G</div>
            </div>
            <div className="avatar-info">
                <h2>GF apk 63</h2>
                <p className="username">@gfapk63</p>
              </div>
          </div>

          <div className="hr_line"></div>

          <div className="profile-details">

          <div className="detail-item">
              <span>Your industry</span>
            </div>

            <div className="detail-item">
              <i className="calendar-icon"></i>
              <span>Joined in December 2024</span>
            </div>
            
            <div className="detail-item">
              <span>Preferred working hours</span>
            </div>
          </div>

          
          <div className="hr_line"></div>

          {/* <button className="preview-btn">Preview public profile</button> */}
          <button className="explore-btn">
            Explore Website
            <img src={arrow} alt="arrow" className="arrow-icon" />
            </button>

            <button className="preview-btn" onClick={() => setShowPreviewPopup(!showPreviewPopup)}>
    Preview public profile
    <img src={arrow} alt="arrow" className="arrow-icon" />
</button>


<div className="hr_line"></div>
        <div className="title_hed">
          Skills
        </div>


    <div className="skills_list">
      {/* Map through the skills and display only the first 4 if showMore is false */}
      {skills.slice(0, showMore ? skills.length : 3).map((skill, index) => (
        <div key={index} className="skill-item">
          {skill}
        </div>
      ))}
      
      {/* "Show More" Button */}
      {hiddenSkillsCount > 0 && (
        <div onClick={toggleShowMore} className="show-more-btn">
          {showMore ? 'Show Less' : `+${hiddenSkillsCount} More`}
        </div>
      )}
    </div>



        </div>
        {showPreviewPopup ? 

<div className="profile-right">

      
{/* <p>Adding a profile picture helps personalize your account and makes it more engaging for others. Take a moment to upload yours now!</p> */}


  <div className="profile-checklist">
  <h1>Hi 👋, Let's complete your profile!</h1>
  <br />
    <h3>Profile checklist</h3>
    <div className="progress-bar">
      <div className="progress" style={{width: `${calculateProgress()}%`}}></div>
      <span className="progress-text">{calculateProgress()}%</span>
    </div>

    <div className="checklist-items">

<div className={`checklist-item ${isSharePlanCompleted ? 'completed' : ''}`} onClick={handleProfileClick}>
<div className="icon-target"></div>
<div className="item-content">
<h4>Complete Your Profile Details</h4>
<p>Provide key information about yourself as a photographer, such as your specialties and experience, to create a strong first impression.</p>
</div>
{isSharePlanCompleted ? (
<span className="check-mark">✓</span>
) : (
<button className="add-btn" onClick={handleProfileClick}>Add</button>
)}
</div>


<div className={`checklist-item ${isAddDetailsCompleted ? 'completed' : ''}`} onClick={handleServicesClick}>
<div className="icon-profile"></div>
<div className="item-content">
<h4>Showcase Your Services</h4>
<p>List the photography services you provide, such as portraits, event photography, or product shoots, to attract the right clients.</p>
</div>
{isAddDetailsCompleted ? (
<span className="check-mark">✓</span>
) : (
<button className="add-btn" onClick={handleServicesClick}>Add</button>
)}
</div>


<div className={`checklist-item ${isBusinessInfoCompleted ? 'completed' : ''}`} onClick={handleAddImgClick}>
<div className="icon-business"></div>
<div className="item-content">
<h4>Add Images You've Captured as a Photographer</h4>
<p>Upload a professional photo and share examples of your work, like event photography, product shoots, or portraits, to showcase your skills.</p>
</div>
{isBusinessInfoCompleted ? (
<span className="check-mark">✓</span>
) : (
<button className="add-btn" onClick={handleAddImgClick}>Add</button>
)}
</div>


<div className={`checklist-item ${isCommunicationPrefsCompleted ? 'completed' : ''}`} onClick={handleSelectTimeClick}>
<div className="icon-communication"></div>
<div className="item-content">
<h4>Set Your Availability</h4>
<p>Define your availability to let clients know when you’re ready to take on projects and bookings.</p>
</div>
{isCommunicationPrefsCompleted ? (
<span className="check-mark">✓</span>
) : (
<button className="add-btn" onClick={() => setIsCommunicationPrefsCompleted(true)}>Add</button>
)}
</div>
</div>

<br />


  </div>

</div> 

: <PreviewProfile/>
        
        }
     
      </div>
      {showProfilePopup && (
      <div className="popup-overlay" id="AddProfileDataPopup" onClick={() => setShowProfilePopup(false)}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setShowProfilePopup(false)}>×</button>
          <AddProfileData />
        </div>
      </div>
    )}

    {showServicesPopup && (
      <div className="popup-overlay" id="AddServicesDataPopup" onClick={() => setShowServicesPopup(false)}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setShowServicesPopup(false)}>×</button>
          <AddServicesData />
        </div>
      </div>
    )}
    {showSelectTimePopup && (
      <div className="popup-overlay" id="SelectTimePopup" onClick={() => setShowSelectTimePopup(false)}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setShowSelectTimePopup(false)}>×</button>
          <SelectTime />
        </div>
      </div>
    )}
    {showAddImgPopup && (
      <div className="popup-overlay" id="AddImgPopup" onClick={() => setShowAddImgPopup(false)}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setShowAddImgPopup(false)}>×</button>
          <AddImg />
        </div>
      </div>
    )}
    </div>



  )
}

export default Profile
