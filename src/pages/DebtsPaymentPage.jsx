import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DebtsPaymentPage() {
  const [debts, setDebts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [paymentType, setPaymentType] = useState("tek");
  const [cardNumber, setCardNumber] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const faizRates = {
    tek: 0,
    "6ay": 0.2,
    "12ay": 0.4,
    "18ay": 0.6,
  };

  useEffect(() => {
    const tc = localStorage.getItem("tc");
    axios
      .get(`http://localhost:3001/debts/${tc}`)
      .then((res) => {
        if (res.data.length === 0) {
          alert("Ödenecek borcunuz bulunmamaktadır.");
          navigate("/home");
        } else {
          setDebts(res.data);
        }
      })
      .catch(() => {
        alert("Borç verileri alınamadı.");
        navigate("/home");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  useEffect(() => {
    const rate = faizRates[paymentType];
    const newTotal = selected.reduce(
      (sum, d) => sum + d.amount * (1 + rate),
      0
    );
    setTotal(newTotal.toFixed(2));
  }, [selected, paymentType]);

  const toggleSelect = (debt) => {
    setSelected((prev) =>
      prev.some((d) => d.id === debt.id)
        ? prev.filter((d) => d.id !== debt.id)
        : [...prev, debt]
    );
  };

  const handlePay = () => {
    if (selected.length === 0) {
      alert("En az bir borç seçmelisiniz.");
      return;
    }
    if (cardNumber.replace(/\s+/g, "").length < 12) {
      alert("Geçerli bir kart numarası giriniz.");
      return;
    }

    setLoading(true);
    const tc = localStorage.getItem("tc");
    const sanitizedCardNumber = cardNumber.replace(/\s+/g, "");

    axios
      .post("http://localhost:3001/pay", {
        tc,
        selectedDebts: selected.map(({ id, amount }) => ({ id, amount })),
        paymentType,
        cardNumber: sanitizedCardNumber,
      })
      .then(() => {
        setSuccessMessage("Ödeme başarılı! Ana sayfaya yönlendiriliyorsunuz...");
        setDebts((prev) => prev.filter((d) => !selected.some((s) => s.id === d.id)));
        setSelected([]);
        setTimeout(() => navigate("/home"), 2500);
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Ödeme sırasında hata oluştu.";
        alert(msg);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div
        className="container mt-5 d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <h5>Yükleniyor...</h5>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5" style={{ paddingBottom: "80px", paddingTop: "70px" }}>
      <h3 className="mb-4">Vergi Borçlarımı Öde</h3>

      {successMessage && (
        <div className="alert alert-success text-center">{successMessage}</div>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Seç</th>
            <th>Yer</th>
            <th>Son Tarih</th>
            <th>Miktar</th>
          </tr>
        </thead>
        <tbody>
          {debts.map((debt) => (
            <tr key={debt.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.some((d) => d.id === debt.id)}
                  onChange={() => toggleSelect(debt)}
                />
              </td>
              <td>{debt.place}</td>
              <td>{new Date(debt.last_date).toLocaleDateString()}</td>
              <td>{debt.amount.toFixed(2)} ₺</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-3">
        <label>Ödeme Türü:</label>
        <select
          className="form-select"
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <option value="tek">Tek Çekim</option>
          <option value="6ay">6 Ay (%20 faiz)</option>
          <option value="12ay">12 Ay (%40 faiz)</option>
          <option value="18ay">18 Ay (%60 faiz)</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Kart Numarası:</label>
        <input
          type="text"
          className="form-control"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Kart Numarası"
          maxLength={19}
          inputMode="numeric"
        />
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <strong>Toplam Tutar: {total} ₺</strong>
        <button
          className="btn btn-success"
          onClick={handlePay}
          disabled={loading || selected.length === 0}
        >
          {loading ? "Ödeme Yapılıyor..." : "Ödeme Yap"}
        </button>
      </div>
    </div>
  );
}

export default DebtsPaymentPage;





