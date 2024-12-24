const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'Jwt_key_for_photography_website';
function create_jwt_token(user_email,user_name){
    let data_for_jwt = {user_name,user_email}
    let jwt_token = jwt.sign(data_for_jwt,JWT_SECRET_KEY)
    return jwt_token;
  }
  
  // helper -- 2
  function check_jwt_token(jwt_token) {
    try {
        const data = jwt.verify(jwt_token, JWT_SECRET_KEY);
        return data;
    } catch (err) {
        console.error(err);
        return null; 
    }
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

const { send_forgot_password_email } = require('../modules/send_server_email');
router.post('/login', (req, res) => {
    const { admin_email, admin_password } = req.body;

    if (!admin_email || !admin_password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const query = 'SELECT * FROM Admins WHERE admin_email = ?';
    db.query(query, [admin_email], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length === 0) {
            return res.status(200).json({ message: "Email not found" });
        }

        const admin = results[0];
        if (admin.admin_password !== admin_password) {
            return res.status(200).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = create_jwt_token(admin.admin_email, admin.admin_name);

        res.status(200).json({
            message: "Login successful",
            token: token,
            admin: {
                admin_id: admin.admin_id,
                admin_name: admin.admin_name,
                admin_email: admin.admin_email,
                access_type: admin.access_type
            }
        });
    });
});

router.post('/check-jwt', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }

    const data = check_jwt_token(token);

    if (!data) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    return res.status(200).json({
        message: "Token is valid",
        data: data
    });
});

router.get('/owners', async (req, res) => {
    const query = 'SELECT * FROM trevita_project_1.owner;';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query at admin owners:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});


router.get('/get_all_admin', (req, res) => {
    db.query('SELECT * FROM Admins', (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error fetching admins", error: err });
        } else {

            res.json(results);
        }
    });
});


router.put('/update_data', (req, res) => {
    const { admin_id, admin_name, admin_email, admin_password, access_type } = req.body;

    if (!admin_id) {
        return res.status(200).json({ message: "Admin ID is required" });
    }

    let updateQuery = 'UPDATE Admins SET ';
    let updateFields = [];
    let values = [];

    if (admin_name) {
        updateFields.push('admin_name = ?');
        values.push(admin_name);
    }
    if (admin_email) {
        updateFields.push('admin_email = ?');
        values.push(admin_email);
    }
    if (admin_password) {
        updateFields.push('admin_password = ?');
        values.push(admin_password);
    }
    if (access_type) {
        updateFields.push('access_type = ?');
        values.push(access_type);
    }

    if (updateFields.length === 0) {
        return res.status(200).json({ message: "No valid data to update" });
    }

    updateQuery += updateFields.join(', ') + ' WHERE admin_id = ?';
    values.push(admin_id);

    db.query(updateQuery, values, (err, results) => {
        if (err) {
            console.error("Error updating admin data:", err);
            return res.status(500).json({ message: "Error updating admin data", error: err.message });
        }

        if (results.affectedRows > 0) {
            res.json({ message: "Admin data updated successfully", updatedRows: results.affectedRows });
        } else {
            res.status(404).json({ message: "Admin not found or no changes made" });
        }
    });
});

router.post("/update-last-login", (req, res) => {
    const { admin_email } = req.body;

    if (!admin_email) {
        return res.status(400).json({ message: "Admin email is required" });
    }

    const query = 'UPDATE Admins SET last_login = NOW() WHERE admin_email = ?';

    db.query(query, [admin_email], (err, results) => {
        if (err) {
            console.error("Error updating last login:", err);
            return res.status(500).json({ message: "Error updating last login", error: err.message });
        }

        if (results.affectedRows > 0) {
            res.json({ message: "Last login updated successfully", updatedRows: results.affectedRows });
        } else {
            res.status(200).json({ message: "Admin not found or no changes made" });
        }
    });
});

