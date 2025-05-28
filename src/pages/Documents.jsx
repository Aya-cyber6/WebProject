import React from 'react'
import DocumentCard from '../components/DocumentCard'
import Altbar from '../components/Altbar'
import { useState } from 'react';
import { useEffect } from 'react';

function Documents() {
    const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Örnek veri çağrısı — burayı gerçek API'nizle değiştirin
    const fetchDocuments = async () => {
      try {
        const response = await fetch('/documents'); 
        const data = await response.json();
        setDocuments(data); 
      } catch (error) {
        console.error('Veriler alınırken hata oluştu:', error);
      }
    };

    fetchDocuments();
  }, []);
  return (
    <div>
      {documents.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '80px' }}>
          Henüz belge bulunmuyor.
        </p>
      ) : (
        documents.map((doc, i) => (
          <DocumentCard
            key={i}
            name={doc.name}
            date={doc.date}
            context={doc.context}
          />
        ))
      )}
      <Altbar/>
    </div>
  )
}export default Documents
