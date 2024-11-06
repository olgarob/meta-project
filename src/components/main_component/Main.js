import React, {useReducer, useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./main_styles.css";
import HomePage from "../homepage_component/HomePage";
import BookingPage from "../booking_component/BookingPage";
import {substractDates} from "../../utils";


let inAdvance=7;  // this can be set by the owner of the restaurant - max days for booking
let firstDate= new Date();  // firs available day for booking is today

const slotsReducer = (state, action) => {
  const {type, payload} = action;
  switch(type){
    case "LOAD_MOCKDATA" :
      return {...state, currentBookingSlots: payload}

    case "UPDATE_AVAILABLE_SLOTS" :
      let newSlots = updateBookingSlots(state.currentBookingSlots, payload);
      return {...state, currentBookingSlots: newSlots }

    default:
      return state;
  }
}

const updateBookingSlots = (currentSlots, reservation) => {
  
  let newIndex =  substractDates(reservation.reservationDate, firstDate);
  let data= currentSlots[newIndex];
  let k=data.findIndex((day)=> day.time===reservation.reservationTime);
  let newSlots= currentSlots;
  let newBooking={
      time: reservation.reservationTime, 
      booked: true, 
      customerFirstName: reservation.guestFirstName,
      customerLastName: reservation.guestLastName, 
      guests: reservation.guestCount };
  newSlots[newIndex][k]=newBooking;
  return newSlots;
};

const Main = () => {

  const initialState= {currentBookingSlots:[]};

  const [state, dispatch] = useReducer(slotsReducer, initialState);

  // fetch bookingslots for 7 days (mockdata) and put them in an array of arrays of objects
   // this effect runs only once: 
   useEffect(() => {
    fetch('/mockdata/slots.json')
    .then((response) => response.json())
    .then((data) =>  {
      dispatch({type: "LOAD_MOCKDATA", payload: data});
      });
    }, []);

  return (
    <main className="grid-container">
      <Routes> 
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/booking" element={<BookingPage 
          currentBookingSlots={state.currentBookingSlots} 
          inAdvance={inAdvance} firstDate={firstDate} topDispatch={dispatch}/>}></Route>
      </Routes>
    </main>
  );
};
export default Main;