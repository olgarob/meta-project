import React from "react";
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
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Menu</a></li>
        <li><a href="#">Reservations</a></li>
        <li><a href="#">Order online</a></li>
        <li><a href="#">Login</a></li>
      </ul>
      </div>
      
    </footer>
  );
};
export default Footer;