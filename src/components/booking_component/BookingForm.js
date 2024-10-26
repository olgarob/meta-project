import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./bookingform_styles.css";

import StepTracker from "./StepTracker";
import { validateEmail, validateResDate, convertToDate, substractDates} from "../../utils";

const steps=["Details", "Confirm", "End"];

const FieldErrorMessage = ({message}) => {
  return (
    <p className="FieldError">{message}</p>
  );
};

const BookingForm = ({availableTimes, dispatch, inAdvance}) => {

  let minDate = new Date();
  let maxDate= new Date();
  maxDate.setDate(maxDate.getDate() + inAdvance-1);
   
  let strMinDate = minDate.getFullYear()+"-"+(minDate.getMonth()+1)+ "-" +minDate.getDate();
  let strMaxDate = maxDate.getFullYear()+"-"+(maxDate.getMonth()+1)+ "-" +maxDate.getDate();
      
  const [resDate, setResDate]=useState({value: strMinDate,isTouched: false });
  const [resTime, setResTime]=useState(availableTimes[0]);
  const [guests, setGuests]=useState(1);
  const [occasion, setOccasion]=useState("None");
  const [seating, setSeating]=useState("Standard");
  const [firstName, setFirstName] = useState({value: "", isTouched: false});
  const [lastName, setLastName] = useState({value: "", isTouched: false});
  const [email, setEmail] = useState({value: "", isTouched: false});
  const [phone, setPhone] = useState({value: "", isTouched: false});
  const [comment, setComment] = useState("");
  const [isChecked, setIsChecked] = useState(true);
   
  const [stepCounter, setStepCounter]=useState(0);

   const getIsFormValidStep1 = () => {
    return validateResDate(resDate.value, strMinDate, strMaxDate);
  };

  const getIsFormValidStep2 = () => {
    return validateEmail(email.value) && firstName.value.trim().length>=2 
        && lastName.value.trim().length>=2 && phone.value.trim().length>=7 && isChecked;
  };

    /* const resetForm = () =>{
    
  } */

  const handleSubmit = (e) => {
    e.preventDefault();
    setStepCounter((stepCounter) => stepCounter+1);
    // here come the actions to enter the data into the reservation system database
    console.log("Form submitted");
    // resetForm();
  }

  const handleNext = (e) => {
    e.preventDefault();
    setStepCounter((stepCounter) => stepCounter+1);
  }

  const handlePrevious = (e) => {
    e.preventDefault();
    setStepCounter((stepCounter) => stepCounter-1);
  }

  function changeDate (e) {
    let newDay=substractDates(e.target.value,strMinDate);
    setResDate({...resDate, value:e.target.value});
    dispatch({type: "UPDATE_AVAILABLE_TIMES", payload: newDay});
  }; 

  return (
    <div className="form-container">
     <h3 className="text-center">Reserve a table</h3>
     <StepTracker stepCounter={stepCounter} steps={steps}/>
      <form>
        <div className="fieldset">
         {stepCounter<2 && <span>* Required</span>}
          {/* bookingsteps - it is a 3 step form*/}
          <div id="step-0" className={`form-step ${stepCounter=== 0 ? 'form-step-active' : ''}`}>
            <div className="Row">
              <div className="Field">
                <label htmlFor="resDate">Choose date<sup>*</sup></label>
                <input 
                  size="50"
                  type="date" 
                  id="resDate"
                  name="resdate"
                  value={resDate.value} 
                  min={strMinDate}
                  max={strMaxDate}
                  onChange={changeDate}
                  onBlur={ e => setResDate({...resDate, isTouched: true})} 
                />
                {!validateResDate(resDate.value, strMinDate, strMaxDate) && resDate.isTouched && <FieldErrorMessage message="Select a valid date"/>}
              </div>
              <div className="Field">
                <label htmlFor="resTime">Choose time<sup>*</sup></label>
                <select 
                  id="resTime"
                  name="resTime"
                  value={resTime}
                  onChange={e => setResTime(e.target.value)}>
                  {availableTimes.map((time, idx) =>{
                    return <option key={idx}>{time}</option>
                  })}
                </select>
              </div>
            </div>
            <div className="Row">
              <div className="Field">
                <label htmlFor="guests">Number of guests<sup>*</sup></label>
                <input 
                  type="number" 
                  placeholder="1" min="1" 
                  max="10" 
                  id="guests"
                  name="guests"
                  value={guests}
                  onChange={e => setGuests(e.target.value)}
                />
              </div>
            </div>
            <div className="Row">
              <h5>Preferences:</h5>
            </div>
            <div className="Row">
              <div className="Field">
                <div className="RadioGroup">
                <p>Seating options</p>
                <label htmlFor="standard">
                  <input type="radio" name="sitting" value="Standard" id="standard" onChange={e => setSeating(e.target.value)}/>
                    Standard
                </label><br/>
                <label htmlFor="outside">
                  <input type="radio" name="sitting" value="Outside" id="outside" onChange={e => setSeating(e.target.value)}/>
                    Outside
                  </label>
                  </div>
              </div>
              <div className="Field">
                <label htmlFor="occasion">Occasion</label>
                <select 
                  id="occasion"
                  name="occasion"
                  value={occasion}
                  onChange={e => setOccasion(e.target.value)}>
                    <option>None</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                </select>
              </div>
            </div>
            <div className="button-container item-center">
            <button className="primary-green" disabled={!getIsFormValidStep1()} onClick={handleNext}> Make Your reservation</button>
            </div>
          </div>
          <div id="step-1" className={`form-step ${stepCounter=== 1 ? 'form-step-active' : ''}`}>
            <div className="Row">
              <div className="Field">
                <label>First name <sup>*</sup></label>
                <input value={firstName.value} 
                  onChange={e =>setFirstName({...firstName, value: e.target.value.trimStart()})}
                  onBlur={ e => setFirstName({...firstName, isTouched: true})} 
                  placeholder="First name" />
                  {firstName.value.trim().length<2 && firstName.isTouched && <FieldErrorMessage message="This field is required"/>}
              </div>
              <div className="Field">
                <label>Last name <sup>*</sup></label>
                <input value={lastName.value} 
                onChange={e => setLastName({...lastName , value: e.target.value.trimStart()})}
                onBlur={ e => setLastName({...lastName, isTouched: true})}
                placeholder="Last name" />
                {lastName.value.trim().length<2 && lastName.isTouched && <FieldErrorMessage message="This field is required"/>}
              </div>
            </div>
            <div className="Row">
              <div className="Field">
                <label>Email address <sup>*</sup></label>
                <input value={email.value} 
                  onChange={e => setEmail({...email, value: e.target.value})} 
                  onBlur={ e => setEmail({...email, isTouched: true})}
                  placeholder="Email address" />
                  {!validateEmail(email.value) && email.isTouched && <FieldErrorMessage message="Please enter a valid email"/>}
              </div>
              <div className="Field">
                <label>Phone<sup>*</sup></label>
                <input type="tel" value={phone.value} 
                  onChange={e => setPhone({...phone, value: e.target.value})}
                  onBlur={ e => setPhone({...phone, isTouched: true})}
                  placeholder="Phone" />
                  {phone.value.trim().length<7 && phone.isTouched && <FieldErrorMessage message="Please enter a valid phone"/>}
              </div>
            </div>
              <div className="Field">
                <label htmlFor="comment">Add a special request</label>
                <textarea
                  id="comment"
                  placeholder="If you have a special request please let us know"
                  name="comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </div>
              <div className="checkbox-container">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    name="terms" 
                    value="Yes"
                    checked={isChecked}
                    onChange={e => setIsChecked(e.target.checked)}/>
                  <label htmlFor="terms"> I accept terms and conditions<sup>*</sup></label>
              </div>
              <div className="summary">
                <h4>Reservation Data:</h4>
                <p>Date: {convertToDate(resDate.value).toDateString()} <br/>
                  Time: {resTime}<br/>
                  Number of guest: {guests}<br/>
                  Ocassion: {occasion}<br/>
                  Seating: {seating}
                </p><br/>
             </div>
            <div className="btns-group">
              <div className="item-center"><button   className="primary-green w-100" onClick={handlePrevious}>Previous</button></div>
              <div className="item-center"> <button className="primary-green w-100" disabled={!getIsFormValidStep2()} onClick={handleSubmit}>Confirm</button></div>
            </div>
          </div>
          <div id="step-2" className={`form-step ${stepCounter=== 2 ? 'form-step-active' : ''}`}>
            <div className="summary">
                <h4>Reservation Data:</h4>
                <p>Date: {convertToDate(resDate.value).toDateString()} <br/>
                  Time: {resTime}<br/>
                  Number of guest: {guests}<br/>
                  Ocassion: {occasion}<br/>
                  Seating: {seating}<br/>
                  Request: {comment}
                </p><br/>
                <h4>Reservation confirmed!</h4><br/>
            </div>
            <div>
                <p><strong>Dear {firstName.value}</strong>,<br/><br/>
                Thank you for reserving a table at Little Lemon!<br/>
                You will receive your reservation confirmation by email.</p><br/>
                <p><strong>Remember:</strong><br/>
                Your table will be kept free for max. 30 minutes after reservation time.</p><br/>
            </div>
            <div className="button-container item-center">
              <Link to="/"><button className="primary-green" >Back to Homepage</button></Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;