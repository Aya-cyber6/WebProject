import React, { useState, useEffect } from "react";
import axios from "axios";
import Altbar from "../components/Altbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faPlus } from "@fortawesome/free-solid-svg-icons";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    plate: "",
    brand: "",
    model: "",
    year: "",
    color: "",
  });
  const [brandStats, setBrandStats] = useState([]); //marka filtresi için

  const tc = localStorage.getItem("tc");

  useEffect(() => {
    if (!tc) {
      alert("Giriş yapmanız gerekiyor.");
      return;
    }
    fetchVehicles();
  }, []);

  const fetchVehicles = () => {
    axios
      .get(`http://localhost:3001/vehicle/${tc}`)
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error("Araç verisi alınamadı:", err));
  };

  const handleInputChange = (e) => {
    setNewVehicle({ ...newVehicle, [e.target.name]: e.target.value });
  };

  const handleAddVehicle = () => {
    const { plate, brand, model, year, color } = newVehicle;
    if (!plate || !brand || !model || !year || !color) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    axios
      .post("http://localhost:3001/vehicle", {
        ...newVehicle,
        tc: tc,
      })
      .then(() => {
        fetchVehicles(); // Listeyi yenile
        setNewVehicle({ plate: "", brand: "", model: "", year: "", color: "" }); // Formu sıfırla
      })
      .catch((err) => console.error("Araç eklenemedi:", err));
  };

  const fetchBrandStats = () => {
    if (!tc) return;

    fetch(`http://localhost:3001/vehicle/brands/stats/${tc}`)
      .then((res) => res.json())
      .then((data) => {
        setBrandStats(data);
      })
      .catch((err) => {
        console.error("İstatistikler alınamadı:", err);
      });
  };

  //araç var ise yoksa 
  const display = (value) =>
    value !== undefined && value !== null && value !== "" ? value : "Yok";

  return (
    <div
      className="container mt-5 mb-5"
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
        <FontAwesomeIcon icon={faCar} /> Araçlarım
      </h2>

      {/* Araç Listesi */}
      <div
        className="shadow p-4 rounded mb-4"
        style={{
          background: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
          color: "#2c3e50",
          fontWeight: "600",
          boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h5 className="card-title mb-3">🚗 Araç Bilgileri</h5>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Plaka</th>
                <th>Marka</th>
                <th>Model</th>
                <th>Yıl</th>
                <th>Renk</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length > 0 ? (
                vehicles.map((vehicle, index) => (
                  <tr key={index}>
                    <td>{display(vehicle.plate)}</td>
                    <td>{display(vehicle.brand)}</td>
                    <td>{display(vehicle.model)}</td>
                    <td>{display(vehicle.year)}</td>
                    <td>{display(vehicle.color)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Kayıtlı araç bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Araç Ekleme Formu */}
      <div
        className="shadow p-4 rounded"
        style={{
          background: "#f0f0f0",
          color: "#2c3e50",
          maxWidth: "100%",
          fontWeight: "600",
        }}
      >
        <h5 className="mb-3">
          <FontAwesomeIcon icon={faPlus} /> Yeni Araç Ekle
        </h5>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              name="plate"
              value={newVehicle.plate}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Plaka"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="brand"
              value={newVehicle.brand}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Marka"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="model"
              value={newVehicle.model}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Model"
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              name="year"
              value={newVehicle.year}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Yıl"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="color"
              value={newVehicle.color}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Renk"
            />
          </div>
        </div>
        <button className="btn btn-success mt-3" onClick={handleAddVehicle}>
          <FontAwesomeIcon icon={faPlus} /> Ekle
        </button>
      </div>

      <button className="btn btn-info mt-4" onClick={fetchBrandStats}>
        Marka İstatistiklerini Göster
      </button>
      <small className="text-muted d-block mt-1">(GROUP BY sorgusu)</small>

      {brandStats.length > 0 && (
        <div className="mt-3">
          <h5>Marka İstatistikleri</h5>
          <ul className="list-group">
            {brandStats.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                <span>
                  <strong>{item.brand}</strong>
                </span>
                <span>{item.total} araç</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Altbar />
    </div>
  );
}

export default Vehicles;
