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



router.get('/status-count', (req, res) => {
    const query = `
        SELECT 
            user_Status, 
            COUNT(*) AS count 
        FROM owner 
        GROUP BY user_Status;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }

        // Transform the results into a key-value JSON object
        const statusCounts = results.reduce((acc, row) => {
            acc[row.user_Status] = row.count;
            return acc;
        }, {});

        res.json(statusCounts);
    });
});



module.exports = router;
