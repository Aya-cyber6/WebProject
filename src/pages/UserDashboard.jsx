import React, { useState, useEffect } from "react";
import axios from "axios";
import Altbar from "../components/Altbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdBadge,
  faEnvelope,
  faPhoneAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const UserDashboard = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const tc = localStorage.getItem("tc");

    axios
      .get(`http://localhost:3001/user/${tc}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Kullanıcı verisi alınamadı:", err);
      });
  }, []);

  const display = (value) =>
    value !== undefined && value !== null && value !== "" ? value : "Yok";

  return (
    <div
      className="container mt-5 mb-5 m"
      style={{ paddingBottom: "80px", paddingTop: "40px" }}
    >
      <h2
        className="mb-4 fw-bold d-flex align-items-center gap-2"
        style={{
          fontSize: "2rem",
          color: "#2c3e50",
          textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <FontAwesomeIcon icon={faIdBadge} /> Kullanıcı Paneli
      </h2>

      <div
        className="shadow p-4 rounded mb-4"
        style={{
          background: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
          color: "#2c3e50",
          maxWidth: "600px",
          fontWeight: "600",
          boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h5 className="card-title mb-3">👤 Kişisel Bilgiler</h5>
        <p>
          <strong>İsim:</strong> {display(user.name)}
        </p>
        <p>
          <strong>Soyad:</strong> {display(user.surname)}
        </p>
        <p>
          <strong>TC Kimlik No:</strong> {display(user.tc)}
        </p>
        <p>
          <strong>Doğum Tarihi:</strong>{" "}
          {user.birthday
            ? new Date(user.birthday).toLocaleDateString("tr-TR")
            : "Yok"}
        </p>
      </div>

      <div
        className="shadow p-4 rounded"
        style={{
          background: "linear-gradient(135deg, #F6F9FF 0%, #E2EAFD 100%)",
          color: "#2c3e50",
          maxWidth: "600px",
          fontWeight: "600",
          boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h5 className="card-title mb-3">📞 İletişim Bilgileri</h5>
        <p>
          <FontAwesomeIcon icon={faEnvelope} className="me-2" />
          <strong>Email:</strong> {display(user.email)}
        </p>
        <p>
          <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
          <strong>Adres:</strong> {display(user.address)}
        </p>
        <p>
          <FontAwesomeIcon icon={faPhoneAlt} className="me-2" />
          <strong>Telefon:</strong> {display(user.phone)}
        </p>
      </div>

      <div className="mt-5">
        <div className="text-center mt-4">
          <button
            className="btn btn-warning"
            onClick={() => (window.location.href = "/edit-profile")}
          >
            Profili Güncelle
          </button>
        </div>

        <Altbar />
      </div>
    </div>
  );
};

export default UserDashboard;
