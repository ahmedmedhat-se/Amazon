import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext();

function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const getAllProducts = async() => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/products");
            setProducts(response.data);
        } catch (error){
            console.error(`Error occured while fetching data: ${error}`);
        };
    };

    useEffect(()=>{
        getAllProducts();
    }, []);

  return (
    <ProductsContext.Provider value={{products}}>
        {children}
    </ProductsContext.Provider>
  )
}

export default ProductProvider;