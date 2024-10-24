import React from "react";
import "./about_styles.css";

const About = () => {
  return (
    <div className="about" id="about-section">
    <section className="about-container">
      <div className="descrip-txt">
        <h1>Little Lemon</h1>
        <h3>Chicago</h3>
        <p>Little Lemon opened on Thanksgiving Day 1990 and has become one of the favorite restaurants of Chicago. Chefs and owners Mario and Adrian love cooking traditional Mediterranean recipes. Their unique taste comes from family recipes and from fresh, simple and tasteful ingredients straight from home.</p>
        <p>Little Lemon combines the traditional with the contemporary, bringing fantastic cooking, house made pasta, and a variety of Italian wine to the heart of Chicago.</p>
      </div>
      <div className="hero-image">
        <img className="img-responsive rounded-img" src={process.env.PUBLIC_URL + '/images/mario_and_adrian.jpg'} alt="Little Lemon Food" />  
        </div>
    </section>
    </div>
  )
}

export default About;