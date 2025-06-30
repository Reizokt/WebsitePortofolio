import React from 'react';
import './Navbar.css';

function Nav() {
  return (
    <nav className="Navbar">
      <div className="navbar-logo">JOGI</div>
      <ul>
        <li><a href="#Home">Home</a></li>
        <li><a href="#about">About Me</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Nav;