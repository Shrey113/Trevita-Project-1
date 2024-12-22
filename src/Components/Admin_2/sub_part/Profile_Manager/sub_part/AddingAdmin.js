import React, { useState } from 'react';

const AccessLevelOption = ({ accessType, description, formData, handleInputChange }) => (
  <label className={formData.access_type === accessType ? 'active' : ''}>
    <div className="radio-option">
      <input
        type="radio"
        name="access_type"
        value={accessType}
        checked={formData.access_type === accessType}
        onChange={handleInputChange}
        id={accessType}
        aria-checked={formData.access_type === accessType}
      />
      {accessType}
    </div>
    <div className="dec">
      {description}
    </div>
  </label>
);

const Server_url = "http://localhost:4000";

function AddingAdmin({ handleClosePopup,is_update,
  new_admin_id, new_profile, new_Admin_email, new_Access_type ,go_for_re_fetch_data}) {
  const [formData, setFormData] = useState({
    admin_id:new_admin_id || null,
    admin_name: new_profile || '',
    admin_email: new_Admin_email || '',
    access_type: new_Access_type || 'Read Write',
  });

  const [form_error,set_form_error] = useState('');

  const Add_New_Admin = () => {
    if (!(formData.admin_name && formData.admin_email && formData.access_type)) {
      alert('Please fill all fields!');
      return;
    }

    const adminData = {
        admin_name: formData.admin_name,
        admin_email: formData.admin_email,
        access_type: formData.access_type
    };

    fetch(`${Server_url}/Admin/add_admin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminData)
    })
    .then(response => response.json()) 
    .then(data => {
   console.log(data);
   if(data.message === 'Admin added successfully'){
    go_for_re_fetch_data();
    handleClosePopup();
   }else if(data.message === 'Admin with this email already exists'){
    set_form_error(data.message)
   }
   else{
    set_form_error("Admin update error")
   }
   
    })
    .catch(error => {
        console.log(error);
    });
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const update_admin_data = () => {
    const adminData = {
      admin_id:formData.admin_id,
      admin_name: formData.admin_name,
      admin_email: formData.admin_email,
      access_type: formData.access_type
  };

    fetch(`${Server_url}/Admin/update_data`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Admin data updated:', data);
        if(data.message === 'Admin data updated successfully'){
            go_for_re_fetch_data();
            handleClosePopup();
        }else{
            set_form_error("Admin update error")
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div className="popup_overlay_admin_con">
      <div className="popup_admin">
        <h2>{new_Admin_email ? 'Update Admin' : 'Add New Admin'}</h2>
        <div className="error_message">{form_error}</div>
        <div className="popup_admin_form">
          <label>
            Admin Name
            <input type="text" placeholder='Name' name="admin_name" value={formData.admin_name} onChange={handleInputChange}/>
          </label>
          <label>
            Admin Email
            <input type="text"  placeholder='Email' name="admin_email" value={formData.admin_email} onChange={handleInputChange} readOnly={new_Admin_email ? true : false} />
          </label>
          <div className='Access_type_lable'>Access type </div>
          <div className='Access_radio_con'>
            <AccessLevelOption
              accessType="Read Write"
              description="Admin can read, write but cannot modify or other Admin."
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <AccessLevelOption
              accessType="Full"
              description="Admin can read, write, and can modify other Admins."
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>
        <div className="popup-actions">
        {is_update?  
       <button onClick={update_admin_data}>
       Update Admin
     </button>
          :
          <button onClick={Add_New_Admin}>
          Add Admin
        </button> 
   
          }
          <button onClick={handleClosePopup}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddingAdmin;
