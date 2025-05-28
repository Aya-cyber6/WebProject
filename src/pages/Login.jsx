import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import LoginForm from "../components/LoginForm";
import Altbar from "../components/Altbar";

function Login() {
 /* const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", formData);
      setMessage(res.data.message || "Login successful!");
      navigate('/dashboard');
    } catch (err) {
      setMessage("Login failed. Check your credentials.");
    }
  };*/

  return (
    <div>
      <LoginForm/>
      <Altbar/>
    </div>
  );
}

export default Login;
