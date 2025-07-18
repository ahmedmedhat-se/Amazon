import { Link } from "react-router-dom";
import "../styles/header.css";
import kidsImage from "../assets/kids.png";
import Products from "../store/pages/Products.jsx";

function Homepage() {
  return (
    <>
      <div className="container-fluid p-5">
        <header className="p-5">
          <div className="header-content">
            <h2>Let's Explore <span>New</span> Clothes!</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Dolores officia aliquid rem natus repellendus 
              maiores minima tempora facere itaque a!
            </p>
            <Link className="btn btn-dark" to={""}>Explore</Link>
          </div>
          <div className="header-image">
            <img src={kidsImage}/>
          </div>
        </header>
      </div>
      <Products />
    </>
  )
}

export default Homepage;