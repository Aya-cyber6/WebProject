const express = require('express');  //express: Web framework for building the server.
const mysql = require('mysql2');   
const bcrypt = require('bcrypt'); // If you're hashing passwords  
const cors = require('cors');       //cors: Allows requests from frontend on another port (React runs on port 3000).
 
//Create the Express app and define the port it will listen on.
const app = express();
const PORT = 5000;

app.use(cors());           //Enables CORS to allow requests from frontend. 
app.use(express.json());   //Enables the server to parse JSON request bodies (like {email, password}).


// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'aya123',  
  database: 'my_app_db',

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

//Defines a POST endpoint /api/saveUser.
app.post('/api/saveUser', (req, res) => {
  const { email, password } = req.body;  //Extracts email and password from the frontend’s request.

  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';  //Prepares a parameterized SQL query (prevents SQL injection).
  pool.query(query, [email, password], (err, results) => {
      if (err) {
        console.error("SQL Error:", err);
        if (err.code === 'ER_DUP_ENTRY') { //If the email is already in the table (duplicate), send a 400 status with a friendly message.
          return res.status(400).json({ message: 'Email already in use' });
        }
        return res.status(500).json({ message: 'Error saving user data', error: err.message });
      }

    res.status(200).json({ message: 'User saved successfully' });
  });
});

// Login route: Checks if the user exists and if the password matches
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  pool.query(query, [email], (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    // If you're not hashing passwords, do plain text match:
    if (user.password === password) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }

    // bcrypt hashed passwords:
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    });
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
