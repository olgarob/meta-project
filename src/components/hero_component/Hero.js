import React from "react";
import "./hero_styles.css";

const Hero = () => {
  return (
    <div className="hero-container">
    <section className="hero bicolor">
      <div className="descrip-txt">
        <h1>Little Lemon</h1>
        <h3>Chicago</h3>
        <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
        
        <div className="button-container"><button className="button-big primary-yellow"><a href="#">Reserve a table</a></button></div>
      </div>
      <div className="hero-image">
        <img className="img-responsive rounded-img" src={process.env.PUBLIC_URL + '/images/main.jpg'} alt="Little Lemon Food" />  
        </div>
    </section>
    </div>
  );
};
export default Hero;