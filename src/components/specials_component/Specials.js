import React from "react";
import "./specials_styles.css";
import ItemSlider from "../itemslider_component/ItemSlider.js";

const Specials = ({dishes}) => {
  return (
    <div className="specials">
        <h1 className="sub-title pl-55">Specials</h1>
        <ItemSlider dishes= {dishes}/>
    </div>
  )
}

export default Specials;
