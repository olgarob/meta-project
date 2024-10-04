import React from "react";
import "./header_styles.css";

const Header = () => {
  return (
    <header className="header bicolor">
      <div className="descrip-txt item-1">
        <h1>Little Lemon</h1>
        <h3>Chicago</h3>
        <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
        <div className="separator"></div>
        
        <div className="button-container"><button className="primary-yellow"> Reserve a table</button></div>
       
        
        


      </div>
      <div className="hero-image item-2">
      <img className="img-responsive rounded-img" src={process.env.PUBLIC_URL + '/images/main.jpg'} alt="Little Lemon Food Picture" />  
      
        
        </div>
    </header>
  );
};
export default Header;