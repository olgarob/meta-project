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
      console.log("the payload is for total slots", payload)
      return {...state, currentBookingSlots: payload}

    case "UPDATE_AVAILABLE_SLOTS" :
      let newSlots = updateBookingSlots(state, payload);
      console.log("the new slots are", newSlots);
      return {...state, currentBookingSlots: newSlots }
    default:
      return state;
  }
}

const updateBookingSlots = (state, reservation) => {
  console.log("el dia escogido es", reservation.reservationDate);
  console.log("el dia de referencia es", firstDate);
  let newIndex =  substractDates(reservation.reservationDate, firstDate);
  console.log("el indice es", newIndex);
  let data= state.currentBookingSlots[newIndex];
  let k=data.findIndex((day)=> day.time===reservation.reservationTime);
  console.log("el segundo indice es", k);
  console.log(reservation.reservationTime);
  let newSlots= state.currentBookingSlots;
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