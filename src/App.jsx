import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TransparentNavbar from './components/TransparentNavbar';
import Card from './components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSection from './components/HeroSection';
import ServicesGrid from './components/ServicesGrid';
import ImageCardCarousel from './components/ImageCardCarousel';
import Login from './pages/Login';
import ServiceGrid from './components/ServiceGrid';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import Altbar from './components/Altbar';

function App() {
  return (
    <>
      <TransparentNavbar/>
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection/>
            <div className="d-flex justify-content-center p-4">
              <div className="d-flex gap-4">
                <Card />
                <ImageCardCarousel />
              </div>
            </div>
            <ServiceGrid />
            <ServicesGrid />
            <Altbar/>
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />

      </Routes>
    </>
  );
}

export default App;
