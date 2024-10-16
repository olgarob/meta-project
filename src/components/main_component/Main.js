import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./main_styles.css";
import HomePage from "../homepage_component/HomePage";
import BookingPage from "../booking_component/BookingPage";

const Main = () => {
  return (
    <main className="grid-container">
      <Routes> 
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/booking" element={<BookingPage />}></Route>
      </Routes>
    </main>
  );
};
export default Main;