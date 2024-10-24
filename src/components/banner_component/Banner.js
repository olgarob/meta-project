import React from "react";
import "./banner_styles.css";

const Banner = () => {
  return (
    <div className="container-fluid">
    <section className="banner">
      <div className="descrip-txt">
        <h1 className="yellow-txt">Little Lemon</h1>
        <h3>Chicago</h3>
        <h4>Find a table for any occasion</h4>
      </div>
      <div className="banner-image">
        <img className="img-responsive " src={process.env.PUBLIC_URL + '/images/restaurant_and_chef.jpg'} alt="Little Lemon Tables" />   
      </div>
      
      
    </section>
    </div>
  );
};
export default Banner;