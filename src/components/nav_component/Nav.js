import React from "react";
import "./nav_styles.css";
import logo from "../../assets/logo.svg";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="logo-container" >
        <img className="img-responsive" src={logo} alt="Little Lemon Logo"/>
      </div>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Menu</a></li>
        <li><a href="#">Reservations</a></li>
        <li><a href="#">Order online</a></li>
        <li><a href="#">Login</a></li>
      </ul>
    </nav>
  );
};
export default Nav;