const express = require('express');
const mysql = require('mysql2'); 

const router = express.Router();
const jwt = require('jsonwebtoken');


const {server_request_mode,write_log_file,error_message,info_message,success_message,normal_message} = require('./../modules/_all_help');
const { generate_otp, get_otp, clear_otp } = require('./../modules/OTP_generate');
const JWT_SECRET_KEY = 'Jwt_key_for_photography_website';

function create_jwt_token(user_email,user_name){
    let data_for_jwt = {user_name,user_email}
    let jwt_token = jwt.sign(data_for_jwt,JWT_SECRET_KEY)
    return jwt_token;
  }
  

  const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',      
    password: '12345',      
    database: 'Trevita_Project_1', 
    authPlugins: {
        mysql_native_password: () => require('mysql2/lib/auth_plugins').mysql_native_password
    }
  });

  


router.post("/add_owner", (req, res) => {

    const { user_name, user_email, user_password, business_name, business_address, mobile_number, GST_number } = req.body;
  
    const checkEmailQuery = 'SELECT * FROM owner WHERE user_email = ?';
    const checkUserQuery = 'SELECT * FROM owner WHERE user_name = ?';
    
    
    db.query(checkEmailQuery, [user_email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Database error' });
        }
        else if (result.length > 0) {
            return res.status(200).json({ error: 'Email already exists' });
        }
        db.query(checkUserQuery, [user_name], (err, result) => {
          if (err) {
              console.log(err);
              return res.status(500).json({ error: 'Database error' });
          }else
          if (result.length > 0) {
              return res.status(200).json({ error: 'user name already exists' });
          }

          return res.status(200).json({ message: 'go for otp' });

          
      });
    
    });

    
  });

  router.post("/login", (req, res) => {
    const { user_email, user_password } = req.body;
  
  
    if (!user_email || !user_password) {
      return res.status(200).json({ error: "Email and password are required" });
    }
  
    const query =
      "SELECT * FROM trevita_project_1.owner WHERE user_email = ? AND user_password = ?";
  
    
    db.query(query, [user_email, user_password], (err, results) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ error: "Internal server error" });
      }
  
      if (results.length > 0) {
  
        const user_name = results[0].user_name;
       const token =  create_jwt_token(user_email,user_name);
        return res.status(200).json({ message: "Login successful", user: results[0], user_key: token });
  
      } else {
        return res.status(200).json({ error: "Invalid email or password",status:"login-fail" });
      }
    });
  });
  
  router.delete("/delete-by-email", (req, res) => {
    const { user_email } = req.body;
  
    if (!user_email) {
      return res.status(400).json({ error: "Email is required" });
    }
  
    const query = "DELETE FROM trevita_project_1.owner WHERE user_email = ?";
  
    db.query(query, [user_email], (err, result) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ error: "Internal server error" });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "No user found with this email" });
      }
  
      res.status(200).json({ message: "User deleted successfully" });
    });
  });

  function getNotifications(notification_type, notification_message, notification_title, callback) {
    const query = `
    INSERT INTO notification (notification_type, notification_message, notification_title, created_at) 
    VALUES (?, ?, ?, NOW())`;

// Execute the query with placeholders for security
db.query(query, [notification_type, notification_message, notification_title], (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        return callback(err, null);
    }
    callback(null, results);
});
  }


  router.post("/verify_otp_owner", async (req, res) => {
    const {type,user_send_otp , user_name, user_email, user_password, business_name, business_address, mobile_number, GST_number } = req.body;
  
    if (!user_email || !user_send_otp || !type) {
      error_message("verify_otp say : Email and OTP are required")
      return res.status(400).json({ error: "Email and OTP are required" });
    }
    try {
      let storedOtp;
      if(type == "owner"){
        storedOtp = get_otp(user_email,"owner")
      }else{
        storedOtp = get_otp(user_email,"client")
      }
      if (storedOtp && storedOtp === user_send_otp) {
        

        let Pending ="Pending"
  
      const insertQuery = 'INSERT INTO owner (user_name, user_email, user_password, business_name, business_address, mobile_number, GST_number,user_Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(insertQuery, [user_name, user_email, user_password, business_name, business_address, mobile_number, GST_number,Pending], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Database error' });
            }
            let token = create_jwt_token(user_email,user_name);
            getNotifications("padding_owner",`new request on ${user_email}`, "padding request", (err, results) => {
              if (err) {
                  return res.status(500).json({ error: 'Failed to fetch notifications' });
              }
              console.log("all set at notification");
              res.status(200).json({ message: 'OTP verified successfully', user_key : token });
              
            });
            
        });
      } else {
        res.status(200).json({ error: "Invalid OTP" });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ error: "Failed to verify OTP" });
    }
  });

  router.post("/reset_password_verify_otp", async (req, res) => {
    const body_otp = req.body.user_send_otp;
    const user_email = req.body.user_email;
    if (body_otp === get_otp(user_email,"owner")) {
      return res.status(200).json({ message: "user pass with OTP", status: "verify-pass" });
    } else {
      return res.status(200).json({ message: "OTP does not match", status: "verify-fail" });
    }
  });

  router.post('/set_new_password', (req, res) => {
    const { email, new_password } = req.body;
  
    if (!email || !new_password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  //1 --
    const findUserQuery = `SELECT user_name FROM owner WHERE user_email = ?`;
  
    db.query(findUserQuery, [email], (err, result) => {
      if (err) {
        console.error('Database error while finding user:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (result.length === 0) {
        return res.status(404).json({ message: 'User not found', status: 'user-not-found' });
      }
  
      const user_name = result[0].user_name;
  
      //2 --
      const updateQuery = `UPDATE owner SET user_password = ? WHERE user_email = ?`;
  
      db.query(updateQuery, [new_password, email], (updateErr, updateResult) => {
        if (updateErr) {
          console.error('Database error while updating password:', updateErr);
          return res.status(500).json({ error: 'Database error' });
        }
  
        if (updateResult.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found', status: 'user-not-found' });
        }
  
        //  3 /--
        const token = create_jwt_token(email, user_name);
        info_message(`Email ${email} has updated their password`)
  
        // Send the response
        res.status(200).json({ message: 'Password updated successfully', status: 'password-updated', user_key: token });
      });
    });
  });
  router.put('/update-owner', (req, res) => {
    const email = req.body.user_email; // Find by this email
  
    if (!email) {
      return res.status(400).json({ error: 'Email is required to update the record.' });
    }
  
    // Initialize an empty object for the data to be updated
    const updateData = {};
  
    // Only add fields to updateData if they are provided in the request body
    if (req.body.client_id) updateData.client_id = req.body.client_id;
    if (req.body.user_name) updateData.user_name = req.body.user_name;
    if (req.body.user_email) updateData.user_email = req.body.user_email;
    if (req.body.user_password) updateData.user_password = req.body.user_password;
    if (req.body.business_name) updateData.business_name = req.body.business_name;
    if (req.body.business_address) updateData.business_address = req.body.business_address;
    if (req.body.mobile_number) updateData.mobile_number = req.body.mobile_number;
    if (req.body.gst_number) updateData.gst_number = req.body.gst_number;
    if (req.body.user_Status) updateData.user_Status = req.body.user_Status;
    if (req.body.admin_message) updateData.admin_message = req.body.admin_message;
    if (req.body.set_status_by_admin) updateData.set_status_by_admin = req.body.set_status_by_admin;
  
    // Check if there is any data to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No data provided to update.' });
    }
  
    const query = 'UPDATE owner SET ? WHERE user_email = ?';
  
    db.query(query, [updateData, email], (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        return res.status(500).json({ error: 'An error occurred while updating the record.' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'No user found with the provided email.' });
      }
  
      res.status(200).json({ message: 'Record updated successfully.', result });
    });
  });
  
  
  

module.exports = router;