import { useNavigate } from "react-router-dom";

function ProductGrid({ products, title }) {
  const navigate = useNavigate();

  const handleCartClick = (product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate("/amazon/cart");
  };

  return (
    <div className="row g-4">
      <h2 className="text-center">{title}</h2>
      {products.length > 0 ? (
        products.map((product) => (
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
          <p>No products found.</p>
        </div>
      )}
    </div>
  );
}

export default ProductGrid;