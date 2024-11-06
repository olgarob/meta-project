// important note for the test:
// An error occurs due to the fact that Router uses Context:
//TypeError: Cannot destructure property 'basename' of 'React__namespace.useContext(...)' as it is null.
// the error can be bypassed commenting temporarily all Links and Hushlinks in the component
// or using the MemoryRouter for testing
import {MemoryRouter} from 'react-router-dom';

import { render, screen, fireEvent } from '@testing-library/react';

//import BookingForm from './components/booking_component/BookingForm';
import BookingPage from './components/booking_component/BookingPage'; 
// import Main from './components/main_component/Main.js'
import {fetchBookingslots} from "./data/availableTimes.js";
import {pad} from "./utils.js";

test ('Renders Bookinpage heading', () =>{

  const someFunction=jest.fn();
  const currentBookingSlots=fetchBookingslots();
  let inAdvance=7;
  let firstDate= new Date();
 
  render ( <MemoryRouter>
          <BookingPage currentBookingSlots={currentBookingSlots} 
          inAdvance={inAdvance} firstDate={firstDate} topDispatch={someFunction}/></MemoryRouter>)

    const headingElement = screen.getByText("Reserve a table");

    expect(headingElement).toBeInTheDocument();
})


test ('to test de fetching of available times', () =>{

  const someFunction=jest.fn();
  const currentBookingSlots=fetchBookingslots();
  let inAdvance=7;
  let firstDate= new Date();
  let nextDate= new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  let chosenDate = nextDate.getFullYear()+"-"+pad((nextDate.getMonth()+1))+ "-" +pad(nextDate.getDate());

  render ( <MemoryRouter>
          <BookingPage currentBookingSlots={currentBookingSlots} 
          inAdvance={inAdvance} firstDate={firstDate} topDispatch={someFunction}/></MemoryRouter>)

    const selectedDate=screen.getByLabelText(/Choose date/);
    fireEvent.change(selectedDate, { target: {value: chosenDate}})
    const selectedTime = screen.getByLabelText(/Choose time/);
    expect(selectedTime).toHaveValue('19:00');

})


test ('to test confirm button is desabled if no firstName, etc is present', () =>{

  const someFunction=jest.fn();
  const currentBookingSlots=fetchBookingslots();
  let inAdvance=7;
  let firstDate= new Date();
  let nextDate= new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  let chosenDate = nextDate.getFullYear()+"-"+pad((nextDate.getMonth()+1))+ "-" +pad(nextDate.getDate());

  render ( <MemoryRouter>
          <BookingPage currentBookingSlots={currentBookingSlots} 
          inAdvance={inAdvance} firstDate={firstDate} topDispatch={someFunction}/></MemoryRouter>)

    const selectedDate=screen.getByLabelText(/Choose date/);
    fireEvent.change(selectedDate, { target: {value: chosenDate}})

    const firstNameField=screen.getByLabelText(/First name/);
    expect(firstNameField).toBeInTheDocument();
    expect(firstNameField).not.toBeVisible;

    // go to the step 2 of the formular

    const submitButton = screen.getByText("Make Your reservation");
    fireEvent.click(submitButton);

    expect(firstNameField).toBeVisible;

    expect(screen.getByText("Confirm")).toBeDisabled();
})

// all above tests were run and passed succesfuly