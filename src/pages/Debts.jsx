import React from "react";
import DebtsTables from "../components/DebtsTable";
import Altbar from "../components/Altbar";
import { useNavigate } from "react-router-dom";

function Debts() {
  const navigate = useNavigate();

  const handlePaymentClick = () => {
    navigate("/payment");
  };

  return (
    <div className="container mt-4">
      <DebtsTables />
      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-primary" onClick={handlePaymentClick}>
          Borç Öde
        </button>
      </div>
      <Altbar />
    </div>
  );
}

export default Debts;