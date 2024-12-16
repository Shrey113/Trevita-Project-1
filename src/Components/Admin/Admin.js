import React, { useState, useEffect, useRef } from "react";
import "./Admin.css";
import app_icon from "./img/app_development.png";
import notification_icon from "./img/notification.png";
import setting_icon from "./img/setting.png";
import user_icon from "./img/user.png";
import search_icon from "./img/search.png";
import plus_icon from "./img/plus.png";
import filter_icon from "./img/filter.png";
import export_icon from "./img/export.png";
import unfold_icon from "./img/unfold.png";
import more_icon from "./img/more.png";
import delete_icon from "./img/delete.png";
import edite_icon from "./img/pencil.png";
import info_icon from "./img/info.png";
import sort_icon from "./img/sort.png";

import Menu from "./sub_parts/menu.js";

const menuItems = [
  {
    label: "Sub Part 1",
    onClick: () => {
      console.log("Sub Part 1 clicked");
    },
  },
  {
    label: "Sub Part 2",
    onClick: () => {
      console.log("Sub Part 2 clicked");

    },
  },
  {
    label: "Sub Part 3",
    onClick: () => {
      console.log("Sub Part 3 clicked");
    },
  },
];

const PopMenu = ({ owner, onClose }) => {
  return (
    <div className="pop-menu-overlay">
      <div className="pop-menu">
        <button className="close-button" onClick={onClose}>&times;</button>
        <table className="pop-menu-table">
          <tbody>
            <tr>
              <th>Client ID</th>
              <td>{owner.client_id}</td>
            </tr>
            <tr>
              <th>User Name</th>
              <td>{owner.user_name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{owner.user_email}</td>
            </tr>
            <tr>
              <th>Password</th>
              <td>{owner.user_password}</td>
            </tr>
            <tr>
              <th>Business Name</th>
              <td>{owner.business_name}</td>
            </tr>
            <tr>
              <th>Business Address</th>
              <td>{owner.business_address}</td>
            </tr>
            <tr>
              <th>Mobile Number</th>
              <td>{owner.mobile_number}</td>
            </tr>
            <tr>
              <th>GST Number</th>
              <td>{owner.gst_number}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{owner.user_Status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};


function Admin() {
  const [active_page, set_active_page] = useState("Dashboard");
  const [Owners_data, set_Owners_data] = useState();
  const [selected_check_box, set_selected_check_box] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const popMenuRef = useRef(null);

  const active_users = Owners_data?.filter((owner)=>{

  });

  const [searchQuery, setSearchQuery] = useState("");
  const [status_filter, set_status_filter] = useState(null);
  const [show_info_pop, set_show_info_pop] = useState(null);



  const [sortKey, setSortKey] = useState("client_id"); 
  const [sortDirection, setSortDirection] = useState("asc");
  

function filterBySearch(owner, searchQuery) {
  const searchableKeys = [
    "client_id",
    "user_name",
    "user_email",
    "user_password",
    "business_name",
    "business_address",
    "mobile_number",
    "gst_number",
    "user_Status",
  ];

  return searchableKeys.some((key) =>
    String(owner[key] || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
}

function filterByStatus(owner, status_filter) {
  if (!status_filter) return true; 
  return owner.user_Status?.toLowerCase() === status_filter.toLowerCase();
}

const filteredOwners = Owners_data
  ?.filter((owner) => {
    return (
      filterBySearch(owner, searchQuery) &&
      filterByStatus(owner, status_filter)
    );
  })
  .sort((a, b) => {
    if (!sortKey) return 0;
    if (a[sortKey] < b[sortKey]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Handle sorting
  const handleSort = (key) => {
    const isAscending = sortKey === key && sortDirection === "asc";
    setSortKey(key);
    setSortDirection(isAscending ? "desc" : "asc");
  };

  

  const handleMoreClick = (index) => {
    setActiveRow((prev) => (prev === index ? null : index));
  };

  const set_check = (e) => {
    const checkbox = e.currentTarget.querySelector('td input[type="checkbox"]');

    let is_valide_click = true;
    let user_target = e.target.tagName.toLowerCase();

    if (user_target === "img") {
      is_valide_click = false;
    } else if (user_target === "button") {
      is_valide_click = false;
    } else if (user_target === "input") {
      is_valide_click = false;
    } else {
      is_valide_click = true;
    }

    if (checkbox && is_valide_click) {
      checkbox.click();
    }
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popMenuRef.current && !popMenuRef.current.contains(event.target)) {
        setActiveRow(null); // Close the menu
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const on_change_checkbox_sate = (email, isChecked) => {
    if (isChecked) {
      set_selected_check_box((prevSelected) => [...prevSelected, email]);
    } else {
      set_selected_check_box((prevSelected) =>
        prevSelected.filter((item) => item !== email)
      );
    }
  };

  const select_all_check_box = () => {
    const allEmails = filteredOwners.map(owner => owner.user_email);
    set_selected_check_box(allEmails);
  };
  

  const deselect_all_check_box = () => {
    set_selected_check_box([]);
  };

  const invert_selection = () => {
    const allEmails = filteredOwners.map(owner => owner.user_email);
    set_selected_check_box(prevSelected => 
      allEmails.filter(email => !prevSelected.includes(email))
    );
  };

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await fetch("http://localhost:4000/Admin/owners");
        const data = await response.json();
        set_Owners_data(data);
      } catch (error) {
        console.error("Error fetching owners:", error);
      }
    };

    fetchOwners();
  }, []);

  function export_as_json(){
      const data = filteredOwners;
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'filtered_owners_data.json';
      link.click();
  }

  return (
    <div className="Admin_main_con">
      <div className="nav">
        <div className="web_app_img">
          <img src={app_icon} alt="" />
        </div>
        <div className="ohter_nav_bar_part">
          <div className="switch_part_menu">
            <div
              className={`item ${active_page === "Dashboard" && "active"}`}
              onClick={() => {
                set_active_page("Dashboard");
              }}
            >
              Dashboard
            </div>
            <div
              className={`item ${active_page === "people" && "active"}`}
              onClick={() => {
                set_active_page("people");
              }}
            >
              people
            </div>
            <div
              className={`item ${active_page === "Hiring" && "active"}`}
              onClick={() => {
                set_active_page("Hiring");
              }}
            >
              Hiring
            </div>
            <div
              className={`item ${active_page === "Devices" && "active"}`}
              onClick={() => {
                set_active_page("Devices");
              }}
            >
              Devices
            </div>
            <div
              className={`item ${active_page === "App" && "active"}`}
              onClick={() => {
                set_active_page("App");
              }}
            >
              App
            </div>
          </div>
          <div className="setting">
            <div className="icon">
              <img src={setting_icon} alt="" />
            </div>
            <div className="text">Setting</div>
          </div>
          <div className="ohter_icon">
            <div className="item">
              <img src={notification_icon} alt="" />
            </div>
            <div className="item">
              <img src={user_icon} alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* main body */}
      <div className="Admin_body">
        {active_page === "Dashboard" && (
          <>
            <div className="Dashboard">
              <div className="title_1">People</div>
              <div className="title_2">
                <div>
                  <div className="progress_bar_tile">Active user</div>
                  <div className="progress_bar">
                    <div className="bar_" style={{width:"50%"}}>78%</div>
                  </div>
                </div>
                <div className="select_menu">
                  <Menu title="Directory" items={menuItems} />
                  <Menu title="OrgChat" items={menuItems} />
                  <Menu title="Insights" items={menuItems} />
                </div>
              </div>

              <div className="main_Dashboard">
                <div className="main_Dashboard_title_bar">
                  <div className="main_title_1">
                    <Menu title="Selection" is_active={selected_check_box.length !== 0 && true}
                        items={[
                          {label:"Select All",onClick:()=>{select_all_check_box()}},
                          {label:"Invert Selection",onClick:()=>{invert_selection()}},
                          {label:"Clear All",onClick:()=>{deselect_all_check_box()}},
                          ]} />
                    <Menu title="Status"   is_active={status_filter !== null && true}
                    items={[
                          {label:"All active",onClick:()=>{set_status_filter("active")}},
                          {label:"All inactive",onClick:()=>{set_status_filter("inactive")}},
                          {label:"Clear Status",onClick:()=>{set_status_filter(null)}},
                          ]} />
                    <div className="custom_input">
                      <div className="icon">
                        <img src={search_icon} alt="" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search"
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="main_title_2">
                    <div className="icon">
                      <img src={plus_icon} alt="" />
                    </div>
                    <div className="icon">
                      <img src={filter_icon} alt="" />
                    </div>
                    <div className="icon_title" onClick={()=>{export_as_json()}}>
                      <img src={export_icon} alt="" />
                      <div className="title">Export</div>
                    </div>
                  </div>
                </div>
                <div className="main_Dashboard_data">
                  <table className="owner-table">
                    <thead>
                      <tr>
                        <th></th>
                        <th  onClick={() => handleSort("client_id")}  className={`${sortKey === 'client_id' ? 'active_title' : ''}`}>
                            {sortKey === 'client_id' ? (
                              <img  src={sort_icon}  alt="sort_icon"  style={{ transform: sortDirection === 'asc' ? 'none' : 'rotate(180deg)' }}  />
                            ) : (
                              <img src={unfold_icon} alt="unfold_icon" />
                            )} Client ID
                        </th>
                        {/* user_name */}
                        <th  onClick={() => handleSort("user_name")}  className={`${sortKey === 'user_name' ? 'active_title' : ''}`}>
                            {sortKey === 'user_name' ? (
                              <img  src={sort_icon}  alt="sort_icon"  style={{ transform: sortDirection === 'asc' ? 'none' : 'rotate(180deg)' }}  />
                            ) : (
                              <img src={unfold_icon} alt="unfold_icon" />
                            )} User Name
                        </th>
                        {/* user_email */}
                        <th  onClick={() => handleSort("user_email")}  className={`${sortKey === 'user_email' ? 'active_title' : ''}`}>
                            {sortKey === 'user_email' ? (
                              <img  src={sort_icon}  alt="sort_icon"  style={{ transform: sortDirection === 'asc' ? 'none' : 'rotate(180deg)' }}  />
                            ) : (
                              <img src={unfold_icon} alt="unfold_icon" />
                            )} User Email
                        </th>
                        <th  onClick={() => handleSort("user_password")}  className={`${sortKey === 'user_password' ? 'active_title' : ''}`}>
                            {sortKey === 'user_password' ? (
                              <img  src={sort_icon}  alt="sort_icon"  style={{ transform: sortDirection === 'asc' ? 'none' : 'rotate(180deg)' }}  />
                            ) : (
                              <img src={unfold_icon} alt="unfold_icon" />
                            )} User password
                        </th>
                        <th  onClick={() => handleSort("business_name")}  className={`${sortKey === 'business_name' ? 'active_title' : ''}`}>
                            {sortKey === 'business_name' ? (
                              <img  src={sort_icon}  alt="sort_icon"  style={{ transform: sortDirection === 'asc' ? 'none' : 'rotate(180deg)' }}  />
                            ) : (
                              <img src={unfold_icon} alt="unfold_icon" />
                            )} Business Name
                        </th>
                        <th  onClick={() => handleSort("business_address")}  className={`${sortKey === 'business_address' ? 'active_title' : ''}`}>
                            {sortKey === 'business_address' ? (
                              <img  src={sort_icon}  alt="sort_icon"  style={{ transform: sortDirection === 'asc' ? 'none' : 'rotate(180deg)' }}  />
                            ) : (
                              <img src={unfold_icon} alt="unfold_icon" />
                            )} Business Address
                        </th>
                        <th  onClick={() => handleSort("mobile_number")}  className={`${sortKey === 'mobile_number' ? 'active_title' : ''}`}>
                            {sortKey === 'mobile_number' ? (
                              <img  src={sort_icon}  alt="sort_icon"  style={{ transform: sortDirection === 'asc' ? 'none' : 'rotate(180deg)' }}  />
                            ) : (
                              <img src={unfold_icon} alt="unfold_icon" />
                            )} Mobile Number
                        </th>
                        <th  onClick={() => handleSort("gst_number")}  className={`${sortKey === 'gst_number' ? 'active_title' : ''}`}>
                            {sortKey === 'gst_number' ? (
                              <img  src={sort_icon}  alt="sort_icon"  style={{ transform: sortDirection === 'asc' ? 'none' : 'rotate(180deg)' }}  />
                            ) : (
                              <img src={unfold_icon} alt="unfold_icon" />
                            )} GST Number
                        </th>
                        <th  onClick={() => handleSort("user_Status")}  className={`${sortKey === 'user_Status' ? 'active_title' : ''}`}>
                            {sortKey === 'user_Status' ? (
                              <img  src={sort_icon}  alt="sort_icon"  style={{ transform: sortDirection === 'asc' ? 'none' : 'rotate(180deg)' }}  />
                            ) : (
                              <img src={unfold_icon} alt="unfold_icon" />
                            )} Status
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOwners?.map((owner, index) => (
                        <tr key={index} onClick={(event) => set_check(event)}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selected_check_box.includes(
                                owner.user_email
                              )}
                              onChange={(e) =>
                                on_change_checkbox_sate(
                                  owner.user_email,
                                  e.target.checked
                                )
                              }
                            />
                          </td>

                          <td>{owner.client_id}</td>
                          <td>{owner.user_name}</td>
                          <td>{owner.user_email}</td>
                          <td>{owner.user_password}</td>
                          <td>{owner.business_name}</td>
                          <td>{owner.business_address}</td>
                          <td>{owner.mobile_number}</td>
                          <td>{owner.gst_number}</td>
                          <td>{owner.user_Status}</td>
                          <td>
                            <img src={more_icon} alt="More Icon" style={{ cursor: "pointer" }} onClick={() => handleMoreClick(index)} />
                            {activeRow === index && (
                              <div
                                className="pop_menu"
                                ref={popMenuRef}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span>
                                  <img src={delete_icon} alt="Delete Icon" />
                                  Delete
                                </span>
                                <span>
                                  <img src={edite_icon} alt="Edit Icon" />
                                  Edit
                                </span>
                                <span onClick={()=>{set_show_info_pop(true)}}>
                                  
                                  <img src={info_icon} alt="Info Icon" />
                                  Info
                                </span>
                                {show_info_pop && <PopMenu owner={owner} onClose={()=>{set_show_info_pop(false)}}/> }
                              </div>

                              
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/*  */}
                </div>
              </div>
            </div>
          </>
        )}
        {active_page === "people" && (
          <>
            <h1>people</h1>
          </>
        )}
        {active_page === "Hiring" && (
          <>
            <h1>Hiring</h1>
          </>
        )}
        {active_page === "Devices" && (
          <>
            <h1>Devices</h1>
          </>
        )}
        {active_page === "App" && (
          <>
            <h1>App</h1>
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;
