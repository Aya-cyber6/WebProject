import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function TransparentNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // change 50 to whatever scroll you want
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`transition-navbar ${scrolled ? 'bg-initial' : 'bg-primary'}`}
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="/">MyBrand</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/Login">Login</Nav.Link>
            <Nav.Link href="/Register">Sign in</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <style jsx="true">{`
        .transition-navbar {
          transition: background-color 0.8s ease;
        }
        .bg-initial {
          background-color: rgba(0, 0, 0, 0.15) !important; /* black 15% transparent */
          backdrop-filter: blur(5px); /* optional */
        }
        .bg-primary {
          background-color:rgba(20, 22, 26, 0.90) !important; /* bootstrap primary */
        }
      `}</style>
    </Navbar>
  );
}
