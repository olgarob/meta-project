import React from "react";
import { Link } from "react-router-dom";
import "./hero_styles.css";

const Hero = () => {
  return (
    <div className="container-fluid">
    <section className="hero bicolor">
      <div className="descrip-txt">
        <h1 className="yellow-txt">Little Lemon</h1>
        <h3 className="white-txt">Chicago</h3>
        <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
        
        <div className="button-container">
        <Link to="/booking"><button className="button-big primary-yellow">Reserve a table</button></Link>
        </div>
      </div>
      <div className="hero-image">
        <img className="img-responsive rounded-img" src={process.env.PUBLIC_URL + '/images/main.jpg'} alt="Little Lemon Food" />  
        </div>
    </section>
    </div>
  );
};
export default Hero;