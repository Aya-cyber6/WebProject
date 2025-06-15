import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faCalendarDay, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function DocumentCard({ id, name, date, context }) {
  const [isVisible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible(!isVisible);
  };

  return (
    //belgeleri gösteren div için csslerimiz
    <div
      className="shadow rounded"
      onClick={handleToggle}
      style={{
        cursor: 'pointer',
        background: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)',
        padding: '20px',
        borderRadius: '10px',
        border: '1.5px solid #00796b',
        boxShadow: '0 8px 15px rgba(0, 121, 107, 0.3)',
        maxWidth: '700px',
        margin: '0 auto',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="d-flex align-items-center gap-3 mb-2">
        <FontAwesomeIcon icon={faFileAlt} size="lg" style={{ color: '#00796b' }} /> {/* belegeler iconu*/}
        <h4 className="m-0" style={{ color: '#004d40' }}>
          {name || `Belge ${id}`} {/* belge ismi var ise ismini yoksa belge id gösteriyor*/}
        </h4>
      </div>

      {isVisible && (
        <div
          className="mt-3"
          style={{
            backgroundColor: '#b2dfdb',
            borderRadius: '8px',
            padding: '15px',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
            color: '#004d40',
            fontWeight: '600',
          }}
        >
          <p>
            <FontAwesomeIcon icon={faCalendarDay} className="me-2" />
            <strong>Tarih:</strong> {date || 'Belirtilmemiş'}
          </p>
          <p>
            <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
            <strong>İçerik:</strong> {context || 'Detay yok'}
          </p>
        </div>
      )}
      <small style={{ color: '#004d40', fontStyle: 'italic' }}>
        (Belgeye tıklayarak detayları göster/gizle)
      </small>
    </div>
  );
}

export default DocumentCard;
