import "./bookingslots_styles.css";

const BookingSlots = ({availableSlots}) => {

  return (
    
    <div className="availableslots">
      
      {availableSlots.map((time, idx) =>{
        return <div className="time" key={idx}>{time}</div>
      })}
    </div>
    
  )
}

export default BookingSlots;