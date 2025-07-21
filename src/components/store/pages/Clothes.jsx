import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext.jsx";
import ProductGrid from "./ProductGrid.jsx";
import "../css/products.css";
import { Outlet } from "react-router-dom";

function Clothes() {
  const { products } = useContext(ProductsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const clothesProducts = products.filter(
    (product) => product.product_category?.toLowerCase().includes("clothes")
  );

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = clothesProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(clothesProducts.length / productsPerPage);

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="container-fluid p-5 products-container">
        <ProductGrid products={currentProducts} title="Amazon Clothes" />

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
      <Outlet />
    </>
  );
}

export default Clothes;