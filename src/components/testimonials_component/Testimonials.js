import React from "react";
import "./testimonials_styles.css";
import ReviewCard from "./ReviewCard";

const Testimonials = ({reviews}) => {
  // define animation speed and width of slider-track depending on quantity of reviews
  
  const size=reviews.length;
  const speed=8*size;
  const trackWidth=300*size*2;
  const scrollWidth=300*size;
// es necesario crear el estilo del keyframe, dependiendo de la cantidad de reviews
  const createdStyleTag = document.createElement("style");
  createdStyleTag.textContent = `@keyframes scroll{0% { transform: translateX(0); } 100% { transform: translateX(-${scrollWidth}px)}}`;
  document.body.appendChild(createdStyleTag);

  // to achieve continuos scrolling it is necesssary to duplicate the array of reviews
  // const newReviews = reviews.concat(reviews);
  const newReviews = [...reviews, ...reviews]
  
  const trackStyle = {
    animation: `scroll ${speed}s linear infinite`,
    width: `${trackWidth}px`,
  };
  
  return (
    <div className="testimonials">
        <h1 className="sub-title">Testimonials</h1>
        <div className="slider">
	<div className="slide-track" style={trackStyle}>
    {newReviews.map((review,index) => {
          return ( 
            
              <ReviewCard key={index} review= {review}/>
              
            
                )
        })}

		
		
	</div>
</div>
    </div>
  )
}

export default Testimonials;