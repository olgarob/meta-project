import React from "react";
import logo from "../assets/logo.svg";

const Nav = () => {
  return (
    <nav>
      <img src={logo} alt=""></img>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Menu</li>
        <li>Reservations</li>
        <li>Order online</li>
        <li>Login</li>
      </ul>
      </nav>
  );
};
export default Nav;