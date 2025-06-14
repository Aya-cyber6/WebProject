import React, { useState } from "react";
import axios from "axios";
import SignupForm from "../components/SignupForm";

function Register() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/register", formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "An error occurred during registration."
      );
    }
  };

  return (
    <div>
      <SignupForm/>


    </div>
  );
}

export default Register;
