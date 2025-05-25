const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // default is empty in XAMPP
  database: "webdb",
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

// Example API route
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.send(err);
    res.json(results);
  });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      return res.status(500).send({ message: "Database error" });
    }
    if (results.length > 0) {
      res.send({ message: "Login successful" });
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  });
});


app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).send({ message: "Email already registered" });
      }
      return res.status(500).send({ message: "Database error" });
    }

    res.send({ message: "User registered successfully" });
  });
});


app.listen(3001, () => {
  console.log("Server running on port 3001");
});
