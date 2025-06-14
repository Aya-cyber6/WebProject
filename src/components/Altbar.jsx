import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router kullanıyorsan

function Altbar() {
  const [activeId, setActiveId] = useState(1);
  const navigate = useNavigate(); // yönlendirme için

  const navItems = [
    { id: 1, label: 'Bize Yazın', icon: 'bi bi-chat-dots'},
    { id: 2, label: 'Çağrı Merkezi', icon: 'bi bi-telephone'},
    { id: 3, label: 'Belgelerim', icon: 'bi bi-folder2-open' , url: "/documents" },
    { id: 4, label: 'Hakkımızda', icon: 'bi bi-info-circle' },
  ]; //altbara eklenen itemlerimiz

  const styles = {
    nav: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      height: 60,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      borderTop: '1px solid #ddd',
      boxShadow: '0 -2px 5px rgba(0,0,0,0.05)',
      zIndex: 1000,
    },
    button: {
      background: 'none',
      border: 'none',
      outline: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: 12,
      color: '#6c757d',
      cursor: 'pointer',
    },
    activeButton: {
      color: '#0d6efd',
      fontWeight: 'bold',
    },
    icon: {
      fontSize: 20,
    },
  };

  const handleClick = (item) => {
    setActiveId(item.id);
    navigate(item.url); // İteme tıklandığında Sayfa yönlendirmesi
  };

  return (
    <nav style={styles.nav}>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item)} //hangi iteme tıklandı ise .map ile tespit edip oraya yönlendiriliyor
          style={{
            ...styles.button,
            ...(activeId === item.id ? styles.activeButton : {}),
          }}
        >
          <i className={item.icon} style={styles.icon}></i>
          <div>{item.label}</div>
        </button>
      ))}
    </nav>
  );
}

export default Altbar;
