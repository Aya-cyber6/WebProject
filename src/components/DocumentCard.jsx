import React, { useState } from 'react';

function DocumentCard({id,name,date,context}) {
  const [isVisible, setVisible] = useState(false);


  const handleToggle = () => {
    setVisible(!isVisible);
  };

  return (
    <div className="container" style={{ marginTop: '60px' }}>
      <div className="row justify-content-center">
        <div className="col-md-8 mb-4">
          <div
            className="card shadow rounded"
            onClick={handleToggle}
            style={{
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: '#d2e8d8',
              padding: '20px',
              border: '2px solid rgb(14, 15, 14)'
            }}
          >
            <strong>Belge {id} :<h4 className="card-title">{name}</h4></strong>

            {isVisible && (
              <div className="card-body mt-3">
                <p className="card-text">
                  <strong>Tarih:</strong> {date}
                </p>
                <p className="card-text">
                  <strong>İçerik:</strong> {context}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentCard;
