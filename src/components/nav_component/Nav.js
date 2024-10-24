import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import "./nav_styles.css";
import logo from "../../assets/logo.svg";

const Nav = () => {

  const handleClick = (anchor) => () => {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };


  return (
    <nav className="nav">
      <div className="logo-container" >
       <Link to="/"><img className="img-responsive" src={logo} alt="Little Lemon Logo"/></Link>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><HashLink to="/#about-section">About</HashLink></li>
        <li><a href="#">Menu</a></li>
        <li><Link to="/booking">Reservations</Link></li>
        <li><a href="#">Order online</a></li>
        <li><a href="#">Login</a></li>
      </ul>
    </nav>
  );
};
export default Nav;