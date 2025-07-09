
import { Link } from "react-router-dom"
import "./PhotographerCard.scss"

export const PhotographerCard = ({ cardData }) => {
    return (
        <div className="photographer-card">
            <div className="left-wrapper">
                <div className="grapher-img-container" >
                    <img src={cardData.profilePic} alt={cardData.name} />
                </div>
                <h2>{cardData.name}</h2>
            </div>
            <div className="right-wrapper">
                <div className="info">
                    <p>Price : ₹{cardData.price}</p>
                    <p>Style : {cardData.styles}</p>
                    <p>Location : {cardData.location}</p>
                    <p>Rating : {cardData.rating}</p>
                </div>
                <div className="btn-container">
                    <Link to={`photographer/${cardData.id}`} className="btn">View Profile</Link>
                </div>
            </div>
        </div>
    )
}
