import React from 'react';
import pet from '../assets/pet.png';

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark px-3"
      style={{ backgroundColor: 'black' }}
    >
      <a className="navbar-brand d-flex align-items-center" href="/">
        <img src={pet} alt="pet" width="100" height="70" />
      </a>

      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/login">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact">Contact Us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/settings">Settings</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
