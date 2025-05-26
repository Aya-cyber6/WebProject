import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import  axios from "axios";
import { useNavigate } from 'react-router-dom';



 function LoginForm() {
  const [formData, setFormData] = useState({password: "" ,tc: ""});
    const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", formData);
      setMessage(res.data.message || "Login successful!");
      navigate('/dashboard');
    } catch (err) {
      setMessage("Login failed. Check your credentials.");
    }
  };  


  return (
    <>

        <div className="container mt-5" style={{ paddingTop: '60px' }}>
        <div className="d-flex justify-content-center mb-4">
          <h2>Login</h2>
        </div>
        <div className="d-flex justify-content-center mb-4">
        <FontAwesomeIcon icon={faUser} size="4x" style={{ color: '#0d6efd' }} />
        </div>

        <form className="text-center" onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="tc" className="form-label">TC Kimlik No</label>
            <input
              type="text"
              className="form-control w-25 mx-auto"
              id="tc"
              value={formData.tc}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Parola</label>
            <input
              type="password"
              className="form-control w-25 mx-auto"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit"  className="btn btn-outline-primary mt-3" >Giriş Yap</button>
        </form>
        <p>{message}</p>
      </div>
    </>
  );

}export default LoginForm
