import React from "react";
import "./homepage_styles.css";
import Hero from "../hero_component/Hero";
import Specials from "../specials_component/Specials";
import Testimonials from "../testimonials_component/Testimonials";
import About from "../about_component/About";
import {dishes} from '../../data/dishes.js';
import {reviews} from '../../data/reviews.js';

const HomePage = () => {
  return (
    <>
      <Hero/>
      <Specials dishes={dishes}/>
      <Testimonials reviews = {reviews}/>
      <About/>
    </>
  );
};
export default HomePage;