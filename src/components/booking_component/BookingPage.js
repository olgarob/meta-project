import React, {useReducer, useEffect} from "react";
import "./booking_styles.css";
import Banner from "../banner_component/Banner";
import BookingForm from "./BookingForm";
import { fetchAPI, submitAPI } from "../../api";
// import {fetchBookingslots} from "../../data/availableTimes.js";

let inAdvance=7;  // this can be set by the owner of the restaurant

// this was used in the second prototype with the mockdata
// fetch bookingslots for 7 days (mockdata)
// let currentBookingslots= fetchBookingslots(inAdvance);  

/* const updateTimes = (selectedDay) => {
  let data=currentBookingslots[selectedDay];
  const freeSlots=data.filter(slot =>  slot.booked === false).map(timeslot => timeslot.time);
  return freeSlots;
  } */
 //

  const updateTimes = (selectedDay) => {
    let freeSlots=fetchAPI(selectedDay);
    return freeSlots;
    }

  const timesReducer = (state, action) => {
    const {type, payload} = action;
    switch(type){
      case "UPDATE_AVAILABLE_TIMES":
        let newSlots=updateTimes(payload);
        
        return {...state, availableTimes: newSlots}
      case "UPDATE_SELECTED_DATE":
        
        return {...state, selectedDate: payload}
      default:
        return state;
    }
  }


const BookingPage = () => {
  
  // this was used in the second prototype with the mockdata
  // const initialState= {availableTimes: updateTimes(0)};
  //
  let firstDate= new Date();
  console.log(firstDate);
  const initialState= {availableTimes: [], selectedDate: firstDate};

  const [state, dispatch] = useReducer(timesReducer, initialState);

   useEffect(() => {
    dispatch({type: "UPDATE_AVAILABLE_TIMES", payload: state.selectedDate});
    }, [state.selectedDate]);
   
  return (
    <>
        <Banner/>
        <BookingForm 
        availableTimes={state.availableTimes} 
        dispatch={dispatch} 
        inAdvance={inAdvance}
        submitFunction={submitAPI}/>
    </>
  )
}

export default BookingPage;