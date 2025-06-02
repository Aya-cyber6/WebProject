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

app.get("/user/:tc", (req, res) => {
  const { tc } = req.params;

  if (!tc) {
    return res.status(400).send({ message: "TC is required" });
  }

  const query = "SELECT email, name, surname, tc, birthdate, address, phone FROM users WHERE tc = ?";
  db.query(query, [tc], (err, results) => {
    if (err) {
      return res.status(500).send({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send(results[0]); 
  });
});

//Çalışılan yer bilgisi
app.get("/work/:tc", (req, res) => {
  const { tc } = req.params;

  if (!tc) {
    return res.status(400).send({ message: "TC is required" });
  }

  const query = "SELECT  work_name, last_day, first_day, total_day FROM works WHERE tc = ? ORDER BY last_day DESC";
  db.query(query, [tc], (err, results) => {
    if (err) {
      return res.status(500).send({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: "Works not found" });
    }

    res.send(results); 
  });
});

//toplam çalışılan günü hesaplar
app.get("/work/total/:tc", (req, res) => {
  const { tc } = req.params;

  if (!tc) {
    return res.status(400).send({ message: "TC is required" });
  }


  const query = "SELECT SUM(total_day),tc FROM works WHERE tc = ? Group By tc";
  db.query(query, [tc], (err, results) => {
    if (err) {
      return res.status(500).send({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: "Works not found" });
    }

    res.send(results); 
  });
});

//araçları listelemek için
app.get("/vehicle/:tc", (req, res) => {
  const { tc } = req.params;

  if (!tc) {
    return res.status(400).send({ message: "TC is required" });
  }


  const query = "SELECT brand,model,year,tc FROM works WHERE tc = ?";
  db.query(query, [tc], (err, results) => {
    if (err) {
      return res.status(500).send({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: "Vehicles not found" });
    }

    res.send(results); 
  });
});

//borçları getirir
app.get("/debts/:tc", (req, res) => {
  const { tc } = req.params;

  if (!tc) {
    return res.status(400).send({ message: "TC is required" });
  }


  const query = "SELECT place,last_date,amount,tc FROM works WHERE tc = ?";
  db.query(query, [tc], (err, results) => {
    if (err) {
      return res.status(500).send({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: "Debts not found" });
    }

    res.send(results); 
  });
});



app.listen(3001, () => {
  console.log("Server running on port ");
});
