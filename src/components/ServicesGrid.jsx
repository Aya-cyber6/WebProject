import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // 🌐 Link bileşeni

const services = [
  { title: 'Adli Sicil Belgesi', icon: '📄' },
  { title: 'Kişisel Bilgiler', icon: '🆔', url:'/dashboard' },
  { title: 'Vergi Borcu', icon: '💰', url: '/debts' },
];

function ServicesGrid() {
  return (
    <div
      className="container-fluid my-4 rounded"
      style={{
        backgroundColor: '#40E0D0',
        minHeight: '300px',
        paddingTop: '100px',
        paddingBottom: '40px',
      }}
    >
      <Row>
        {services.map((service, idx) => {
          const content = (
            <Card className="text-center h-100 shadow-sm">
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>{service.icon}</div>
                <Card.Title>{service.title}</Card.Title>
              </Card.Body>
            </Card>
          );

          return (
            <Col md={4} key={idx}>
              {service.url ? (
                <Link to={service.url} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {content}
                </Link>
              ) : (
                content
              )}
            </Col>
          );
        })}
      </Row>
    </div>
  );
} export default ServicesGrid
