import './reviewcard_styles.css';
import { FaStar } from "react-icons/fa";

const ReviewCard = ({review}) => {
    const {name, imageUrl, opinion, rating} = review;
    return(
      <div className="review-card">
         <div className='rating-stars'>
         {[...Array(5)].map((item, index) => {
                const givenRating = index + 1;
                return (
                  <FaStar key={index} color={
                    givenRating < rating || givenRating === rating
                        ? "#ee9972"
                        : "rgb(192,192,192)"
                }/>
                ) 
          })}
          </div>
          <div className='rating-client'>
            <img alt={name} src={imageUrl}/>
            <h3 className="card-title">{name}</h3>
          </div>
          
          <div className="review-content">
            <p>{opinion}</p>
          </div>
        
        
      </div>
      );
}

export default ReviewCard;