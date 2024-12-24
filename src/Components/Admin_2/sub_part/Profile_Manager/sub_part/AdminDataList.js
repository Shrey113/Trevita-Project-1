import React, { useState,useEffect } from 'react';
import './AdminDataList.css';

import more_icon from './sub_img/more.png';
import add_icon from './sub_img/add.png';
import edit_icon from './sub_img/edit.png';
import delete_icon from './sub_img/delete.png';

import user1_icon from './profile_pic/user1.jpg';
import user2_icon from './profile_pic/user2.jpg';
import user3_icon from './profile_pic/user3.jpg';
import user4_icon from './profile_pic/user4.jpg';
import AskQuestion from './AskQuestion';
import AddingAdmin from './AddingAdmin';

const Server_url = "http://localhost:4000";

function AdminDataList() {

  const [all_admin_data, set_all_admin_data] = useState(false);
  const [show_question, set_show_question] = useState(false);
  const [show_question_data, set_show_question_data] = useState({
    message:'',onYesClick:()=>{},onNoClick:()=>{},closeButton:()=>{}
  });
 function go_for_re_fetch_data(){
  fetch(`${Server_url}/Admin/get_all_admin`)
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
    set_all_admin_data(data)
      console.log('Admin data:', data);
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
 }

  useEffect(()=>{
    go_for_re_fetch_data();
  },[])
  const [add_new_admin_pop, set_add_new_admin_pop] = useState(false);
  const [update_admin_pop, set_update_admin_pop] = useState(false);
  const [more_option_pop,set_more_option_pop] = useState(null);

  const outside_click_more_option = (event) => {
    const target = event.target;
    if (!target.closest(".more_option_pop") && !target.closest(".more_option_bt")) {
      set_more_option_pop(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", outside_click_more_option);
    return () => {
      document.removeEventListener("mousedown", outside_click_more_option);
    };
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const getCurrentItems = () => {
    return all_admin_data ? all_admin_data.slice(indexOfFirstItem, indexOfLastItem) : [];
  };

  const getTotalPages = () => {
    return Math.ceil((all_admin_data ? all_admin_data.length : 0) / itemsPerPage);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, getTotalPages()));
  };

  const getPageRange = () => {
    const totalPages = getTotalPages();
    
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    let start, end;
    
    if (currentPage <= 2) {
      start = 1;
      end = 3;
    } else if (currentPage >= totalPages - 1) {
      start = totalPages - 2;
      end = totalPages;
    } else {
      start = currentPage - 1;
      end = currentPage + 1;
    }
    
    return Array.from(
      { length: end - start + 1 }, 
      (_, i) => start + i
    );
  };

        const delete_admin_by_id = (adminId) => {
        

          fetch(`${Server_url}/admin/delete_data`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ admin_id: adminId })  // Send admin_id in the body
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();  // Parse JSON response
          })
          .then(data => {
              console.log('Admin deleted:', data);  // Handle success
              if(data.message === 'Admin deleted successfully'){
                go_for_re_fetch_data();
              }else{
                alert("Admin delete error")
              }
          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
          });
        };




  return (
    <div className="Admin_table_date">
      {/* Title Bar */}
      <div className="title_bar_sub">
        Admin Manager Table
        <span>
          <img src={add_icon} alt="Add Icon" 
          onClick={()=>{
            set_add_new_admin_pop(true);
            }} style={{ cursor: 'pointer' }} />
        </span>
      </div>

      <table className="user_table">
        <thead>
          <tr>
            <th>No</th>
            <th>Admin Name</th>
            <th>Admin email</th>
            <th>Access type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {getCurrentItems().map((row, index) => (
            <tr key={index}>
  
              <td>{index + 1}</td>
              <td>
                <div className="profile_con">
                  <div className="profile">
                    <img
                      src={
                        index === 1
                          ? user1_icon
                          : index === 2
                          ? user2_icon
                          : index === 3
                          ? user3_icon
                          : user4_icon
                      }
                      alt="User Icon"
                    />
                  </div>
                  <div className="data">
                    <div className="title">{row.admin_name}</div>
                  </div>
                </div>
              </td>
              <td>{row.admin_email}</td>
              <td>
              <div
                  className={`set_type ${
                    row.access_type === "Read Write"
                      ? "read_write"
                      : "Full"
                  }`}
                >
                  {row.access_type}
                </div>
              </td>
              <td onClick={()=>{

              }}><img className='more_option_bt' src={more_icon} 
              onClick={() => set_more_option_pop(more_option_pop === index ? null : index)}
              alt="Icon" />
              {more_option_pop === index && 
              <div className="more_option_pop">
                
                <div className="item" 
                  onClick={()=>{
                    set_update_admin_pop(true);
      
                          }}>
                  <div className="icon_img">
                    <img src={edit_icon} alt="" />
                  </div>
                  <div className="title">
                    Edite
                  </div>
                </div>

                <div className="item" 
                  onClick={()=>{set_show_question(true);
                          set_show_question_data({message:`Are you sure you won't delete access to ${row.admin_email}?`,
                          onNoClick:()=>{set_show_question(false)}, 
                          onYesClick:()=>{delete_admin_by_id(row.admin_id);set_show_question(false);},
                          closeButton:()=>{set_show_question(false)}
                        },
                         
                          
                          )}}>
                  <div className="icon_img">
                    <img src={delete_icon} alt="" />
                  </div>
                  <div className="title">
                  Delete
                  </div>
                </div>


                </div>}

              </td>

            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button 
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          &lt;
        </button>
        
        {currentPage > 2 && getTotalPages() > 3 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="pagination-button"
            >
              1
            </button>
            {currentPage > 3 && <span className="pagination-dots">...</span>}
          </>
        )}
        
        {getPageRange().map(pageNum => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`pagination-button ${currentPage === pageNum ? 'active' : ''}`}
          >
            {pageNum}
          </button>
        ))}
        
        {currentPage < getTotalPages() - 1 && getTotalPages() > 3 && (
          <>
            {currentPage < getTotalPages() - 2 && <span className="pagination-dots">...</span>}
            <button
              onClick={() => handlePageChange(getTotalPages())}
              className="pagination-button"
            >
              {getTotalPages()}
            </button>
          </>
        )}
        
        <button 
          onClick={handleNextPage}
          disabled={currentPage === getTotalPages()}
          className="pagination-button"
        >
          &gt;
        </button>
      </div>

      {/* Popup for Adding Admin */}

      {add_new_admin_pop && (
              <AddingAdmin 
              go_for_re_fetch_data={go_for_re_fetch_data}
                handleClosePopup={() => set_add_new_admin_pop(false)}
                is_update={false}
                new_admin_id={null}
                 new_profile={null} 
                 new_Admin_email={null} 
                 new_Access_type={null}  />
      )}

        {/* Popup for Updating Admin */}
    {update_admin_pop && (
      <AddingAdmin
        go_for_re_fetch_data={go_for_re_fetch_data}
        handleClosePopup={() => set_update_admin_pop(false)}
        is_update={true}
        new_admin_id={all_admin_data[more_option_pop]?.admin_id}
        new_profile={all_admin_data[more_option_pop]?.admin_name}
        new_Admin_email={all_admin_data[more_option_pop]?.admin_email}
        new_Access_type={all_admin_data[more_option_pop]?.access_type}
      />
    )}



{show_question && (
        <AskQuestion
          message={show_question_data.message}
          onYesClick={show_question_data.onYesClick}
          onNoClick={show_question_data.onNoClick}
          closeButton={show_question_data.closeButton}
        />
      )}
    </div>
  );
}

export default AdminDataList;
