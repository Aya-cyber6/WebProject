import React from 'react';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';
import Card from './components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSection from './components/HeroSection';
import ServicesGrid from './components/ServicesGrid';

function App() {
  const handleSearch = (text) => {
    console.log("Searching for:", text);
  };

  return (
    <>
      <Navbar />
      <HeroSection/>
      <ServicesGrid />
      <div className="container mt-5">

      </div>
    </>
  );
}

export default App;
