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

CREATE TABLE IF NOT EXISTS debts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tc VARCHAR(11) NOT NULL,
  place VARCHAR(255) NOT NULL,
  last_date DATE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  INDEX idx_tc (tc)
);


CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tc VARCHAR(11) NOT NULL,
  debt_id INT,
  amount_paid DECIMAL(10,2) NOT NULL,
  payment_type VARCHAR(50),
  card_number VARCHAR(20),
  payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (debt_id) REFERENCES debts(id) ON DELETE SET NULL
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
      res.status(401).send({ message: "Giriş başarısız" });
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


app.get("/debts/:tc", (req, res) => { 
  const { tc } = req.params;

  if (!tc) {
    return res.status(400).send({ message: "TC kimlik numarası gerekli." });
  }

  const query = "SELECT id, place, last_date, amount FROM debts WHERE tc = ?";
  con.query(query, [tc], (err, results) => {
    if (err) {
      console.error("Borç verileri alınamadı:", err);
      return res.status(500).send({ message: "Sunucu hatası." });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: "Borç bulunamadı." });
    }

    res.send(results);
  });
});


app.post("/pay", (req, res) => {
  const { tc, selectedDebts, paymentType, cardNumber } = req.body;

  if (!tc || !selectedDebts || selectedDebts.length === 0 || !paymentType || !cardNumber) {
    return res.status(400).send({ message: "Eksik ödeme verisi." });
  }

  const faizRates = {
    tek: 0,
    "6ay": 0.2,
    "12ay": 0.4,
    "18ay": 0.6,
  };

  const faizOrani = faizRates[paymentType];
  if (faizOrani === undefined) {
    return res.status(400).send({ message: "Geçersiz ödeme türü." });
  }

  let totalAmount = 0;
  for (const debt of selectedDebts) {
    totalAmount += debt.amount * (1 + faizOrani);
  }
  totalAmount = Number(totalAmount.toFixed(2));

  const paymentInsertSql = `INSERT INTO payments (tc, debt_id, amount_paid, payment_type, card_number, payment_date) VALUES ?`;
  const paymentDate = new Date();

  const paymentValues = [];
  selectedDebts.forEach((debt) => {
    const amountPaid = debt.amount * (1 + faizOrani);
    paymentValues.push([
      tc,
      debt.id,
      amountPaid.toFixed(2),
      paymentType,
      cardNumber,
      paymentDate,
    ]);
  });

  con.beginTransaction((err) => {
    if (err) {
      console.error("Transaction başlatılamadı:", err);
      return res.status(500).send({ message: "Sunucu hatası." });
    }

    con.query(paymentInsertSql, [paymentValues], (err, result) => {
      if (err) {
        return con.rollback(() => {
          console.error("Ödeme kaydı eklenemedi:", err);
          res.status(500).send({ message: "Ödeme kaydı eklenemedi." });
        });
      }

      const debtIds = selectedDebts.map((d) => d.id);
      const deleteSql = `DELETE FROM debts WHERE id IN (?) AND tc = ?`;
      con.query(deleteSql, [debtIds, tc], (err, result) => {
        if (err) {
          return con.rollback(() => {
            console.error("Borçlar silinemedi:", err);
            res.status(500).send({ message: "Borçlar silinemedi." });
          });
        }

        con.commit((err) => {
          if (err) {
            return con.rollback(() => {
              console.error("Commit yapılamadı:", err);
              res.status(500).send({ message: "Ödeme tamamlanamadı." });
            });
          }

          res.send({ message: "Ödeme başarılı." });
        });
      });
    });
  });
});

app.put("/user/address", (req, res) => {
  const { tc, address } = req.body;
  const sql = "UPDATE users SET address = ? WHERE tc = ?";

  con.query(sql, [address, tc], (err, result) => {
    if (err) {
      console.error("Adres güncelleme hatası:", err);
      return res.status(500).send({ message: "Adres güncellenemedi." });
    }

    res.send({ message: "Adres başarıyla güncellendi." });
  });
});


app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} üzerinden çalışıyor`);
});
