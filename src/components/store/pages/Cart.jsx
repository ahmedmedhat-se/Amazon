import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/cart.css";

function Cart() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedProduct = localStorage.getItem('selectedProduct');
    if (selectedProduct) {
      setProduct(JSON.parse(selectedProduct));
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  const handleAddToProfile = async () => {
    if (!user || !product) return;

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/cart', {
        user_id: user.id,
        product_id: product.id,
        quantity: quantity
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        alert('Product added to your cart successfully!');
        navigate('/amazon/user-dashboard');
      } else {
        alert('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('An error occurred while adding to cart');
    }
  };

  if (!product) {
    return <div className="container">No product selected</div>;
  }

  return (
    <div className="container-fluid cart-page p-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`http://127.0.0.1:8000/${product.product_image}`}
            alt={product.product_name}
            className="card-img-top"
          />
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <h2 className="fw-bold fs-1">{product.product_name}</h2>
            <p className="fw-bold fs-5">{product.product_desc}</p>
            <div className="ratings mb-3 fs-5">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index} style={{ color: index < product.product_ratings ? "#ffc107" : "#e4e5e9" }}>
                  ★
                </span>
              ))}
            </div>
            <p className="price fw-bold fs-5">${product.product_price}</p>
            <div className="quantity-selector mb-3">
              <label htmlFor="quantity" className="fw-bold fs-5">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.product_quantity}
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  const validValue = Math.min(
                    product.product_quantity,
                    Math.max(1, isNaN(value) ? 1 : value)
                  );
                  setQuantity(validValue);
                }}
                className="form-control w-50 fw-bold"
              />
              <small className="text-muted">
                Available: {product.product_quantity}
              </small>
            </div>
            <button
              onClick={handleAddToProfile}
              className="btn btn-dark btn-lg"
            >
              Add to My Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;