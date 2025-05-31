import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

const AllWorks = ({ tc }) => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tc) return;

    axios.get(`http://localhost:3001/works/${tc}`)
      .then(res => {
        setWorks(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Çalışma bilgileri alınamadı.");
        setLoading(false);
      });
  }, [tc]);

  const display = (value) => (value !== undefined && value !== null && value !== "") ? value : "Yok";

  const workCards = works.length > 0 ? works : [{}];

  //backend testi yaparken bunları yorum satırına alırsanız çıktıları görürsünüz
  //if (loading) return <p className="text-center mt-5" style={{ fontSize: "18px" }}>⌛ Yükleniyor...</p>;
  //if (error) return <p className="text-center mt-5 text-danger" style={{ fontSize: "18px" }}>⚠️ {error}</p>;


  return (
    <div className="container mt-4 mb-3">
      <h2 
        className="mb-4 fw-bold d-flex align-items-center gap-2"
        style={{ fontSize: "2rem", color: "#2c3e50", textShadow: "1px 1px 3px rgba(0,0,0,0.1)" }}
      >
        <FontAwesomeIcon icon={faBriefcase} /> Çalışılan Yerler
      </h2>

      <div className="d-flex flex-column gap-4">
        {workCards.map((work, i) => (
          <div 
            key={i} 
            className="shadow p-4 rounded"
            style={{
              background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
              color: "#2c3e50",
              minWidth: "320px",
              maxWidth: "600px",
              fontWeight: "600",
              boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h4 style={{ fontSize: "1.6rem", marginBottom: "12px" }}>
              {work.work_name ? `🏢 ${display(work.work_name)}` : "🚫 Çalışma Bilgisi Yok"}
            </h4>
            <p>📅 <strong>Başlangıç Tarihi:</strong> {display(work.first_day)}</p>
            <p>📅 <strong>Bitiş Tarihi:</strong> {display(work.last_day)}</p>
            <p>🕒 <strong>Toplam Gün:</strong> {display(work.total_day)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllWorks;
