import React, { useState, useEffect } from 'react';  
import axios from 'axios';
import Altbar from '../components/Altbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

function DebtsTables() {
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    const tc = localStorage.getItem("tc"); //sayfaya hangi tc ile girdiğimizi saklamak için

    axios.get(`http://localhost:3001/debts/${tc}`)
      .then((res) => {
        setDebts(res.data); 
      })
      .catch((err) => {
        console.error("Borç verisi alınamadı:", err);
      });
  }, []);

  const display = (value) =>
    value !== undefined && value !== null && value !== "" ? value : "Yok";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR");
  };

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
        <FontAwesomeIcon icon={faCreditCard} /> Vergi Borçlarım
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
        <h5 className="card-title mb-3">🧾 Borç Bilgileri</h5>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark"> {/*table kullandık 3 adet header var*/}
              <tr>
                <th>Yer</th>
                <th>Son Ödeme Tarihi</th>
                <th>Miktar</th>
              </tr>
            </thead>
            <tbody>
              {debts.length > 0 ? ( /*borç var ise bize borç bilgilerini getirmesi için*/
                debts.map((debt) => (
                  <tr key={debt.id}>
                    <td>{display(debt.place)}</td>
                    <td>{formatDate(debt.last_date)}</td>
                    <td>{display(debt.amount)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">Kayıtlı borç bulunamadı.</td>
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

export default DebtsTables;