router.post("/save_admin_data", (req, res) => {
    const { 
        admin_name, 
        admin_email, 
        admin_password, 
        access_type, 
        admin_phone_number, 
        admin_address, 
        date_of_joining 
    } = req.body;

    // Validate that admin_email is provided
    if (!admin_email) {
        return res.status(400).json({ message: "Admin email is required" });
    }

    // Check if the admin_email already exists in the database
    const checkQuery = 'SELECT * FROM Admins WHERE admin_email = ?';
    db.query(checkQuery, [admin_email], (err, results) => {
        if (err) {
            console.error("Error checking if email exists:", err);
            return res.status(500).json({ message: "Error checking admin email", error: err.message });
        }

        // Prepare dynamic fields for query
        const fields = [];
        const values = [];

        if (admin_name) {
            fields.push("admin_name = ?");
            values.push(admin_name);
        }
        if (admin_password) {
            fields.push("admin_password = ?");
            values.push(admin_password);
        }
        if (access_type) {
            fields.push("access_type = ?");
            values.push(access_type);
        }
        if (admin_phone_number) {
            fields.push("admin_phone_number = ?");
            values.push(admin_phone_number);
        }
        if (admin_address) {
            fields.push("admin_address = ?");
            values.push(admin_address);
        }
        if (date_of_joining) {
            fields.push("date_of_joining = ?");
            values.push(date_of_joining);
        }

        // If the email exists, perform an update
        if (results.length > 0) {
            if (fields.length === 0) {
                return res.status(400).json({ message: "No fields provided for update" });
            }

            const updateQuery = `
                UPDATE Admins 
                SET ${fields.join(', ')}
                WHERE admin_email = ?
            `;

            db.query(updateQuery, [...values, admin_email], (err, results) => {
                if (err) {
                    console.error("Error updating admin data:", err);
                    return res.status(500).json({ message: "Error updating admin data", error: err.message });
                }

                return res.json({ message: "Admin data updated successfully" });
            });
        } else {
            // If the email does not exist, perform an insert
            const insertFields = ["admin_email", ...fields.map(field => field.split(" = ")[0])];
            const insertValues = [admin_email, ...values];

            const insertQuery = `
                INSERT INTO Admins (${insertFields.join(', ')}, last_login) 
                VALUES (${insertFields.map(() => '?').join(', ')}, NOW())
            `;

            db.query(insertQuery, insertValues, (err, results) => {
                if (err) {
                    console.error("Error saving admin data:", err);
                    return res.status(500).json({ message: "Error saving admin data", error: err.message });
                }

                return res.json({ message: "Admin data saved successfully", adminId: results.insertId });
            });
        }
    });
});



router.delete('/delete_data', (req, res) => {
    const { admin_id } = req.body;

    if (!admin_id) {
        return res.status(200).json({ message: "Admin ID is required" });
    }

    const deleteQuery = 'DELETE FROM trevita_project_1.Admins WHERE admin_id = ?';

    db.query(deleteQuery, [admin_id], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error deleting admin", error: err });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: "Admin not found" });
        } else {
            res.json({ message: "Admin deleted successfully" });
        }
    });
});


router.post('/add_admin', (req, res) => {
    const { admin_name, admin_email, access_type } = req.body;

    if (!admin_name || !admin_email || !access_type) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = `INSERT INTO admins (admin_name, admin_email, access_type, date_of_joining) 
                 VALUES (?, ?, ?, NOW())`;

    db.query(sql, [admin_name, admin_email, access_type], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ 
                    message: "Admin with this email already exists", 
                    error: err 
                });
            }
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: "Error adding admin", error: err });
        }
        res.status(201).json({ 
            message: "Admin added successfully", 
            adminId: result.insertId 
        });
    });
});


router.get('/pending-users', (req, res) => {
    const query = 'SELECT * FROM owner WHERE user_Status = "Pending"';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

router.post('/owner', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const query = 'SELECT * FROM owner WHERE user_email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(200).json({ message: 'Owner not found' });
        }

        res.json(results[0]);
    });
});

