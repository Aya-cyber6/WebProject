import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DocumentCard from '../components/DocumentCard';
import Altbar from '../components/Altbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

function Documents() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const tc = localStorage.getItem("tc");

        const response = await axios.get(`http://localhost:3001/document/${tc}`);
        setDocuments(response.data);
      } catch (error) {
        console.error('Veriler alınırken hata oluştu:', error);
      }
    };

    fetchDocuments();
  }, []);

  const docsToDisplay = documents.length > 0 
    ? documents 
    : [{ id: 0, document_name: "📁 Henüz belge bulunmamaktadır", date: "", context: "" }];

  return (
    <div className="container mt-5 mb-5" style={{ paddingBottom: '80px', paddingTop: '40px' }}>
      <h2
        className="mb-4 fw-bold d-flex align-items-center gap-2"
        style={{ fontSize: "2rem", color: "#2c3e50", textShadow: "1px 1px 3px rgba(0,0,0,0.1)" }}
      >
        <FontAwesomeIcon icon={faFolderOpen} /> Belgelerim
      </h2>

      <div
        className="d-flex flex-column gap-3"
        style={{ maxWidth: '700px', margin: '0 auto' }}
      >
        {docsToDisplay.map((doc, i) => (
          <DocumentCard
            key={i}
            id={i + 1}
            name={doc.document_name}
            date={doc.date}
            context={doc.context}
            icon={<FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '8px', color: '#0d6efd' }} />}
          />
        ))}
      </div>

      <Altbar />
    </div>
  );
}

export default Documents;
