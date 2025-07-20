import "../styles/about-us.css";
import logo from "../assets/amazon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailForward, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function AboutUs() {
    return (
        <div className="container-fluid aboutUs-container p-4">
            <div className="aboutInfo">
                <h2>About-Us</h2>
                <img src={logo} alt="Website Logo" className="website-logo" />
                <p className="fw-bold fs-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae porro quisquam odio, quas nostrum tempore laudantium
                    itaque quo harum veritatis assumenda dolor autem sit labore!
                </p>
                <div className="contact-info mt-5">
                    <h3>Contact Info</h3>
                    <div className="container-fluid d-flex">
                        <span className="me-3"><FontAwesomeIcon icon={faPhone} /></span>
                        <p className="fw-bold">0123456789</p>
                    </div>
                    <div className="container-fluid d-flex">
                        <span className="me-3"><FontAwesomeIcon icon={faMailForward} /></span>
                        <p className="fw-bold">compnay.contact@domain.com</p>
                    </div>
                    <Link className="btn btn-dark" to={"/amazon/polices"}>Polices</Link>
                </div>
            </div>
            <div className="location">
                <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7286615.899145397!2d30.8768375!3d26.906099949999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14368976c35c36e9%3A0x2c45a00925c4c444!2sEgypt!5e0!3m2!1sen!2seg!4v1753034388057!5m2!1sen!2seg" 
                width="600" height="450" className="border-0"
                allowfullscreen="" loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}

export default AboutUs