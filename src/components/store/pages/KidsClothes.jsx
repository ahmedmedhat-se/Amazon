import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext.jsx";
import ProductGrid from "./ProductGrid.jsx";
import "../css/products.css";

function KidsClothes() {
    const { products } = useContext(ProductsContext);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    const kidsRegex = /\bkids?\b/i;
    const filtered = products.filter(
        (product) => kidsRegex.test(product.product_category)
    );

    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filtered.length / productsPerPage);

    const goToPage = (pageNum) => {
        setCurrentPage(pageNum);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="container-fluid p-5 kids-container">
            <ProductGrid products={currentProducts} title="Kids Clothes" />
            {totalPages > 1 && (
                <nav className="mt-5 d-flex justify-content-center">
                    <ul className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li
                                key={index + 1}
                                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                            >
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

export default KidsClothes;