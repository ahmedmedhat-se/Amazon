import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/profile.css";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          const response = await axios.get('http://127.0.0.1:8000/api/cart', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });

          if (response.data.success) {
            setCartItems(response.data.data);
          }
        } catch (error) {
          console.error("Failed to fetch data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.warn("No user data found in localStorage.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleRemoveFromCart = async (itemId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/cart/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        setCartItems(cartItems.filter(item => item.id !== itemId));
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  if (loading) {
    return <div className="profile">Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="profile-details">
        <div className="profile-card h-100">
          <div className="profile-card-header">
            <img
              className="profile-card-img"
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
              alt="Profile Photo"
            />
          </div>
          <div className="profile-card-body">
            <h2 className="fw-bold">{user ? user.name : "Guest"}</h2>
            <p className="text-secondary fw-bold">{user ? user.email : ""}</p>
            <p className="text-secondary fw-bold">{user ? user.phone || "No Phone Provided" : ""}</p>
          </div>
          <div className="profile-card-footer">
            <button className="btn btn-outline-warning">Edit</button>
          </div>
        </div>
      </div>

      <div className="profile-bills">
        <div className="payments">
          <div className="profile-card">
            <div className="profile-card-header">
              <h4 className="profile-card-title text-dark">Payments</h4>
            </div>
            <div className="profile-card-body">
              {cartItems.length > 0 ? (
                cartItems.map(item => (
                  <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold">{item.product.name} (x{item.quantity})</span>
                    <span className="text-success fw-bold">${item.product.price * item.quantity}</span>
                  </div>
                ))
              ) : (
                <p className="profile-card-text">No payment history</p>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="profile-card-footer">
                <button className="btn btn-primary">Checkout</button>
              </div>
            )}
          </div>
        </div>

        <div className="cart">
          <div className="profile-card">
            <div className="profile-card-header">
              <h4 className="profile-card-title text-dark">Cart</h4>
            </div>
            <div className="profile-card-body">
              {cartItems.length > 0 ? (
                cartItems.map(item => (
                  <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold">{item.product.name} (x{item.quantity})</span>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p className="profile-card-text">Your cart is empty</p>
              )}
            </div>
            <div className="profile-card-footer d-flex justify-content-between">
              <span className="text-success fw-bold">
                Total: ${cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;