import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // axios'u import ettik


function SignupForm() {
  const [formData, setFormData] = useState({ email: "", password: "",phone: "",name:"",surname:"",addres:"",birthday:"",confirmPassword:"" });
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
    <div className="container mt-5" style={{ paddingTop: '60px' }}>
      <div className="d-flex justify-content-center mb-4">
        <h2>Register</h2>
      </div>
      <div className="d-flex justify-content-center mb-4">
        
        <FontAwesomeIcon icon={faUser} size="4x" style={{ color: '#0d6efd' }} />

      </div>

      <form className="text-center" onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-md-4 mb-3">
            <label htmlFor="tc" className="form-label">TC Kimlik No</label>
            <input type="text" className="form-control" id="tc" value={formData.tc} onChange={handleChange} required />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="name" className="form-label">Ad</label>
            <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="surname" className="form-label">Soyad</label>
            <input type="text" className="form-control" id="surname" value={formData.surname} onChange={handleChange} required />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="text" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="phone" className="form-label">Telefon</label>
            <input type="text" className="form-control" id="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="birthday" className="form-label">Doğum Tarihi</label>
            <input type="date" className="form-control" id="birthday" value={formData.birthday} onChange={handleChange} required />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="address" className="form-label">Adres</label>
            <input type="text" className="form-control" id="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="password" className="form-label">Parola</label>
            <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="confirmPassword" className="form-label">Parola Tekrar</label>
            <input type="password" className="form-control" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
        </div>

        <button type="submit" className="btn btn-outline-primary mt-3"  >Kayıt Ol</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default SignupForm;
