import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const services = [
  { title: 'Adli Sicil Belgesi', icon: '📄' },
  { title: 'Kimlik Bilgileri', icon: '🆔' },
  { title: 'Vergi Borcu', icon: '💰' },
];

export default function ServicesGrid() {
  return (
    <div
      className="container-fluid my-4 rounded"
      style={{
        backgroundColor: '#40E0D0', // firuze green
        minHeight: '300px',         // make container taller
        paddingTop: '100px',
        paddingBottom: '40px',
      }}
    >
      <Row>
        {services.map((service, idx) => (
          <Col md={4} key={idx}>
            <Card className="text-center">
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>{service.icon}</div>
                <Card.Title>{service.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
