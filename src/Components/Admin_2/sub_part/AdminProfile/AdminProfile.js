import React, { useState, useEffect } from 'react';
import './AdminProfile.css';
import saveIcon from './sub_img/diskette.png';
import { format } from 'date-fns';

import user_img_1 from './profile_pic/user1.jpg';
import user_img_2 from './profile_pic/user2.jpg';
import user_img_3 from './profile_pic/user3.jpg';
import user_img_4 from './profile_pic/user4.jpg';


function AdminProfile({admin_email}) {
  const initial_data = {
    full_name: '',
    email: '',
    phone_number: '',
    address: '',
    role: '',
    admin_id: '',
    join_date: '',
    last_login: ''
  };


  const [data_error, set_data_error] = useState({
    full_name_error: '',
    email_error: '',
    phone_number_error: '',
    address_error: '',
    role_error: '',
    admin_id_error: '',
    join_date_error: '',
    last_login_error: ''
  });

  const [basic_info, set_basic_info] = useState(initial_data);
  const [original_data, set_original_data] = useState(initial_data);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("https://via.placeholder.com/150");
  const [isLoading, setIsLoading] = useState(false);

  const defaultImages = [
    { id: 1, src: user_img_1 },
    { id: 2, src: user_img_2 },
    { id: 3, src: user_img_3 },
    { id: 4, src: user_img_4 },
  ];

  const handleImageSelect = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowProfilePopup(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setShowProfilePopup(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    try {
      const date = new Date(dateTimeString);
      return format(date, 'MMM dd, yyyy hh:mm a');
    } catch (error) {
      console.error('Date formatting error:', error);
      return dateTimeString;
    }
  };

  useEffect(() => {
    if (admin_email) {
      fetch('http://localhost:4000/Admin/get_admin_by_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ admin_email })
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Error fetching admin data:', data.error);
          return;
        }

        console.log(data);
        
        const mapped_data = {
          full_name: data.admin_name || '',
          email: data.admin_email || '',
          phone_number: data.admin_phone_number || '',
          address: data.admin_address || '',
          role: data.access_type || '',
          admin_id: data.admin_id || '',
          join_date: data.date_of_joining || '',
          last_login: data.last_login || '',
          _original_join_date: data.date_of_joining || '',
          _original_last_login: data.last_login || ''
        };

        set_basic_info(mapped_data);
        set_original_data(mapped_data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }, [admin_email]);



  const has_changes = (field) => basic_info[field] !== original_data[field];

  const handle_input_change = (field, value) => {
    set_basic_info((prev) => ({ ...prev, [field]: value }));
  };

  const handle_save = (field) => {
    set_original_data((prev) => ({ ...prev, [field]: basic_info[field] }));
    
    console.log(`Saved ${field}:`, basic_info[field]);
  };

  const has_section_changes = (fields) => {
    return fields.some((field) => has_changes(field));
  };

  const prepareUpdateData = (fields) => {
    const updateData = { admin_email };
    
    fields.forEach(field => {
      if (has_changes(field)) {
        switch(field) {
          case 'full_name':
            updateData.admin_name = basic_info.full_name;
            break;
          case 'phone_number':
            updateData.admin_phone_number = basic_info.phone_number;
            break;
          case 'address':
            updateData.admin_address = basic_info.address;
            break;
          case 'role':
            updateData.access_type = basic_info.role;
            break;
          default:
            console.warn(`Unhandled field in prepareUpdateData: ${field}`);
            break;
        }
      }
    });
    
    return updateData;
  };

  const saveAdminData = async (fields) => {
    setIsLoading(true);
    try {
      const updateData = prepareUpdateData(fields);
      
      const response = await fetch('http://localhost:4000/Admin/save_admin_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (data.error) {
        alert('Error saving data: ' + data.error);
        return false;
      }
      set_data_error({
        full_name_error: '',
        email_error: '',
        phone_number_error: '',
        address_error: '',
        role_error: '',
        admin_id_error: '',
        join_date_error: '',
        last_login_error: ''
      });
      return true;
    } catch (error) {
      console.error('Error making request:', error);
      alert('Error saving data. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  function is_valid_basic_info(fields) {
    let is_valid = true;
    if (!basic_info.full_name || typeof basic_info.full_name !== 'string' || basic_info.full_name.trim() === '') {
      
        set_data_error((prev) => ({ ...prev, full_name_error: "Full name is required and cannot be empty." }));
          is_valid = false;
    }

    // Check if email is valid
    if (!basic_info.email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(basic_info.email)) {
        set_data_error((prev) => ({ ...prev, email_error: "Please enter a valid email address." }));
        is_valid = false;
    }

    // Check if phone number is valid
    if (!basic_info.phone_number || !/^\+?\d{10,15}$/.test(basic_info.phone_number)) {
        set_data_error((prev) => ({ ...prev, phone_number_error: "Please enter a valid phone number with 10 to 15 digits." }));
        is_valid = false;
    }

    // Check if address is valid
    if (!basic_info.address || typeof basic_info.address !== 'string' || basic_info.address.trim() === '') {
        set_data_error((prev) => ({ ...prev, address_error: "Address is required and cannot be empty." }));
        is_valid = false;
    }
    if(is_valid){
      saveAdminData(fields).then(success => {
        if (success) {
          fields.forEach((field) => {
            handle_save(field);
          });
        }
      });
    }
    
}

function is_valid_account_details(fields) {
  let is_valid = true;

  if (!basic_info.role || basic_info.role === '') {
    set_data_error((prev) => ({ ...prev, role_error: "Please select an admin role." }));
    is_valid = false;
  }

  if (!basic_info.admin_id) {
    set_data_error((prev) => ({ ...prev, admin_id_error: "Admin ID is required and cannot be empty." }));
    is_valid = false;
  }

  if (!basic_info.join_date || typeof basic_info.join_date !== 'string' || basic_info.join_date.trim() === '') {
    set_data_error((prev) => ({ ...prev, join_date_error: "Join date is required and cannot be empty." }));
    is_valid = false;
  }

  if (!basic_info.last_login || typeof basic_info.last_login !== 'string' || basic_info.last_login.trim() === '') {
    set_data_error((prev) => ({ ...prev, last_login_error: "Last login is required and cannot be empty." }));
    is_valid = false;
  }

  if (is_valid) {
    saveAdminData(fields).then(success => {
      if (success) {
        fields.forEach((field) => {
          handle_save(field);
        });
      }
    });
  }
}

const handleRoleChange = (e) => {
  if (basic_info.role === 'Full' && e.target.value === 'Read Write') {
    if (window.confirm('Are you sure you want to change the role to Read Write?\nAfter save This action cannot be reverted.')) {
      handle_input_change('role', e.target.value);
    }
  } else {
    handle_input_change('role', e.target.value);
  }
};

  return (
    <div className="admin_profile_container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div>Saving your data...</div>
          </div>
        </div>
      )}
      <h2>Admin Profile Section</h2>
      

      {/* Basic Information Section */}
      <section>
        <h3>Basic Information</h3>
        <div className="profile_item">
          <label>Profile Picture:</label>
          <div className="profile_img_wrapper">
            <img src={selectedImage} alt="Profile" className="profile_img" />
            <button 
              className="change_img_btn"
              onClick={() => setShowProfilePopup(true)}
            >
              Change
            </button>
          </div>
        </div>

        <div className="profile_item">
          <label>Full Name:</label>
          <div className="editable_field">
            <input id="full_name" type="text" value={basic_info.full_name} onChange={(e) => handle_input_change('full_name', e.target.value)} className={`${data_error.full_name_error ? 'error_input' : ''}`} />
            <div className="all_error_input">
              {data_error.full_name_error}
            </div>
          </div>

        </div>

        <div className="profile_item">
          <label>Email Address:</label>
          <div className="editable_field">
            <input id="email" type="text" value={basic_info.email} onChange={(e) => handle_input_change('email', e.target.value)} className={`${data_error.email_error ? 'error_input' : ''}`} readOnly={true} title="This field is read-only"/>
            <div className="all_error_input">
              {data_error.email_error}
            </div>
          </div>
        </div>


        <div className="profile_item">
          <label>Phone Number:</label>
          <div className="editable_field">
            <input
              id="phone_number"
              type="text"
              value={basic_info.phone_number}
              onChange={(e) => handle_input_change('phone_number', e.target.value)}
            className={`${data_error.phone_number_error ? 'error_input' : ''}`}
          />
          <div className="all_error_input">
              {data_error.phone_number_error}
            </div>
          </div>
        </div>

        <div className="profile_item">
          <label>Address:</label>
          <div className="editable_field">
            <input
              id="address"
              type="text"
              value={basic_info.address}
              onChange={(e) => handle_input_change('address', e.target.value)}
              className={`${data_error.address_error ? 'error_input' : ''}`}
          />
            <div className="all_error_input">
              {data_error.address_error}
            </div>
          </div>
        </div>

        {has_section_changes(['full_name', 'email', 'phone_number', 'address']) && (
          <button className="save_button" onClick={() => is_valid_basic_info(['full_name', 'email', 'phone_number', 'address'])}>
            <img src={saveIcon} alt="Save" className="save_icon" />
          </button>
        )}
      </section>

      {/* Account Details Section */}
      <section>
        <h3>Account Details</h3>
        <div className="profile_item">
          <label>Admin Role:</label>
          <div className="editable_field">
            <select
              id="role"
              value={basic_info.role}
              onChange={handleRoleChange}
              className={`select_input ${data_error.role_error ? 'error_input' : ''} ${
                original_data.role === 'Read Write' ? 'disabled-select' : ''
              }`}
              disabled={original_data.role === 'Read Write'}
            >
              <option value="Full">Full Access</option>
              <option value="Read Write">Read Write</option>
            </select>
            <div className="all_error_input">
              {data_error.role_error}
            </div>
          </div>
        </div>

        <div className="profile_item">
          <label>Admin ID:</label>
          <div className="editable_field">
            <input
              id="admin_id"
              type="text"
              value={basic_info.admin_id}
              onChange={(e) => handle_input_change('admin_id', e.target.value)}
              className={`${data_error.admin_id_error ? 'error_input' : ''}`}
              readOnly={true}

              title="This field is read-only"
            />
            <div className="all_error_input">
              {data_error.admin_id_error}
            </div>
          </div>
        </div>

        <div className="profile_item">
          <label>Date of Joining:</label>
          <div className="editable_field">
            <input
              id="join_date"
              type="text"
              value={formatDateTime(basic_info.join_date)}
              onChange={(e) => handle_input_change('join_date', e.target.value)}
              className={`${data_error.join_date_error ? 'error_input' : ''}`}
              readOnly={true}
              title="This field is read-only"
            />
            <div className="all_error_input">
              {data_error.join_date_error}
            </div>
          </div>
        </div>

        <div className="profile_item">
          <label>Last Login:</label>
          <div className="editable_field">
            <input
              id="last_login"
              type="text"
              value={formatDateTime(basic_info.last_login)}
              onChange={(e) => handle_input_change('last_login', e.target.value)}
              className={`${data_error.last_login_error ? 'error_input' : ''}`}
              readOnly={true}
              title="This field is read-only"
            />
            <div className="all_error_input">
              {data_error.last_login_error}
            </div>
          </div>
        </div>

        {has_section_changes(['role', 'admin_id', 'join_date', 'last_login']) && (
          <button className="save_button" onClick={() => is_valid_account_details(['role', 'admin_id', 'join_date', 'last_login'])}>
            <img src={saveIcon} alt="Save" className="save_icon" />
            Save all 
          </button>
        )}
      </section>

      {/* Security Settings Section */}
      <section>
        <h3>Security Settings</h3>
        <div className="profile_item">
          <label>Change Password:</label>
          <button className="change_password">Change Password</button>
        </div>
        <div className="profile_item">
          <label>Login History:</label>
          <span className="view_login_history" > View Login History</span>
        </div>
        <div className="profile_item">
          <label>Delete Account:</label>
          <span className="delete_account" > Delete Account</span>
        </div>
      </section>



      {/* Change showProfilePopup Section */}

      {showProfilePopup && (
        <div className="profile_popup_overlay">
          <div className="profile_popup">
            <h4>Select Profile Picture</h4>
            <div className="default_images">
              {defaultImages.map((image) => (
                <img
                  key={image.id}
                  src={image.src}
                  alt={`Default ${image.id}`}
                  onClick={() => handleImageSelect(image.src)}
                />
              ))}
            </div>
            <div className="upload_section">
              <h4>Or upload your own</h4>
              <input
                type="file"
                accept="image/*"
                id="profile_upload"
                onChange={handleFileUpload}
              />
              <label htmlFor="profile_upload">Choose File</label>
            </div>
            <button 
              className="close_popup"
              onClick={() => setShowProfilePopup(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
