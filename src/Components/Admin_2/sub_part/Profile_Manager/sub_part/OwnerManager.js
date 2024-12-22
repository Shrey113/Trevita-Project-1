import React, { useState, useEffect } from 'react';
import './OwnerManager.css';

import accept from './sub_img/correct.png';
import reject from './sub_img/remove.png';
import info from './sub_img/letter-i.png';
import PopupMenu from '../../Dashboard/question/PopupMenu';

const Server_url = "http://localhost:4000";

function OwnerManager({admin_email}) {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [selected_user, set_selected_user] = useState([]);
  
  const [error, setError] = useState(null);

   const [showPopup, setShowPopup] = useState(false);

   const [showConfirm, setShowConfirm] = useState({
    isOpen: false,
    email: null,
    handleClose: () => {}
  });

     const [rejectedUsers, setRejectedUsers] = useState([]);
     const [allOwners, setAllOwners] = useState([]);
     const [activeList, setActiveList] = useState('pending');

  // Function to fetch owner data by email
const fetchOwnerByEmail = (email) => {
  return fetch(`${Server_url}/Admin/owner`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }) 
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Owner not found or server error');
      }
      return response.json();
    })
    .then(data => {
      console.log('Owner Data:', data); // Handle the owner data here
      setShowPopup(true)
      set_selected_user(data)
    })
    .catch(error => {
      console.error('Error:', error); // Handle any errors
      throw error; // Optional: rethrow to handle in the calling code
    });
};

function get_admin_data(){
  fetch(`${Server_url}/Admin/pending-users`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch pending users');
    }
    return response.json();
  })
  .then(data => {
    setPendingUsers(data); // Set the fetched data to the state
  })
  .catch(error => {
    setError(error.message); // Set error message if there's an issue
  });
  }

function updateUserStatus(email, status, message = null, set_status_by_admin = null) {
  fetch(`${Server_url}/update-status`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          user_email: email,
          user_Status: status,
          message: message,
          set_status_by_admin: set_status_by_admin
      }),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
    if(data.message === 'Status updated'){
      console.log('Response:', data);
      get_admin_data();
      getRejectedUsers(); // Refresh rejected users list
      getAllOwners(); // Refresh all owners list
      if(showPopup){
        setShowPopup(false);
      }
    }else{
      alert(data)
    }
  })
  .catch(error => {
      console.error('Error:', error.message);
  });
}

