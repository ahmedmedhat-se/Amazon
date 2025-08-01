import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext.jsx";
import "../css/products.css";
import { useNavigate } from "react-router-dom";

function Electronics() {
  const { products } = useContext(ProductsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const navigate = useNavigate();

  const electronicsProducts = products.filter(
    (product) => product.product_category?.toLowerCase() === "electronics"
  );

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = electronicsProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(electronicsProducts.length / productsPerPage);

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCartClick = (product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    navigate("/amazon/cart");
  };

  return (
    <div className="container-fluid p-5 products-container">
      <div className="row g-4">
        <h2 className="text-center">Amazon Electronics</h2>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div className="col-md-6 col-lg-4" key={product.id}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={`http://127.0.0.1:8000/${product.product_image}`}
                  alt={product.product_name}
                  className="card-img-top rounded-top"
                />
                <div className="card-body">
                  <h5 className="card-title text-capitalize">{product.product_name}</h5>
                  <p className="card-text">{product.product_desc}</p>
                  <span className="badge bg-info border-0">
                    {product.product_category}
                  </span>
                  <div className="mb-2">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index} style={{ color: index < product.product_ratings ? "#ffc107" : "#e4e5e9", fontSize: "1rem" }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="d-flex justify-content-between card-footer align-items-center">
                    <span className="fw-bold text-success">${product.product_price}</span>
                    <button
                      className="btn btn-dark btn-sm text-light w-50"
                      onClick={() => handleCartClick(product)}
                    >
                      Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted mt-5">
            <p>No electronics products found.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <nav className="mt-5 d-flex justify-content-center">
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button className="page-link m-1" onClick={() => goToPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Electronics;