import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/features.css";
import { faBox, faGlobe, faPercent, faTruck, faWifi } from "@fortawesome/free-solid-svg-icons";

function Features() {
  const features = [
    { icon: faTruck, title: "Fast Delivery" },
    { icon: faGlobe, title: "Worldwide Brand" },
    { icon: faBox, title: "Secured Package" },
    { icon: faWifi, title: "Internet Support" },
    { icon: faPercent, title: "Best Sales" },
  ];

  return (
    <div className="features-carousel-wrapper p-5">
      <div className="features-carousel">
        {features.map((item, idx) => (
          <div className="feature-card" key={idx}>
            <span className="d-block icon-wrap">
              <FontAwesomeIcon icon={item.icon} size="2x" />
            </span>
            <h3>{item.title}</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;