function getAllOwners() {
  fetch(`${Server_url}/Admin/get_all_owner`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch all owners');
      }
      return response.json();
    })
    .then(data => {
      setAllOwners(data);
    })
    .catch(error => {
      setError(error.message);
    });
}

  useEffect(() => {
    get_admin_data();
    getAllOwners();
  }, []);
  


  function getRejectedUsers() {
    fetch(`${Server_url}/Admin/reject-users`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch rejected users');
        }
        return response.json();
      })
      .then(data => {
        setRejectedUsers(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }

  

  useEffect(() => {
    getRejectedUsers();
  }, []);

  return (
    <div className={`Owner_manager`}>
      <div className="title_bar_sub">
        <h2>Owner Requests</h2>
      </div>
      
      <div className="categories-container">
      <div 
          className={`category-item ${activeList === 'all' ? 'active' : ''}`}
          onClick={() => setActiveList('all')}
        >
          All Owners
        </div>

        <div 
          className={`category-item ${activeList === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveList('pending')}
        >
          Pending Requests
        </div>
        <div 
          className={`category-item ${activeList === 'rejected' ? 'active' : ''}`}
          onClick={() => setActiveList('rejected')}
        >
          Rejected Requests
        </div>

      </div>

      {/* Display error message if there's any */}
      {error && <p className="error-message">{error}</p>}

      <table className="user_table">
        <thead>
          <tr>
            {activeList === 'pending' ? (
              <>
                <th>Request Email</th>
                <th>Business Name</th>
                <th>Access</th>
              </>
            ) : activeList === 'rejected' ? (
              <>
                <th>Request Email</th>
                <th>Rejected By Admin</th>
                <th>Business Name</th>
                <th>Access</th>
              </>
            ) : (
              <>
                <th className='set_width'>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Business Name</th>
                <th>Business Address</th>
                <th>Mobile</th>
                <th>GST Number</th>
                <th>Status</th>
                <th>Access</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {activeList === 'pending' ? (
            pendingUsers.length > 0 ? (
              pendingUsers.map(user => (
                <tr key={user.client_id}>
                  <td>{user.client_id}</td>
                  <td>{user.user_name}</td>
                  <td>{user.user_email}</td>
                  <td>{user.business_name}</td>
                  <td>{user.business_address}</td>
                  <td>{user.mobile_number}</td>
                  <td>{user.gst_number}</td>
                  <td className='set_type'>
  <span className={` ${
  user.user_Status === "Reject"
    ? "Reject"
    : user.user_Status === "Accept"
    ? "Accept"
    : "Pending"
}`}>
    {user.user_Status}
  </span>
  
</td>
                  <td>
                    <div className="more_option_pop">
                      <div className="icon_img">
                        <img 
                          src={accept} 
                          alt="Accept" 
                          onClick={() => updateUserStatus(user.user_email, "Accept",null, admin_email)}
                        />
                      </div>
                      <div className="icon_img">
                        <img 
                          src={reject} 
                          alt="Reject" 
                          onClick={() => setShowConfirm({
                            isOpen: true,
                            email: user.user_email,
                            handleClose: () => setShowConfirm({ isOpen: false, email: null })
                          })}
                        />
                      </div>
                      <div className="icon_img">
                        <img 
                          src={info} 
                          alt="Info" 
                          onClick={() => fetchOwnerByEmail(user.user_email)}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3">No pending users found</td></tr>
            )
          ) : activeList === 'rejected' ? (
            rejectedUsers.length > 0 ? (
              rejectedUsers.map(user => (
                <tr key={user.client_id}>
                  <td>{user.client_id}</td>
                  <td>{user.user_name}</td>
                  <td>{user.user_email}</td>
                  <td>{user.business_name}</td>
                  <td>{user.business_address}</td>
                  <td>{user.mobile_number}</td>
                  <td>{user.gst_number}</td>
                  <td className='set_type'>
  <span className={` ${
  user.user_Status === "Reject"
    ? "Reject"
    : user.user_Status === "Accept"
    ? "Accept"
    : "Pending"
}`}>
    {user.user_Status}
  </span>
  
</td>
                  <td>
                    <div className="more_option_pop">
                      <div className="icon_img">
                        <img 
                          src={info} 
                          alt="Info" 
                          onClick={() => fetchOwnerByEmail(user.user_email)}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3">No rejected users found</td></tr>
            )
          ) : (
            allOwners.length > 0 ? (
              allOwners.map(user => (
                <tr key={user.client_id}>
                  <td>{user.client_id}</td>
                  <td>{user.user_name}</td>
                  <td>{user.user_email}</td>
                  <td>{user.business_name}</td>
                  <td>{user.business_address}</td>
                  <td>{user.mobile_number}</td>
                  <td>{user.gst_number}</td>
                  <td className='set_type'>
  <span className={` ${
  user.user_Status === "Reject"
    ? "Reject"
    : user.user_Status === "Accept"
    ? "Accept"
    : "Pending"
}`}>
    {user.user_Status}
  </span>
  
</td>

                  <td>
                    <div className="more_option_pop">
                      {user.user_Status === "Pending" ? (
                        <>
                          <div className="icon_img">
                            <img 
                              src={accept} 
                              alt="Accept" 
                              onClick={() => updateUserStatus(user.user_email, "Accept", null, admin_email)}
                            />
                          </div>
                          <div className="icon_img">
                            <img 
                              src={reject} 
                              alt="Reject" 
                              onClick={() => setShowConfirm({
                                isOpen: true,
                                email: user.user_email,
                                handleClose: () => setShowConfirm({ isOpen: false, email: null })
                              })}
                            />
                          </div>
                        </>
                      ) : null}
                      <div className="icon_img">
                        <img 
                          src={info} 
                          alt="Info" 
                          onClick={() => fetchOwnerByEmail(user.user_email)}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="9">No owners found</td></tr>
            )
          )}
        </tbody>
      </table>


      {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>User Details</h2>
                        {
                          selected_user.user_Status !== "Pending" &&
                          <span> <strong>{selected_user.user_Status}</strong> by Admin <strong>{selected_user.set_status_by_admin}</strong></span>
                        }
                        
                        <table className="user-data-table">
                            <tbody>
                                <tr>
                                    <th>Client ID</th>
                                    <td>{selected_user.client_id}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>{selected_user.user_name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{selected_user.user_email}</td>
                                </tr>
                                <tr>
                                    <th>Password</th>
                                    {/* <td>{user.user_password}</td> */}
                                    <td>******</td>
                                </tr>
                                <tr>
                                    <th>Business Name</th>
                                    <td>{selected_user.business_name}</td>
                                </tr>
                                <tr>
                                    <th>Business Address</th>
                                    <td>{selected_user.business_address}</td>
                                </tr>
                                <tr>
                                    <th>Mobile</th>
                                    <td>{selected_user.mobile_number}</td>
                                </tr>
                                <tr>
                                    <th>GST Number</th>
                                    <td>{selected_user.gst_number}</td>
                                </tr>
                            </tbody>
                           
                        </table>
                        <button className="close-popup-button" onClick={() => setShowPopup(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

      {showConfirm.isOpen && (
        <PopupMenu 
          email={showConfirm.email}
          handleClose={showConfirm.handleClose}
          admin_email={admin_email}
          onSuccess={(message, admin_email) => {
            updateUserStatus(showConfirm.email, "Reject", message, admin_email);
            showConfirm.handleClose();
          }}
        />
      )}

    </div>
  );
}

export default OwnerManager;
