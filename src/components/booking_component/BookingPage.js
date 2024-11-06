import React, {useReducer, useEffect} from "react";
import "./booking_styles.css";
import Banner from "../banner_component/Banner";
import BookingForm from "./BookingForm";
import { submitAPI } from "../../api";
import {substractDates} from "../../utils";

const timesReducer = (state, action) => {
  const {type, payload} = action;
  switch(type){
    case "UPDATE_AVAILABLE_TIMES":
      
      return {...state, availableTimes: payload.freeS, dailySlots: payload.totalS}

    case "UPDATE_SELECTED_DATE":
      
      return {...state, selectedDate: payload}
    
    default:
      return state;
  }
}

// currentBookingSlots: an array of seven days beginning today with all booking slots, free and taken
const BookingPage = ({currentBookingSlots, inAdvance, firstDate, topDispatch}) => {
    
    // the component´s state consists of:
  // dailySlots: an array of the booking slots for the selected day, free and taken
  // availableTimes: the booking slots that are free in the current daily slots
  // selectedDate: The date the user selects, the initial value is today
  
  const initialState= {dailySlots: [], availableTimes: [], selectedDate: ""};

  const [state, dispatch] = useReducer(timesReducer, initialState);

  const updateTimes = (selectedDay) => {
  // find the index of the selected day:
  let newIndex =  substractDates(selectedDay, firstDate);
  let data=currentBookingSlots[newIndex];
  const totalDailySlots=data.map(timeslot => {return {time:timeslot.time , booked: timeslot.booked}});
  const freeSlots=data.filter(slot =>  slot.booked === false).map(timeslot => timeslot.time);
  return {totalS: totalDailySlots, freeS: freeSlots};
  }

  // this effect runs only once: 
  useEffect(() => {
      dispatch({type: "UPDATE_SELECTED_DATE", payload: firstDate});
    }, []);

   // following effect updates the total daily slots and the available slots each time the date changes
   useEffect(() => {
    if (currentBookingSlots[0] && state.selectedDate!=="") {
    let newSlots=updateTimes(state.selectedDate);
    dispatch({type: "UPDATE_AVAILABLE_TIMES", payload: newSlots});}
    }, [state.selectedDate, currentBookingSlots]);
   
  return (
    <>
        <Banner/>
        <BookingForm 
        availableTimes={state.availableTimes}
        dailySlots= {state.dailySlots}
        dispatch={dispatch} 
        topDispatch={topDispatch}
        inAdvance={inAdvance}
        submitFunction={submitAPI}/>
    </>
  )
}

export default BookingPage;