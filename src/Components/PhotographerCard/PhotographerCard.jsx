
import { Link } from "react-router-dom"
import "./PhotographerCard.scss"

export const PhotographerCard = ({ cardData }) => {
    return (
        <div className="photographer-card">
            <div className="left-wrapper">
                <div className="grapher-img-container" >
                    <img src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-women-cartoon-avatar-in-flat-style-png-image_6110776.png" alt="" />
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
