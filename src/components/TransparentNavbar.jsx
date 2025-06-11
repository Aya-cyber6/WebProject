import React, { useState, useEffect } from 'react'; 
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function TransparentNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // scroll miktarı
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const tc = localStorage.getItem("tc");
    setIsLogged(!!tc); // tc varsa true, yoksa false
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tc");
    setIsLogged(false);
    navigate("/login");
  };

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
            {!isLogged ? (
              <>
                <Nav.Link href="/Login">Login</Nav.Link>
                <Nav.Link href="/Register">Sign in</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <style jsx="true">{`
        .transition-navbar {
          transition: background-color 0.8s ease;
        }
        .bg-initial {
          background-color: rgba(0, 0, 0, 0.15) !important;
          backdrop-filter: blur(5px);
        }
        .bg-primary {
          background-color: rgba(20, 22, 26, 0.90) !important;
        }
      `}</style>
    </Navbar>
  );
}

