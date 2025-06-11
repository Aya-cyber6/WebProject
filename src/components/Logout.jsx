import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("tc"); // veya sessionStorage.removeItem("tc");
    navigate("/");
  }, [navigate]);

  return null; 
};

export default Logout;