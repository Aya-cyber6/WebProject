import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({ tc: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  //forma verdiğimiz değerleri usestate kullanarak formdata olarak alıyoruz
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", formData);
      if (res.data.user) {
        localStorage.setItem("tc", res.data.user.tc);
        setMessage(res.data.message || "Login successful!");
        navigate('/home');
      } else {
        setMessage("Giriş başarısız.");
      }
    } catch (err) {
      setMessage("Login failed. Check your credentials.");
    }
  };

  //  Kayıt Ol butonuna basıldığında /register sayfasına git
  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="container mt-5" style={{ paddingTop: '60px' }}>
      <div className="d-flex justify-content-center mb-4">
        <h2>Login</h2>
      </div>
      <div className="d-flex justify-content-center mb-4">
        <FontAwesomeIcon icon={faUser} size="4x" style={{ color: '#0d6efd' }} />
      </div>

      <form className="text-center" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="tc" className="form-label">TC Kimlik No</label>
          <input
            type="text"
            className="form-control w-25 mx-auto"
            id="tc"
            name="tc"
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
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-outline-primary mt-3 me-2">Giriş Yap</button>
        <button type="button" className="btn btn-outline-secondary mt-3" onClick={handleRegister}>Kayıt Ol</button>
      </form>

      {message && <p className="text-center mt-3 text-danger">{message}</p>}
    </div>
  );
}

export default LoginForm;
