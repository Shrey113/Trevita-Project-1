import React from 'react'
import './UserDateList.css'


import user1_icon from './../profile_pic/user1.jpg'
import more_icon from './sub_img/more.png'
import user2_icon from './../profile_pic/user2.jpg'
import user3_icon from './../profile_pic/user3.jpg'
import user4_icon from './../profile_pic/user4.jpg'


const initialData = [
  { profile: "John Doe", hours: 40, skills: "JavaScript", status: "Available" },
  { profile: "Jane Smith", hours: 35, skills: "Python", status: "On Holiday" },
  { profile: "Mark Wilson", hours: 45, skills: "Java", status: "Absent" },
  { profile: "Mark Wilson", hours: 45, skills: "Java", status: "On Leave" }
];

function UserDataList() {
    return (
      <div className="user_table_date">
        {/* Title Bar */}
        <div className="title_bar_sub">
          <h2>Profile Table</h2>
          <img src={more_icon} alt="Icon" />
        </div>
  
        {/* Table */}
        <table className="user_table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Hours</th>
              <th>Skills</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {initialData.map((row, index) => (
              <tr key={index}>
                <td>
                  <div className="profile_con">
                    <div className="profile">
                      <img src={index === 1 ? user1_icon 
                      :index === 2 
                      ?user2_icon
                      :index === 3 ?
                      user3_icon
                      :user4_icon
                    } alt="User Icon" />
                    </div>
                    <div className="data">
                      <div className="title">Mark J. Freeman</div>
                      <div className="type">Developer</div>
                    </div>
                  </div>
                </td>
                <td>{row.hours}</td>
                <td>{row.skills}</td>
                <td>
                  <div className={`set_type ${
                      row.status === "Available"
                        ? "status-available"
                        : row.status === "On Holiday"
                        ? "status-on-holiday"
                        : row.status === "Absent"
                        ? "status-absent"
                        : "status-on-leave"
                    }` }>
                      {row.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }


  export default UserDataList;