import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";
import brandLogo from "../assets/amazon.png";
import { Link, useNavigate } from "react-router-dom";
import "../styles/footer.css";

const currentYear = new Date().getFullYear();

function Footer() {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="container-fluid p-5">
      <div className="row mb-3 links-row p-4">
        {/* Logo & Description */}
        <div className="col-md-3 mb-3">
          <img
            src={brandLogo}
            alt="Brand Logo"
            height={100}
            onClick={() => handleLinkClick("/amazon/")}
            style={{ cursor: "pointer" }}
          />
          <p className="text-dark">Empowering smart shopping with modern energy solutions.</p>
        </div>

        {/* Products */}
        <div className="col-md-3 mb-3">
          <h2>Products</h2>
          <div className="links">
            <p className="link d-block" onClick={() => handleLinkClick("/amazon/categories/clothes")}>Clothes</p>
            <p className="link d-block" onClick={() => handleLinkClick("/amazon/categories/electronics")}>Electronics</p>
            <p className="link d-block" onClick={() => handleLinkClick("/amazon/categories/sports")}>Sports</p>
          </div>
        </div>

        {/* About Us */}
        <div className="col-md-3 mb-3">
          <h2>About Us</h2>
          <div className="links">
            <p className="link d-block" onClick={() => handleLinkClick("/amazon/about")}>Our Story</p>
            <p className="link d-block" onClick={() => handleLinkClick("/amazon/polices")}>Policies</p>
            <p className="link d-block" onClick={() => handleLinkClick("/amazon/careers")}>Careers</p>
          </div>
        </div>

        {/* Locations */}
        <div className="col-md-3 mb-3">
          <h2>Locations</h2>
          <div className="links">
            <p className="link d-block" onClick={() => handleLinkClick("/amazon/locations/egypt")}>Egypt</p>
            <p className="link d-block" onClick={() => handleLinkClick("/amazon/locations/uae")}>UAE</p>
            <p className="link d-block" onClick={() => handleLinkClick("/amazon/locations/usa")}>USA</p>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="row p-4 align-items-center border-top border-1">
        <div className="col-md-9">
          <p className="text-dark mb-0">&copy; {currentYear} XOperations. All Rights Reserved.</p>
        </div>
        <div className="col-md-3 text-end">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="me-3">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="me-3">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="me-3">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faTiktok} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;