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
import Documents from './pages/Documents';
import Work from './pages/Work';
import Vehicles from './pages/Vehicles';
import Debts from './pages/Debts';

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
        <Route path="/documents" element={<Documents/>}/>
        <Route path="/work-history" element={<Work/>}/>
        <Route path="/vehicles" element={<Vehicles/>}/>
        <Route path="/debts" element={<Debts/>}/>

      </Routes>
    </>
  );
}

export default App;
