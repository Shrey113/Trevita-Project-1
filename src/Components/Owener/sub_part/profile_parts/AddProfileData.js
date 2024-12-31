import React, { useState } from 'react'
import './AddProfileData.css'

import edit_icon from './../../img/pencil.png'

function AddProfileData() {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Add your profile data</h2>
      </div>

        <div className="profile-avatar-container">
            <div className="profile-avatar">
                {profileImage ? (
                    <img src={profileImage} alt="Profile" />
                ) : (
                    <span>G</span>
                )}
                    <label htmlFor="profile-image-input" className="profile-avatar-overlay">
           
 
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        id="profile-image-input"
                    />
                        <img 
                            src={edit_icon} 
                            alt="Edit"
                            
                        />
          
                    </label>
            </div>
            <p className="text-center">@gfspk63</p>
        </div>

      <form>
        <div className="form-group">
          <label>How would you like to be called?</label>
          <input type="text" placeholder="John D." />
          <p className="form-hint">We suggest using your first name and first initial of your last name, starting with a capital letter for each.</p>
        </div>

        <div className="form-group">
          <label>What's your business' name?</label>
          <input type="text" placeholder="Add name here" />
        </div>


        <div className="form-group">
          <label>How would you describe your business?</label>
          <textarea 
            placeholder="About your business (Optional)"
            maxLength={500}
            onChange={(e) => {
              const textarea = e.target;
              const charCount = textarea.value.length;
              if (charCount > 500) {
                textarea.style.border = '1px solid red';
              } else {
                textarea.style.border = '1px solid #ddd';
              }
              textarea.nextElementSibling.textContent = `${charCount}/500 characters`;
            }}
          />
          <div className="character-count">0/500 characters</div>
        </div>




        <div className="form-group">
          <label>Add your business's main URL</label>
          <input type="text" placeholder="(website, social page, blog, etc.)" />
        </div>

        <div className="form-group">
            <button className="ok-button">Save</button>
        </div>
      </form>
    </div>
  )
}

export default AddProfileData
