import React, {useReducer} from "react";
import "./booking_styles.css";
import Banner from "../banner_component/Banner";
import BookingForm from "./BookingForm";
import {fetchBookingslots} from "../../data/availableTimes.js";

let inAdvance=7;  // this can be set by the owner of the restaurant
let currentBookingslots= fetchBookingslots(inAdvance);  // fetch bookingslots for 7 days (mockdata)

const updateTimes = (selectedDay) => {
  let data=currentBookingslots[selectedDay];
  const freeSlots=data.filter(slot =>  slot.booked === false).map(timeslot => timeslot.time);
  return freeSlots;
  }

  const timesReducer = (state, action) => {
    const {type, payload} = action;
    switch(type){
      case "UPDATE_AVAILABLE_TIMES":
        let newSlots=updateTimes(payload);
        return {...state, availableTimes: newSlots}
      default:
        return state;
    }
  }


const BookingPage = () => {

  const initialState= {availableTimes: updateTimes(0)};
  const [state, dispatch] = useReducer(timesReducer, initialState);
   
  return (
    <>
        <Banner/>
        <BookingForm availableTimes={state.availableTimes} dispatch={dispatch} inAdvance={inAdvance}/>
    </>
  )
}

export default BookingPage;