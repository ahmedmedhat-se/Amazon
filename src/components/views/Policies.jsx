import { Link } from "react-router-dom";
import "../styles/policies.css";

function Policies() {
  return (
    <>
      <div className="container-fluid p-5">
        <article className="p-5">
          <div className="article-content">
            <h2 className="fw-bold">Company's Policies</h2>
            <p className="fw-bold fs-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              At sunt rem suscipit vero recusandae? Ipsum laboriosam nemo 
              officia enim natus harum praesentium commodi alias sint? 
              Placeat dolores aperiam, distinctio voluptas adipisci ex? 
              Earum temporibus expedita dolore porro atque, quam modi beatae 
              molestiae nam mollitia fuga consequuntur recusandae voluptatem 
              odio dolor natus quasi placeat rerum. Ex numquam suscipit sit qui
              saepe fuga perspiciatis sed, earum nemo repellat provident illo 
              incidunt obcaecati, rerum assumenda eaque in eius tempore mollitia 
              voluptate totam? Nam sapiente accusamus vero voluptate maiores impedit 
              expedita, laboriosam repellat ducimus minima, illo perspiciatis velit 
              deleniti obcaecati. Nemo temporibus officia adipisci?
            </p>
            <Link className="btn btn-dark" to={"/amazon/"}>Home</Link>
          </div>
        </article>
      </div>
    </>
  )
}

export default Policies;