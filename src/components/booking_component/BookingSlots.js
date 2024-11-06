import "./bookingslots_styles.css";

const BookingSlots = ({dailySlots}) => {

  return (
    
    <div className="availableslots">
      
      {dailySlots.map((slot, idx) =>{
        return <div
        className={`time ${slot.booked ? 'not-available' : ''}`}
        key={idx}>{slot.time}</div>
      })}
    </div>
    
  )
}

export default BookingSlots;