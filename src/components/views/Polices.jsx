import { Link } from "react-router-dom";
import "../styles/polices.css";

function Polices() {
  return (
    <>
      <div className="container-fluid p-5">
        <article className="p-5">
          <div className="article-content">
            <h2>Company's Polices</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Alias eos harum debitis assumenda.
              Delectus pariatur perspiciatis eos nulla veritatis. Earum, aliquam.
              Necessitatibus nostrum veritatis,
              odit nulla incidunt aspernatur libero fugit.
              Excepturi reiciendis ipsam perspiciatis, adipisci repellendus hic,
              facere consequuntur libero quia dicta expedita,
              quasi modi vero quis qui vitae ipsa.</p>
            <Link className="btn btn-dark" to={"/ecommerce-website/"}>Home</Link>
          </div>
        </article>
      </div>
    </>
  )
}

export default Polices;