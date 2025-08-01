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
    <footer className="container-fluid p-3">
      <div className="row mb-3 links-row p-4">
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

        <div className="col-md-3 mb-3">
          <h2>Products</h2>
          <div className="links">
            <p className="link d-block" onClick={() => handleLinkClick("/amazon/category/clothes")}>Clothes</p>
            <p className="link d-block" onClick={() => handleLinkClick("/amazon/category/electronics")}>Electronics</p>
            <p className="link d-block" onClick={() => handleLinkClick("/amazon/category/sports")}>Sports</p>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <h2>About Us</h2>
          <div className="links">
            <p className="link d-block" onClick={() => handleLinkClick("/amazon/about-us")}>Our Story</p>
            <p className="link d-block" onClick={() => handleLinkClick("/amazon/policies")}>Policies</p>
            <p className="link d-block" onClick={() => handleLinkClick("/amazon/careers")}>Careers</p>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <h2>Categories</h2>
          <div className="links">
            <p className="link d-block" onClick={() => handleLinkClick("/amazon/category/clothes/men")}>Men</p>
            <p className="link d-block" onClick={() => handleLinkClick("/amazon/category/clothes/women")}>Women</p>
            <p className="link d-block" onClick={() => handleLinkClick("/amazon/category/clothes/kids")}>Kids</p>
          </div>
        </div>
      </div>

      <div className="row p-4 align-items-center border-top border-1">
        <div className="col-md-9">
          <p className="text-dark mb-0">&copy; {currentYear} MeddyScripts. All Rights Reserved.</p>
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