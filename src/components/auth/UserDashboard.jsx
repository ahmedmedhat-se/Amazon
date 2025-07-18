import { useEffect, useState } from "react";
import "../styles/profile.css";

function UserDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    } else {
      console.warn("No user data found in localStorage.");
    }
  }, []);

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
            <h2>{user ? user.name : "Loading..."}</h2>
            <p>{user ? user.email : ""}</p>
            <p>{user ? user.phone || "No Phone Provided" : ""}</p>
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
              <h4 className="profile-card-title">Payments</h4>
            </div>
            <div className="profile-card-body">
              <p className="profile-card-text">Product One</p>
              <p className="profile-card-text">Product One</p>
              <p className="profile-card-text">Product One</p>
            </div>
            <div className="profile-card-footer">
              <button className="btn btn-outline-warning">Edit</button>
            </div>
          </div>
        </div>

        <div className="cart">
          <div className="profile-card">
            <div className="profile-card-header">
              <h4 className="profile-card-title">Cart</h4>
            </div>
            <div className="profile-card-body">
              <p className="profile-card-text">Product One</p>
              <p className="profile-card-text">Product One</p>
              <p className="profile-card-text">Product One</p>
            </div>
            <div className="profile-card-footer">
              <button className="btn btn-outline-warning">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;