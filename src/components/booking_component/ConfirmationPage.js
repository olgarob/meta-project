import { Link } from "react-router-dom";
import { convertToDate} from "../../utils";

const ConfirmationPage = ({formData}) => {

  console.log("llegaron", formData);
  return (
  <>
    <div className="summary">
      <h4>Reservation Data:</h4>
      <p>
        <strong>Date:</strong> {convertToDate(formData.reservationDate).toDateString()} <br/>
        <strong>Time:</strong> {formData.reservationTime}<br/>
        <strong>Number of guest:</strong> {formData.guestCount}<br/>
        <strong>Ocassion:</strong> {formData.specialOccasion}<br/>
        <strong>Seating:</strong> {formData.seatingOption}<br/>
        <strong>Request:</strong> {formData.guestComment}
      </p><br/>
      <h4>Reservation confirmed!</h4><br/>
    </div>
   <div>
      <p><strong>Dear {formData.guestFirstName}</strong>,<br/><br/>
      Thank you for reserving a table at Little Lemon!<br/>
      You will receive your reservation confirmation by email.</p><br/>
      <p><strong>Remember:</strong><br/>
      Your table will be kept free for max. 30 minutes after reservation time.</p><br/>
    </div>
    <div className="button-container item-center">
      <Link to="/"><button className="primary-green" >Back to Homepage</button></Link>
    </div>
</>
  )
}

export default ConfirmationPage;