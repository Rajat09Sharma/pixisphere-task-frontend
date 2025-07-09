
import { Link } from "react-router-dom";
import Testimonial from "../Testimonial/Testimonial"
import "./PhotographerProfile.scss"

export const PhotographerProfile = ({ data }) => {

    const styles = data.styles.reduce((accumulator, current) => {
        return accumulator + " , " + current;
    });
    const tags = data.tags.reduce((accumulator, current) => {
        return accumulator + " , " + current;
    });


    return (
        <div className="profile-container">
            <div className="heading">
                <h1>{data.name}</h1>
                <p>{data.location} , India</p>
            </div>
            <div className="about">
                <div className="profile-image-conatiner">
                    <img src={data.profilePic} alt={data.name} />
                </div>
                <div className="info">
                    <h2>About Us</h2>
                    <p>{data.bio}</p>
                    <p>Price : ₹{data.price}</p>
                    <p>Styles : {styles}</p>
                    <p>Tags : {tags}</p>
                </div>
            </div>
            <div className="projects">
                <h2>Projects</h2>
                <div className="pro-wrapper">
                    <div className="img-wrapper">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGqqcrjLaKQHzFI4YIRFl_ycdSUa0sl1N9mg&s" />
                    </div>
                    <div className="img-wrapper">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXqStQxRVfSYiONTiyLkdyLOYMCJvGryYNsw&s" />
                    </div>
                </div>
            </div>
            <Testimonial testimonials={[...data.reviews]} title={"Testimonials"} />
            <div className="btn">
                <Link to="/" className="back-btn">Go Back</Link>
            </div>
        </div>
    )
}
