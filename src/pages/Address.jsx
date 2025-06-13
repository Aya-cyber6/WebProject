import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Address = () => {
  const [address, setAddress] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const tc = localStorage.getItem('tc');

  useEffect(() => {
    if (tc) {
      setLoading(true);
      axios.get(`http://localhost:3001/user/${tc}`)
        .then(res => setAddress(res.data.address))
        .catch(() => setMessage('Adres alınamadı.'))
        .finally(() => setLoading(false));
    }
  }, [tc]);

  const handleUpdate = () => {
    if (!newAddress.trim()) {
      setMessage('Adres boş bırakılamaz.');
      return;
    }
    setLoading(true);
    axios.put('http://localhost:3001/user/address', { tc, address: newAddress })
      .then(() => {
        setAddress(newAddress);
        setIsEditing(false);
        setMessage('Adres başarıyla güncellendi.');
      })
      .catch(() => setMessage('Adres güncellenemedi.'))
      .finally(() => setLoading(false));
  };

  return (
<div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
  <div className="w-100" style={{ maxWidth: '700px' }}>
    <div className="card shadow p-4">
      <h4 className="text-center mb-4">İkamet Bilgilerim</h4>

      <div className="mb-3">
        <label className="form-label">Mevcut Adres:</label>
        <div className="bg-light p-3 rounded" style={{ minHeight: '100px' }}>
          {address || 'Adres bilgisi bulunamadı.'}
        </div>
      </div>

      {isEditing && (
        <div className="mb-3">
          <label className="form-label">Yeni Adres:</label>
          <textarea
            className="form-control"
            rows={4}
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
        </div>
      )}

      <div className="d-flex justify-content-end gap-2">
        {isEditing ? (
          <>
            <button className="btn btn-success" onClick={handleUpdate}>Güncelle</button>
            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>İptal</button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={() => { setIsEditing(true); setNewAddress(address); }}>
            Adresi Düzenle
          </button>
        )}
      </div>
    </div>
  </div>
</div>




  );
};

export default Address;





