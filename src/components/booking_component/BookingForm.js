import React, {useState, useEffect} from "react";
import { HashLink } from 'react-router-hash-link';
import "./bookingform_styles.css";
import BookingSlots from "./BookingSlots";
import ConfirmationPage from "./ConfirmationPage";
import StepTracker from "./StepTracker";
import { validateEmail, validateResDate, convertToDate, pad} from "../../utils";

const steps=["Details", "Confirm", "End"];

const FieldErrorMessage = ({message}) => {
  return (
    <p className="FieldError">{message}</p>
  );
};

const BookingForm = ({availableTimes, dailySlots, dispatch, topDispatch, inAdvance, submitFunction}) => {
    
  let minDate = new Date();
  let maxDate= new Date();
  maxDate.setDate(maxDate.getDate() + inAdvance-1);

  let strMinDate = minDate.getFullYear()+"-"+pad((minDate.getMonth()+1))+ "-" +pad(minDate.getDate());
  let strMaxDate = maxDate.getFullYear()+"-"+pad((maxDate.getMonth()+1))+ "-" +pad(maxDate.getDate());

  const [resDate, setResDate]=useState({value: strMinDate,isTouched: false });
  const [resTime, setResTime]=useState("");
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
  const [formData, setFormData]=useState({});
  const[formSubmitted, setFormSubmitted]=useState(false);

  useEffect(() => {
    if (formData.reservationDate) {
      let response=submitFunction(formData);
       if (response) {
        console.log("la respuesta fue true");
        topDispatch({type: "UPDATE_AVAILABLE_SLOTS", payload: formData});
        setFormSubmitted(true);
        console.log("Form submitted");
       console.log("los datos de la reserva son",formData);
      // resetForm();
       }
      setStepCounter((stepCounter) => stepCounter+1);
     }
    
  },[formData])

   const getIsFormValidStep1 = () => {
    return validateResDate(resDate.value, strMinDate, strMaxDate) && resTime;
  };

  const getIsFormValidStep2 = () => {
    return validateEmail(email.value) && firstName.value.trim().length>=2 
        && lastName.value.trim().length>=2 && phone.value.trim().length>=7 && isChecked;
  };

    /* const resetForm = () =>{
    form gets automatically reset when returning to homepage after confirm or cancel  
  } */

  const handleSubmit = (e) => {
    e.preventDefault();
        // here come the actions to enter the data into the reservation system database
      let newDay=convertToDate(resDate.value);
      setFormData({ ...formData,
      reservationDate: newDay,
      reservationTime: resTime,
      guestCount: guests,
      specialOccasion: occasion,
      seatingOption: seating,
      guestFirstName: firstName.value,
      guestLastName: lastName.value,
      guestEmail: email.value,
      guestPhone: phone.value,
      guestComment: comment,
      acceptTerms: isChecked
    });
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
    let newDay=convertToDate(e.target.value);
    
    setResDate({...resDate, value:e.target.value});
    dispatch({type: "UPDATE_SELECTED_DATE", payload: newDay});
    setResTime(availableTimes[0]);
  }; 

  return (
    <div className="form-container">
      <h3 className="text-center">Reserve a table</h3>
      <StepTracker stepCounter={stepCounter} steps={steps}/>
      <div className="bookingslots">
        {stepCounter<1 && 
        <><p>Available times: <span>(Reservations max. 7 days in advance)</span></p>
          <div ><span className="dot"></span>Not available</div>
        </>}
          {stepCounter<1 && validateResDate(resDate.value, strMinDate, strMaxDate) && dailySlots[0] 
          &&<BookingSlots dailySlots={dailySlots}/>}
      </div>
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
                {!validateResDate(resDate.value, strMinDate, strMaxDate)  && <FieldErrorMessage message="Select a valid date"/>}
              </div>
              <div className="Field">
                <label htmlFor="resTime">Choose time<sup>*</sup></label>
                <select 
                  id="resTime"
                  name="resTime"
                  value={resTime}
                  onChange={e => setResTime(e.target.value)}>
                    {resTime==="" && <option>Select time</option>}
                  {availableTimes.map((time, idx) =>{
                    return <option key={idx}>{time}</option>
                  })}
                </select>
                {(resTime==="Select time" || resTime==="")  && <FieldErrorMessage message="Select a valid time"/>}
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
            <div className="cancel-container">
            <HashLink to="/#top-of-page"><button className="btn-red cancel-btn" >Cancel</button></HashLink> 
            </div>
          </div>
          <div id="step-1" className={`form-step ${stepCounter=== 1 ? 'form-step-active' : ''}`}>
            <div className="Row">
              <div className="Field">
                <label htmlFor="firstname">First name <sup>*</sup></label>
                <input value={firstName.value} 
                  name="firstname"
                  id="firstname"
                  onChange={e =>setFirstName({...firstName, value: e.target.value.trimStart()})}
                  onBlur={ e => setFirstName({...firstName, isTouched: true})} 
                  placeholder="First name" />
                  {firstName.value.trim().length<2 && firstName.isTouched && <FieldErrorMessage message="This field is required"/>}
              </div>
              <div className="Field">
                <label htmlFor="lastname">Last name <sup>*</sup></label>
                <input value={lastName.value} 
                name="lastname"
                id="lastname"
                onChange={e => setLastName({...lastName , value: e.target.value.trimStart()})}
                onBlur={ e => setLastName({...lastName, isTouched: true})}
                placeholder="Last name" />
                {lastName.value.trim().length<2 && lastName.isTouched && <FieldErrorMessage message="This field is required"/>}
              </div>
            </div>
            <div className="Row">
              <div className="Field">
                <label htmlFor="email">Email address <sup>*</sup></label>
                <input value={email.value} 
                  name="email"
                  id="email"
                  onChange={e => setEmail({...email, value: e.target.value})} 
                  onBlur={ e => setEmail({...email, isTouched: true})}
                  placeholder="Email address" />
                  {!validateEmail(email.value) && email.isTouched && <FieldErrorMessage message="Please enter a valid email"/>}
              </div>
              <div className="Field">
                <label htmlFor="phone">Phone<sup>*</sup></label>
                <input type="tel" value={phone.value} 
                  name="phone"
                  id="phone"
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
              <div className="item-center"><button   className="primary-green w-100" aria-label="On Click" onClick={handlePrevious}>Previous</button></div>
              <div className="item-center"> <button className="primary-green w-100" aria-label="On Click" disabled={!getIsFormValidStep2()} onClick={handleSubmit}>Confirm</button></div>
            </div>
            <div className="cancel-container">
            <HashLink to="/#top-of-page"><button className="btn-red cancel-btn" >Cancel</button></HashLink> 
            </div>
          </div>
          <div id="step-2" className={`form-step ${stepCounter=== 2 ? 'form-step-active' : ''}`}>
            {formSubmitted ?  <ConfirmationPage formData={formData} /> : 
            <div className="failure">
              <p>Oops</p>
              <p>Something went wrong!</p>
              <p>Let's try again later</p><br/>
              <div className="btns-group">
              <div className="item-center"><button   className="primary-green w-100" aria-label="On Click" onClick={handlePrevious}>Previous</button></div>
              <HashLink to="/#top-of-page"><button className="btn-red  w-100" >Cancel</button></HashLink>
              </div>
            </div>}

          </div>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;