import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import "./footer_styles.css";
import logo from "../../assets/logo_neg.png";
const Footer = () => {
  return (
    <footer>
      <div>
        <div className="logo-container">
          <img className="img-responsive" src={logo}></img>
        </div>
        <div><p>Copiright 2024 Little Lemon</p></div>
      </div>
      
      <div>
        <ul>
          <li><a href="#">Terms and conditions</a></li>
          <li><a href="#">Locations</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div>
      <ul>
        <li> <Link to="/">Home</Link></li>
        <li><HashLink to="/#about-section">About</HashLink></li>
        <li><a href="#">Menu</a></li>
        <li><Link to="/booking">Reservations</Link></li>
        <li><a href="#">Order online</a></li>
        <li><a href="#">Login</a></li>
      </ul>
      </div>
      
    </footer>
  );
};
export default Footer;