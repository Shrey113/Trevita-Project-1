
const express = require('express');
const mysql = require('mysql2'); 
const cors = require("cors");
const app = express();
const chalk = require('chalk');


app.use(express.json()); 
app.use(cors())


const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',      
    password: '12345',      
    database: 'Trevita_Project_1', 
    authPlugins: {
        mysql_native_password: () => require('mysql2/lib/auth_plugins').mysql_native_password
    }
});


db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to MySQL database');
});
// Middleware usage
app.use((req, res, next) => {
    server_request_mode(req.method, req.url, req.body);
    next();
  });
  

app.post("/",(req,res)=>{
    res.send("hi server user")
});


app.post("/owener/add_owener",(req,res)=>{
    const { user_name, user_email, user_password,business_name,business_address,mobile_number,GST_number} = req.body;
    
    const query = 'INSERT INTO owener (user_name, user_email, user_password,business_name,business_address,mobile_number,GST_number) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query,[user_name, user_email, user_password,business_name,business_address,mobile_number,GST_number],(err,result) =>{
        if(err){
            console.log(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(result).status(200);
    });
});

app.get('/get_all_data', (req, res) => {
    const query = 'SELECT * trevita_project_1.owener;';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});




const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:4000`);
});


function server_request_mode(method, url, body) {
    function truncateString(input, charLimit) {
      return input.length > charLimit ? input.substring(0, charLimit) + "..." : input;
    }
  
    function truncateBodyContent(body, charLimit) {
      const truncatedBody = {};
      for (const [key, value] of Object.entries(body)) {
        const truncatedKey = truncateString(key, charLimit);
        const truncatedValue = typeof value === 'string' ? truncateString(value, charLimit) : value;
        truncatedBody[truncatedKey] = truncatedValue;
      }
      return truncatedBody;
    }
    
    const truncatedUrl = truncateString(url, 30);
    const truncatedBody = truncateBodyContent(body, 20);
  
    const baseLog = [
      chalk.hex('#fffd94')(method.padEnd(8)),
      chalk.green(truncatedUrl.padEnd(35)),
    ];
  
    if (Object.keys(truncatedBody).length > 0) {
      const formattedBody = Object.entries(truncatedBody)
        // .map(([key, value]) => `{ ${key}: ${value} }`)
        .map(([key, value]) => `{${key}}`)
        .join(',');
      baseLog.push(chalk.magenta(formattedBody));
    }
  
    console.log(...baseLog);
  }