import { render, screen, fireEvent } from '@testing-library/react';



// import {expect} from '@testing-library/jest-dom'
// import App from './App';
// import '@testing-library/jest-dom';


// import BookingForm from './components/booking_component/BookingForm';
import BookingPage from './components/booking_component/BookingPage';
/* import Banner from "./components/banner_component/Banner";
import BookingForm from "./components/booking_component/BookingForm";
import {fetchBookingslots} from "./data/availableTimes.js";
 */


/* test('Renders the BookingForm heading', () => {
  const someFunction=jest.fn();
  const times=["17:00", "18:00"];
  render(<BookingForm availableTimes={times} dispatch={someFunction} inAdvance={7}/>)
    
    const headingElement = screen.getByText("Reserve a table");
    
    expect(headingElement).toBeInTheDocument();
}) */

test('to test de fetching of available times for the initialization', () => {
  
  

  render(<BookingPage/>)
    
  expect(screen.getByDisplayValue('17:00')).toBeInTheDocument();

  const selectedDate=screen.getByLabelText(/Choose date/);

  fireEvent.change(selectedDate, { target: {value: "2024-10-27"}})

  // const selectedTime = screen.getByRole('combobox', { name: /Choose time/ });

  const selectedTime = screen.getByLabelText(/Choose time/);

  expect(selectedTime).toHaveValue('17:00');


  // expect(screen.getByRole('option', { name: '21:00' }).selected).toBe(true);

  // expect(screen.getByDisplayValue('18:00')).not.toBeInTheDocument();


  
    
})
