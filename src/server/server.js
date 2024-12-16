
const express = require('express');
const mysql = require('mysql2'); 
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json()); 
app.use(cors());

const { send_welcome_page, send_otp_page } = require('./modules/send_server_email');
const {server_request_mode,write_log_file,error_message,info_message,success_message,normal_message} = require('./modules/_all_help');
const { generate_otp, get_otp, clear_otp } = require('./modules/OTP_generate');
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


app.post("/owner/add_owner", (req, res) => {

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

app.post("/send_otp_email", async (req, res) => {
  const { email,type } = req.body;
  if (!email || !type) {
    error_message("send_otp_email say : Email and type is required")
    return res.status(400).json({ error: "Email and type is required" });
  }
  try {
    let otp;
    if(type == "owner"){
      otp = generate_otp(email,"owner")
    }else{
      otp = generate_otp(email,"client")
    }
    info_message(`An email has been sent to ${email}.OTP is ${otp}.`);

    await send_otp_page(email, otp);
    res.status(200).json({ message: `OTP email sent to ${email}` ,status:"success"});
  } catch (error) {
    console.error("Error sending OTP email:", error);
    res.status(500).json({ error: "Failed to send OTP email" });
  }
});

app.post("/verify_otp_owner", async (req, res) => {
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

    const insertQuery = 'INSERT INTO owner (user_name, user_email, user_password, business_name, business_address, mobile_number, GST_number) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(insertQuery, [user_name, user_email, user_password, business_name, business_address, mobile_number, GST_number], (err, result) => {
          if (err) {
              console.log(err);
              return res.status(500).json({ error: 'Database error' });
          }
          let token = create_jwt_token(user_email,user_name);
          res.status(200).json({ message: 'OTP verified successfully', user_key : token });
      });
    } else {
      res.status(200).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

app.post("/reset_password_verify_otp", async (req, res) => {
  const body_otp = req.body.user_send_otp;
  const user_email = req.body.user_email;
  if (body_otp === get_otp(user_email,"owner")) {
    return res.status(200).json({ message: "user pass with OTP", status: "verify-pass" });
  } else {
    return res.status(200).json({ message: "OTP does not match", status: "verify-fail" });
  }
});


// Endpoint to set a new password
app.post('/set_new_password', (req, res) => {
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


app.get('/get_all_data', (req, res) => {
    const query = 'SELECT * FROM trevita_project_1.owner;';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

app.post("/get_user_data_from_jwt", async (req, res) => {
  const jwt_token = req.body.jwt_token;

  if (!jwt_token) {
    console.error("get_user_data_from_jwt says: JWT token is required");
    return res.status(400).send("JWT token is required");
  }

  try {
    const userData = check_jwt_token(jwt_token);
    if (!userData || !userData.user_name || !userData.user_email) {
      return res.status(200).json({ error: "Invalid or incomplete JWT token" });
    }
    const find_user = 'SELECT * FROM owner WHERE user_name = ? AND user_email = ?';

    db.query(
      find_user,
      [userData.user_name, userData.user_email],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User found", user: result[0] });
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/owner/login", (req, res) => {
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
// admin
// admin
// admin
// admin

app.get('/Admin/owners', async (req, res) => {
  const query = 'SELECT * FROM trevita_project_1.owner;';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error executing query:', err.message);
          return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
  });
});





// praharsh ---- 
// praharsh ---- 
// praharsh ---- 
// praharsh ---- 
// praharsh ---- 

// client paths
app.post("/get_client_data_from_jwt", async (req, res) => {
  const jwt_token = req.body.jwt_token;

  if (!jwt_token) {
    console.error("get_user_data_from_jwt says: JWT token is required");
    return res.status(400).send("JWT token is required");
  }

  try {
    const userData = check_jwt_token(jwt_token);

    if (!userData || !userData.user_name || !userData.user_email) {
      return res.status(200).json({ error: "Invalid or incomplete JWT token" });
    }
    const find_user = 'SELECT * FROM trevita_project_1.clients WHERE user_name = ? AND user_email = ?';

    db.query(
      find_user,
      [userData.user_name, userData.user_email],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User found", user: result[0] });
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/verify_otp_client", async (req, res) => {
  const { type, otp, user_name, email, password } = req.body;

  if (!email || !otp || !type) {
    error_message("verify_otp say : Email and OTP are required");
    return res.status(400).json({ error: "Email and OTP are required" });
  }
  try {
    let storedOtp;
    if (type == "owner") {
      storedOtp = get_otp(email, "owner");
    } else {
      storedOtp = get_otp(email, "client");
    }
    if (storedOtp && storedOtp === otp) {
      const insertQuery =
        "INSERT INTO clients (user_name, user_email, user_password) VALUES ( ?, ?, ?)";
      db.query(insertQuery, [user_name, email, password], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Database error" });
        }
        let token = create_jwt_token(email, user_name);
        res
          .status(200)
          .json({ message: "OTP verified successfully", user_key: token });
      });
    } else {
      res.status(200).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

// Route for registration of client
app.post("/client/register_user", async (req, res) => {
  const { user_name, user_email, user_password } = req.body;
  console.log(user_email, user_name, user_password);

  try {
    // Check if the email already exists
    db.query(
      "SELECT * FROM trevita_project_1.clients WHERE user_email = ? OR user_name = ?",
      [user_email, user_name],
      (err, rows) => {
        if (err) {
          console.error("Database error", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (rows.length > 0) {
          if (rows.some((row) => row.user_email === user_email)) {
            return res.status(400).json({ error: "Email already exists" });
          }
          if (rows.some((row) => row.user_name === user_name)) {
            return res.status(400).json({ error: "Username already exists" });
          }
        }
        res.status(200).json({ staus: "user_name and email verified " });
      }
    );
  } catch (e) {
    console.error("Serverside error white registering user", e);
  }
});

// Route for login client
app.post("/client/login", (req, res) => {
  const { user_email, user_password } = req.body;

  if (!user_email || !user_password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const query =
    "SELECT * FROM trevita_project_1.clients WHERE user_email = ? AND user_password = ?";
  db.query(query, [user_email, user_password], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length > 0) {
      const user_name = results[0].user_name;
      const token = create_jwt_token(user_email, user_name);
      return res.status(200).json({
        message: "Login successful",
        user: results[0],
        jwt_token: token,
      });
    } else {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  });
});



const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:4000`);
});

