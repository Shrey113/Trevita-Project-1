const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'Trevita_Project_1',
    authPlugins: {
        mysql_native_password: () => require('mysql2/lib/auth_plugins').mysql_native_password
    }
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

module.exports = router;
