import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/amazon.png";
import "../styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart, faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";

function Navbar() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      axios.get(`http://127.0.0.1:8000/api/cart/count/${parsedUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setCartCount(res.data.count || 0);
        })
        .catch((err) => {
          console.error("Failed to fetch cart count", err);
          setCartCount(0);
        });
    }
  }, []);


  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = search.trim().toLowerCase();
    if (!keyword) return;

    if (["clothes", "sports", "electronics"].includes(keyword)) {
      navigate(`/amazon/category/${keyword}`);
    } else if (["men", "women", "kids"].includes(keyword)) {
      navigate(`/amazon/category/clothes/${keyword}`);
    } else {
      navigate(`/amazon/${keyword}`);
    }

    setSearch("");
    setCollapsed(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cartCount");
    setUser(null);
    setCartCount(0);
    navigate("/amazon/");
    setCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light p-3">
      <div className="container-fluid">
        <Link className="navbar-brand me-3" to="/amazon/">
          <img src={logo} alt="Logo" width={100} />
        </Link>

        <button className="navbar-toggler" type="button" onClick={() => setCollapsed(!collapsed)}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse w-100 ${collapsed ? "" : "show"}`}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center w-100">
            <form
              onSubmit={handleSearch}
              className="d-flex align-items-center input-group mx-md-auto my-3 my-md-0"
              style={{ maxWidth: "600px", flexGrow: 1 }}
            >
              <div className="dropdown p-2">
                <button className="dropdown-toggle border-0" id="dropdownId" data-bs-toggle="dropdown">
                  Categories
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownId">
                  <div className="dropdown-submenu dropdown-hover">
                    <Link className="dropdown-item dropdown-toggle" to="#" onClick={(e) => e.preventDefault()}>
                      Clothes
                    </Link>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/amazon/category/clothes/men">Men</Link>
                      <Link className="dropdown-item" to="/amazon/category/clothes/women">Women</Link>
                      <Link className="dropdown-item" to="/amazon/category/clothes/kids">Kids</Link>
                    </div>
                  </div>
                  <Link className="dropdown-item" to="/amazon/category/electronics">Electronics</Link>
                  <Link className="dropdown-item" to="/amazon/category/sports">Sports</Link>
                </div>
              </div>
              <input
                className="form-control border-0"
                type="text"
                placeholder="Search for item or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-warning border-0" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>

            <ul className="navbar-nav d-flex flex-row align-items-center gap-3 ms-md-3">
              {!user ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/amazon/auth" onClick={() => setCollapsed(true)}>
                    <FontAwesomeIcon icon={faSignInAlt} /> Login
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={
                        user.id === 1 && user.email.includes("admin@domain.com")
                          ? "/amazon/admin-dashboard"
                          : "/amazon/user-dashboard"
                      }
                      onClick={() => setCollapsed(true)}
                    >
                      <FontAwesomeIcon icon={faUser} className="me-1" />
                      {user.name}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              )}

              <li className="nav-item position-relative">
                <Link className="nav-link" to="/amazon/cart" onClick={() => setCollapsed(true)}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount > 99 ? "99+" : cartCount}
                      <span className="visually-hidden">cart items</span>
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;