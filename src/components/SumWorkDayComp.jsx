import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faUserTie } from "@fortawesome/free-solid-svg-icons";

const SumWorkDayComp = ({ tc }) => {
  const [totalDays, setTotalDays] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tc) return;

    setLoading(true);
    axios.get(`http://localhost:3001/works/total/${tc}`)
      .then((res) => {
        const data = res.data;
        const total = Array.isArray(data) ? data[0]?.total_days : data?.total_days;
        setTotalDays(total || 0);
        setLoading(false);
      })
      .catch(() => {
        setError("Çalışma bilgileri alınamadı.");
        setLoading(false);
      });
  }, [tc]);

  const remainingDays = 7000 - totalDays;

  const retirementStatus =
    remainingDays <= 0 ? (
      <span className="text-success fw-bold">
        🥳 Tebrikler, Emekli Olabilirsiniz!
      </span>
    ) : (
      <span>
        ⏳ <strong>Emekliliğe kalan gün:</strong> {remainingDays}
      </span>
    );

  // istersen yüklenme ve hata durumlarını da göster
  // if (loading) return <p className="text-center mt-5">⏳ Yükleniyor...</p>;
  // if (error) return <p className="text-center mt-5 text-danger">⚠️ {error}</p>;

  return (
    <div className="container mt-5 mb-4" style={{ paddingBottom: "80px" }}>
      <h2
        className="mb-4 fw-bold d-flex align-items-center gap-2"
        style={{ fontSize: "2rem", color: "#2c3e50", textShadow: "1px 1px 3px rgba(0,0,0,0.1)" }}
      >
        <FontAwesomeIcon icon={faUserTie} /> Emeklilik Durumu
      </h2>

      <div
        className="shadow p-4 rounded"
        style={{
          background: "linear-gradient(135deg, #C9D6FF 0%, #E2E2E2 100%)",
          color: "#2c3e50",
          maxWidth: "600px",
          fontWeight: "600",
          boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h5 className="card-title mb-3">
          <FontAwesomeIcon icon={faCalendarCheck} className="me-2" />
          Toplam Çalışma Günleri
        </h5>
        <p style={{ fontSize: "18px" }}>{totalDays}</p>

        <hr />

        <h5 className="card-title mt-3">Durum</h5>
        <p style={{ fontSize: "18px" }}>{retirementStatus}</p>
      </div>
    </div>
  );
};

export default SumWorkDayComp;
