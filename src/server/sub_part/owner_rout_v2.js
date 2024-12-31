const express = require('express');
const mysql = require('mysql2'); 

const router = express.Router();


  
  const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',      
    password: '12345',      
    database: 'Trevita_Project_1', 
    authPlugins: {
        mysql_native_password: () => require('mysql2/lib/auth_plugins').mysql_native_password
    }
  }).promise();




  router.get('/all-data', async (req, res) => {
    try {
        // Use `await` to ensure the queries are completed before proceeding.
        const [admins] = await db.query('SELECT * FROM admins');
        const [owners] = await db.query('SELECT * FROM owner');
        const [clients] = await db.query('SELECT * FROM clients');
        const [packages] = await db.query('SELECT * FROM Packages');
        const [totalExpense] = await db.query('SELECT * FROM TotalExpense');

        // Send the JSON response once data is fetched.
        res.json({
            totalAdmins: admins.length,
            totalOwners: owners.length,
            totalClients: clients.length,
            totalPackages: packages.length,
            totalExpenses: totalExpense.length,
            admins: admins,
            owners: owners,
            clients: clients,
            packages: packages,
            expenses: totalExpense
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;