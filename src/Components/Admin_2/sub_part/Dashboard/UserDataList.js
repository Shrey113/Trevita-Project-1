import React, { useState ,useEffect} from 'react';
import './UserDateList.css';


import accept from './sub_img/correct.png';
import reject from './sub_img/remove.png';
import info from './sub_img/letter-i.png';
import back from './sub_img/back.png';



const Server_url = "http://localhost:4000";
function UserDataList() {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  
  const [pendingUsers, setPendingUsers] = useState([]);
  const [selected_user, set_selected_user] = useState([]);
  
  const [error, setError] = useState(null);

   const [showPopup, setShowPopup] = useState(false);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = pendingUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(pendingUsers.length / usersPerPage);
  // const totalPages = 2;

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

    useEffect(() => {
      get_admin_data();
    }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };




  const getPageNumbers = () => {
    const pageNumbers = [];
    let start = Math.max(currentPage - 1, 1);
    let end = Math.min(currentPage + 1, totalPages);

    if (currentPage <= 2) {
      end = Math.min(4, totalPages); 
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  function updateUserStatus(email, status) {
    fetch(`${Server_url}/update-status`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_email: email,
            user_Status: status,
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
        if(showPopup){
          setShowPopup(false)
        }
      }else{
        alert(data)
      }
        
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
}


  return (
    <div className="user_table_date">
      {/* Title Bar */}
      <div className="title_bar_sub">
        Owner Table
      </div>

      {/* Table */}
      <table className="user_table">
        <thead>
          <tr>
            <th>Email</th>
            <th>business name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map(user => (
              <tr key={user.client_id}>
                {error}
                <td>{user.user_email}</td>
                <td>{user.business_name}</td>
                <td>
                  <div className="more_option_pop">
                    <div className="icon_img" onClick={()=>{updateUserStatus(user.user_email,"Accept")}}>
                      <img src={accept} alt="Accept" />
                    </div>
                    <div className="icon_img" onClick={()=>{updateUserStatus(user.user_email,"Reject")}}>
                      <img src={reject} alt="Reject" />
                    </div>
                    <div className="icon_img" onClick={()=>{fetchOwnerByEmail(user.user_email)}}>
                      <img src={info} alt="Info" />
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No pending users found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <h3>{currentPage}/{totalPages}</h3>
        {totalPages > 1 && 
        <>
                <button onClick={handlePrev} disabled={currentPage === 1}>
                Prev
              </button>
        


        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}

        

        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
        </>
        }
      </div>


      
      {showPopup && (
                <div className="user-data-table-popup-overlay">
                    <div className="popup-content_">
                      <div className="title">
                      <img className='back_img' src={back} alt="" onClick={() => setShowPopup(false)} />
                        <h2>
                          Owner Details
                        </h2>
                      </div>
 
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
                        <div className="button_con">
                        <div className="icon_img" onClick={()=>{updateUserStatus(selected_user.user_email,"Accept")}}>
                            <img src={accept} alt="Accept" />
                          </div>
                          <div className="icon_img" onClick={()=>{updateUserStatus(selected_user.user_email,"Reject")}}>
                            <img src={reject} alt="Reject" />
                          </div>
                        </div>
                    </div>
                </div>
            )}
            
    </div>
  );
}

export default UserDataList;
