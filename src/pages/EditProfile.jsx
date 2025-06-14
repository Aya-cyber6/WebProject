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

  if (loading) return <p className="text-center mt-5">Yükleniyor...</p>;

  return (
    <>
      <div
        className="container mt-5 mb-5"
        style={{ maxWidth: "600px", paddingBottom: "120px", paddingTop: "40px" }}
      >
        <h2 className="mb-4 fw-bold text-center" style={{ color: "#2c3e50" }}>
          Profili Düzenle
        </h2>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit}>
          {[
            { label: "İsim", name: "name", type: "text", required: true },
            { label: "Soyad", name: "surname", type: "text", required: true },
            { label: "Doğum Tarihi", name: "birthday", type: "date" },
            { label: "Email", name: "email", type: "email", required: true },
            { label: "Adres", name: "address", type: "text" },
            { label: "Telefon", name: "phone", type: "text" },
          ].map((field) => (
            <div className="mb-3" key={field.name}>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={user[field.name]}
                onChange={handleChange}
                className="form-control"
                required={field.required}
              />
            </div>
          ))}

          <button type="submit" className="btn btn-primary w-100">
            Güncelle
          </button>
        </form>
      </div>

      <Altbar />
    </>
  );
};

export default EditProfile;
