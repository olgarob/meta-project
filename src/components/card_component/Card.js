import './card_styles.css';

const Card = ({dish}) => {
    const {name, imageUrl, description, preis} = dish;
    return(
      <div className="card">
        <img alt={name} src={imageUrl}/>
        <div className="card-title">
          <div className='dish-name'>{name}</div>
          <div className='dish-price'>${preis.toFixed(2)}</div>
        </div>
        <div className="card-content">
          <p>{description}</p>
        </div>
        
        <div className="card-link-wrapper">
          <div className="button-container">
            <button className="button-small primary-green"><a href="#">Order online</a></button>
          </div>
          <div className='card-icon'> 
              <img className="image-icon" alt="bicicle" src={process.env.PUBLIC_URL + '/images/bicicle.jpg'}/>
          </div>
        </div>
      </div>
      );
}

export default Card;