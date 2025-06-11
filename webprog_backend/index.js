/*
http://localhost/phpmyadmin adresinden veritabanına erişebilir aşağıdaki SQL kodlarını çalıştırarak gerekli tabloları oluşturabilirsiniz:


CREATE DATABASE IF NOT EXISTS webdb;
USE webdb;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tc VARCHAR(11) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    birthday DATE,
    address TEXT,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS work (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tc VARCHAR(11) NOT NULL,
    company_name VARCHAR(255),
    position VARCHAR(100),
    start_date DATE,
    end_date DATE,
    total_day INT,
    FOREIGN KEY (tc) REFERENCES users(tc) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vehicle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tc VARCHAR(11) NOT NULL,
    plate VARCHAR(20),
    brand VARCHAR(100),
    model VARCHAR(100),
    year INT,
    color VARCHAR(50),
    FOREIGN KEY (tc) REFERENCES users(tc) ON DELETE CASCADE
);
*/
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "webdb", 
});

con.connect((err) => {
  if (err) {
    console.error("MySQL bağlantı hatası:", err);
    return;
  }
  console.log("MySQL'e başarıyla bağlanıldı.");
});

app.post("/login", (req, res) => {
  const { tc, password } = req.body;

  const sql = "SELECT * FROM users WHERE tc = ? AND password = ?";
  con.query(sql, [tc, password], (err, result) => {
    if (err) {
      console.error("Giriş sırasında hata:", err);
      return res.status(500).send({ message: "Sunucu hatası." });
    }

    if (result.length > 0) {
      res.send({ message: "Giriş başarılı!", user: result[0] });
    } else {
      res.status(401).send({ message: "Login failed" });
    }
  });
});

app.post("/register", (req, res) => {
  console.log("Kayıt isteği verileri:", req.body);  // Burada form verileri konsola basılır

  const {
    tc,
    name,
    surname,
    email,
    phone,
    birthday,
    address,
    password,
    confirmPassword,
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send({ message: "Parolalar eşleşmiyor." });
  }

  const sql = "INSERT INTO users (tc, name, surname, email, phone, birthday, address, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  con.query(
    sql,
    [tc, name, surname, email, phone, birthday, address, password],
    (err, result) => {
      if (err) {
        console.error("Kayıt sırasında hata:", err);
        return res.status(500).send({ message: "Kayıt başarısız." });
      }
      res.send({ message: "Kayıt başarılı!" });
    }
  );
});

app.get("/user/:tc", (req, res) => {
  const tc = req.params.tc;
  const sql = "SELECT tc, name, surname, birthday, email, phone, address FROM users WHERE tc = ?";

  con.query(sql, [tc], (err, result) => {
    if (err) {
      console.error("Kullanıcı bilgileri alınamadı:", err);
      return res.status(500).send({ message: "Sunucu hatası." });
    }

    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(404).send({ message: "Kullanıcı bulunamadı." });
    }
  });
});

app.get("/works/:tc", (req, res) => {
  const tc = req.params.tc;
  const sql = "SELECT * FROM work WHERE tc = ?";
  con.query(sql, [tc], (err, results) => {
    if (err) {
      console.error("Çalışma verileri alınamadı:", err);
      return res.status(500).send({ message: "Sunucu hatası." });
    }
    res.send(results);
  });
});

app.get("/works/total/:tc", (req, res) => {
  const tc = req.params.tc;
  const sql = "SELECT SUM(total_day) AS total_days FROM work WHERE tc = ?";
  con.query(sql, [tc], (err, result) => {
    if (err) {
      console.error("Toplam gün sorgusu başarısız:", err);
      return res.status(500).send({ message: "Sunucu hatası." });
    }
    res.send(result[0]);
  });
});

app.get("/vehicle/:tc", (req, res) => {
  const tc = req.params.tc;
  const sql = "SELECT * FROM vehicle WHERE tc = ?";
  con.query(sql, [tc], (err, result) => {
    if (err) {
      console.error("Araç verileri alınamadı:", err);
      return res.status(500).send({ message: "Sunucu hatası." });
    }
    res.send(result);
  });
});


app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} üzerinden çalışıyor`);
});
