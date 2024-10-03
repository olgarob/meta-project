import React from "react";
import logo from "../assets/logo.svg";
const Footer = () => {
  return (
    <footer>
      <img src={logo}></img>
      <p>this is the footer</p>
      <ul>
        <li>About</li>
        <li>Menu</li>
        <li>Reservations</li>
        <li>Order online</li>
        <li>Login</li>
      </ul>
    </footer>
  );
};
export default Footer;