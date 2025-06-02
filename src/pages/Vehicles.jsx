import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Altbar from '../components/Altbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from '@fortawesome/free-solid-svg-icons';

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const tc = localStorage.getItem("tc");

    axios.get(`http://localhost:3001/vehicle/${tc}`)
      .then((res) => {
        setVehicles(res.data); 
      })
      .catch((err) => {
        console.error("Araç verisi alınamadı:", err);
      });
  }, []);

  const display = (value) =>
    value !== undefined && value !== null && value !== "" ? value : "Yok";

  return (
    <div className="container mt-5 mb-5" style={{ paddingBottom: "80px", paddingTop: "40px" }}>
      <h2
        className="mb-4 fw-bold d-flex align-items-center gap-2"
        style={{
          fontSize: "2rem",
          color: "#2c3e50",
          textShadow: "1px 1px 3px rgba(0,0,0,0.1)"
        }}
      >
        <FontAwesomeIcon icon={faCar} /> Araçlarım
      </h2>

      <div
        className="shadow p-4 rounded mb-4"
        style={{
          background: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
          color: "#2c3e50",
          maxWidth: "100%",
          fontWeight: "600",
          boxShadow: "0 8px 15px rgba(0,0,0,0.1)"
        }}
      >
        <h5 className="card-title mb-3">🚗 Araç Bilgileri</h5>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Marka</th>
                <th>Model</th>
                <th>Yıl</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length > 0 ? (
                vehicles.map((vehicle, index) => (
                  <tr key={index}>
                    <td>{display(vehicle.brand)}</td>
                    <td>{display(vehicle.model)}</td>
                    <td>{display(vehicle.year)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">Kayıtlı araç bulunamadı.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Altbar />
    </div>
  );
}

export default Vehicles;
