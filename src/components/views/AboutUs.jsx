import "../styles/about-us.css";
import logo from "../assets/amazon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailForward, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function AboutUs() {
    return (
        <div className="container-fluid aboutUs-container p-4">
            <div className="row g-0 position-relative">
                <div class="col-md-6 mb-md-0 p-md-4">
                    <img src={logo} alt="Website Logo" width={100} className="website-logo" />
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7286615.899145397!2d30.8768375!3d26.906099949999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14368976c35c36e9%3A0x2c45a00925c4c444!2sEgypt!5e0!3m2!1sen!2seg!4v1753034388057!5m2!1sen!2seg"
                        width="600" height="450" className="border-0"
                        allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div class="col-md-6 p-4 ps-md-0">
                    <h3 class="mt-0">About Us</h3>
                    <p className="fw-bold fs-5 mb-3">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                        Quas optio deserunt nam ut iure asperiores enim nihil aperiam 
                        ab dolores in a, nostrum neque ipsum blanditiis earum! Voluptates, 
                        sapiente dolorum.

                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Iste error vel at? Qui soluta commodi placeat pariatur nulla 
                        nam possimus?
                    </p>
                    <div className="conatiner-fluid contact-info border-top border-dark">
                        <h3 className="mt-3">Contact Info</h3>
                        <div className="container-fluid d-flex">
                            <span className="me-3"><FontAwesomeIcon icon={faPhone} /></span>
                            <p className="fw-bold">0123456789</p>
                        </div>
                        <div className="container-fluid d-flex">
                            <span className="me-3"><FontAwesomeIcon icon={faMailForward} /></span>
                            <p className="fw-bold">compnay.contact@domain.com</p>
                        </div>
                    </div>
                    <Link className="btn btn-dark" to={"/amazon/policies"}>Policies</Link>
                </div>
            </div>
        </div>
    )
}

export default AboutUs