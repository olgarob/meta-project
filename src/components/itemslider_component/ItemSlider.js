import React from "react";
import './itemslider_styles.css';
import Card from '../card_component/Card';

const ItemSlider = ({ dishes }) => {
  return (
    <div className="cards-container">
      <div className="cards">
        {dishes.map((dish) => {
          return ( 
            <Card key={dish.id} dish= {dish}/>
                )
        })}
      </div>
    </div>
  )
}

export default ItemSlider;