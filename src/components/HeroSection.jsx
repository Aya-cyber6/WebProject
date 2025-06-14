import React from 'react';
import myBanner from '../assets/pic.jpg';

export default function HeroSection() {
  const backgroundStyle = {
    height: '350px',
    background: `
              url(${myBanner}) center center / cover no-repeat`,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  };

  return (
    <div style={backgroundStyle}>
      <div>
        <h1>e-Dünya'ya Hoş Geldiniz</h1>
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Size nasıl yardım edebilirim?"
          style={{ maxWidth: '400px', margin: '0 auto' }}
        />
      </div>
    </div>
  );
}
