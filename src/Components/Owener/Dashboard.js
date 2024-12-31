import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Status_Pending from './../../Assets/Owener/file.gif';
import Status_rejected from './../../Assets/Owener/rejected.gif';
import Status_Accept from './../../Assets/Owener/Accept.gif';
// import delete_icon from './../../Assets/Owener/delete.png';
import { localstorage_key_for_client } from './../../redux/AllData';


import './css/Dashboard.css';
import HomePage from './HomePage.js'

function Dashboard() {
    const user = useSelector((state) => state.user);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        console.log(user);
    }, [user]);

    const user_Status = user.user_Status;

    const set_img =
        user_Status === 'Pending'
            ? Status_Pending
            : user_Status === 'Reject'
            ? Status_rejected
            : Status_Accept;

    const set_text =
        user_Status === 'Pending'
            ? 'Status Pending!'
            : user_Status === 'Reject'
            ? 'Status Rejected?'
            : 'Status Accepted';

    const UserEmail = () => <span>{user.user_email}</span>;

    const handleApplyAgain = async () => {
        try {
            const response = await fetch('http://localhost:4000/owner/delete-by-email', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_email: user.user_email
                })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.removeItem(localstorage_key_for_client);
                window.location.href = '/Owner';
            } else {
                console.error('Error:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        user_Status === 'Accept' ? <HomePage/> :
        <div className="Dashboard_main_con">
            <div className="status-container">
                <img src={set_img} alt={set_text} className="status-icon" />
                <h2>{set_text}</h2>
                <div className="dec">
                    {user_Status === 'Pending' && (
                        <>
                            Your request is currently awaiting approval. The admin
                            will review it promptly and take the necessary action.
                            Thank you for your understanding, <UserEmail />.
                        </>
                    )}
                    {user_Status === 'Reject' && (
                        <>
                            Your request has been rejected. If you have any
                            questions or need further clarification, please
                            contact the admin. Thank you, <UserEmail />.
                        </>
                    )}
                    {user_Status === 'Accept' && (
                        <>
                            Your request has been accepted. Welcome aboard,{' '}
                            <UserEmail />! We're excited to have you with us.
                        </>
                    )}
                </div>

                <div className="button_con">
                    <button className="view-details-button" onClick={() => setShowPopup(true)}>
                        View Full Details
                    </button>
                    
                    {user_Status === 'Reject' && (
                        <button className="view-details-button" onClick={handleApplyAgain}>
                            Apply Again
                        </button>
                    )}
                </div>
            </div>

            {/* Pop-up Modal */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>User Details</h2>


                        <table className="user-data-table">
                            <tbody>
                                <tr>
                                    <th>Client ID</th>
                                    <td>{user.client_id}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>{user.user_name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{user.user_email}</td>
                                </tr>
                                <tr>
                                    <th>Password</th>
                                    <td>******</td>
                                </tr>
                                <tr>
                                    <th>Business Name</th>
                                    <td>{user.business_name}</td>
                                </tr>
                                <tr>
                                    <th>Business Address</th>
                                    <td>{user.business_address}</td>
                                </tr>
                                <tr>
                                    <th>Mobile</th>
                                    <td>{user.mobile_number}</td>
                                </tr>
                                <tr>
                                    <th>GST Number</th>
                                    <td>{user.gst_number}</td>
                                </tr>
                            </tbody>
                        </table>
                        {user_Status === 'Accept'  &&
                            <div className="dec">
                                Accepted by Admin <span> {user.set_status_by_admin} </span>
                            </div>
                        }
                        {user_Status === 'Reject'  &&
                            
                            <div className="dec_2">
                                Admin will Rejected  your request 
                                {user.admin_message && <span>Rejected reason : {user.admin_message}</span>} 
                            </div>
                        }
                        {user_Status === 'Pending' && 
                                <div className="dec">
                                    The admin will review it promptly and take the
                                    necessary action.
                                </div>
                        }

                        <button
                            className="close-popup-button"
                            onClick={() => setShowPopup(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