router.get('/reject-users', (req, res) => {
    const query = 'SELECT * FROM owner WHERE user_Status = "Reject"';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching rejected users:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


router.get('/get_all_owner', (req, res) => {
    const query = 'SELECT * FROM owner';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching all owners:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

router.post('/get_admin_by_email', (req, res) => {
    const { admin_email } = req.body;

    if (!admin_email) {
        return res.status(400).json({
            error: 'Admin email is required.'
        });
    }

    const query = 'SELECT * FROM trevita_project_1.admins WHERE admin_email = ?';
    
    db.query(query, [admin_email], (err, results) => {
        if (err) {
            console.error('Error fetching admin:', err.message);
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ 
                error: 'No admin found with the given email.'
            });
        }

        res.json(results[0]);
    });
});

router.delete('/delete_admin', (req, res) => {
    const { admin_email, admin_password } = req.body;

    if (!admin_email || !admin_password) {
        return res.status(200).json({
            status: "error",
            message: 'Admin email and password are required.'
        });
    }

    // First check if admin exist ------
    const checkQuery = 'SELECT admin_password FROM trevita_project_1.admins WHERE admin_email = ?';
    
    db.query(checkQuery, [admin_email], (err, results) => {
        if (err) {
            console.error('Error checking admin:', err.message);
            return res.status(500).json({ 
                status: "error",
                message: "Database error occurred"
            });
        }

        if (results.length === 0) {
            return res.status(200).json({
                status: "error", 
                message: 'No admin account found with this email'
            });
        }

        if (results[0].admin_password !== admin_password) {
            return res.status(200).json({
                status: "error",
                message: 'Incorrect password'
            });
        }

        // If password matches===== == = = 
        const deleteQuery = 'DELETE FROM trevita_project_1.admins WHERE admin_email = ?';
        
        db.query(deleteQuery, [admin_email], (deleteErr, result) => {
            if (deleteErr) {
                console.error('Error deleting admin:', deleteErr.message);
                return res.status(500).json({
                    status: "error",
                    message: "Failed to delete account"
                });
            }

            res.json({
                status: "success",
                message: 'Admin account deleted successfully'
            });
        });
    });
});

router.post("/forgot-password", (req, res) => {
    const { admin_email } = req.body;

    if (!admin_email) {
        return res.status(400).json({
            status: "error",
            message: "Admin email is required"
        });
    }

    // Find admin by email
    const findQuery = 'SELECT admin_password FROM trevita_project_1.admins WHERE admin_email = ?';
    
    db.query(findQuery, [admin_email], async (err, results) => {
        if (err) {
            console.error('Error finding admin:', err.message);
            return res.status(500).json({
                status: "error", 
                message: "Database error occurred"
            });
        }

        if (results.length === 0) {
            return res.status(200).json({
                status: "error",
                message: "No admin account found with this email"
            });
        }

        const password = results[0].admin_password;
        
        try {
            await send_forgot_password_email(admin_email, password);

            res.status(200).json({
                status: "success",
                message: "Password has been sent to your email"
            });
        } catch (error) {
            console.error("Error sending password email:", error);
            res.status(500).json({
                status: "error",
                message: "Failed to send password email"
            });
        }
    });
});
router.post("/change-password", (req, res) => {
    const { admin_email, current_password, new_password } = req.body;

    if (!admin_email || !current_password || !new_password) {
        return res.status(400).json({
            status: "error",
            message: "Email, current password and new password are required"
        });
    }

    // Step 1: Find admin by email
    const findQuery = 'SELECT admin_password FROM trevita_project_1.admins WHERE admin_email = ?';
    
    db.query(findQuery, [admin_email], (err, results) => {
        if (err) {
            console.error('Error finding admin:', err.message);
            return res.status(500).json({
                status: "error",
                message: "Database error occurred"
            });
        }

        if (results.length === 0) {
            return res.status(200).json({
                status: "error", 
                message: "No admin account found with this email"
            });
        }

        // Step 2: Verify current password
        const stored_password = results[0].admin_password;
        if (stored_password !== current_password) {
            return res.status(200).json({
                status: "error",
                message: "Current password is incorrect"
            });
        }

        // Step 3: Update with new password
        const updateQuery = 'UPDATE trevita_project_1.admins SET admin_password = ? WHERE admin_email = ?';
        
        db.query(updateQuery, [new_password, admin_email], (updateErr) => {
            if (updateErr) {
                console.error('Error updating password:', updateErr.message);
                return res.status(500).json({
                    status: "error",
                    message: "Failed to update password"
                });
            }

            res.status(200).json({
                status: "success",
                message: "Password updated successfully"
            });
        });
    });
});

module.exports = router;
