import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/amazon.png";
import "../styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart, faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function Navbar() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = search.trim().toLowerCase();
    if (!keyword) return;

    if (["men", "women", "kids"].includes(keyword)) {
      navigate(`/amazon/products/${keyword}`);
    } else {
      navigate(`/amazon/${keyword}`);
    }
    setSearch("");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/amazon/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light p-3">
      <div className="container-fluid d-flex align-items-center justify-content-between gap-3 flex-wrap">

        {/* Logo */}
        <Link className="navbar-brand me-3" to="/amazon/">
          <img src={logo} alt="Logo" width={100} className="rounded" />
        </Link>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="d-flex align-items-center flex-grow-1 input-group" style={{ maxWidth: "600px" }}>
          <div className="dropdown p-2">
            <button
              className="dropdown-toggle border-0"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Categories
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              <Link className="dropdown-item" to="/amazon/products/clothes">Clothes</Link>
              <Link className="dropdown-item" to="/amazon/products/electronics">Electronics</Link>
              <Link className="dropdown-item" to="/amazon/products/sports">Sports</Link>
            </div>
          </div>
          <input
            className="form-control border-0"
            type="text"
            placeholder="Search for item or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="my-2 my-sm-0 border-0" type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>

        {/* Icons */}
        <ul className="navbar-nav d-flex flex-row align-items-center gap-3 ms-3">

          {!user && (
            <li className="nav-item">
              <Link className="nav-link" to="/amazon/auth">
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Link>
            </li>
          )}

          {user && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={
                    user.id === 1 && user.email.includes("admin@domain.com")
                      ? "/amazon/admin-dashboard"
                      : "/amazon/user-dashboard"
                  }
                >
                  <FontAwesomeIcon icon={faUser} className="me-1" />
                  {user.name}
                </Link>
              </li>
              {/* 👇 This shows for both users & admin */}
              <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}

          <li className="nav-item">
            <Link className="nav-link" to="/amazon/cart">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;