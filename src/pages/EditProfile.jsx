import React, { useState, useEffect } from "react";
import axios from "axios";
import Altbar from "../components/Altbar";

const EditProfile = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    birthday: "",
    email: "",
    address: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const tc = localStorage.getItem("tc");

    axios
      .get(`http://localhost:3001/user/${tc}`)
      .then((res) => {
        setUser({
          name: res.data.name || "",
          surname: res.data.surname || "",
          birthday: res.data.birthday ? res.data.birthday.split("T")[0] : "",
          email: res.data.email || "",
          address: res.data.address || "",
          phone: res.data.phone || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Kullanıcı verisi alınamadı:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tc = localStorage.getItem("tc");

    axios
      .put(`http://localhost:3001/user/${tc}`, user)
      .then(() => {
        setMessage("Profil başarıyla güncellendi!");
      })
      .catch((err) => {
        console.error("Profil güncellenirken hata:", err);
        setMessage("Profil güncellenemedi.");
      });
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div
      className="container mt-5 mb-5"
      style={{ maxWidth: "600px", paddingBottom: "80px", paddingTop: "40px" }}
    >
      <h2 className="mb-4 fw-bold" style={{ color: "#2c3e50" }}>
        Profili Düzenle
      </h2>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>İsim</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Soyad</label>
          <input
            type="text"
            name="surname"
            value={user.surname}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Doğum Tarihi</label>
          <input
            type="date"
            name="birthday"
            value={user.birthday}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Adres</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Telefon</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Güncelle
        </button>
      </form>

      <div className="mt-5">
        <Altbar />
      </div>
    </div>
  );
};

export default EditProfile;
