import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/authform.css";
import loginImage from "../assets/login-form-image.png";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.baseURL = "http://127.0.0.1:8000";
    axios.defaults.withCredentials = true;
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    const url = isLogin ? "/api/login" : "/api/register";

    try {
      const response = await axios.post(url, form);
      const { token, user, message } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setMessage(message || "Logged in successfully!");
      setForm({ name: "", email: "", password: "", password_confirmation: "" });

      setTimeout(() => {
        if (isLogin && user.id === 1 && user.email.includes("admin@domain.com")) {
          navigate("/amazon/admin-dashboard");
        } else {
          navigate("/amazon/user-dashboard");
        }
      }, 800);
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setMessage(err.response?.data?.message || "An error occurred.");
      }
    }
  };

  return (
    <div className="auth-container container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="auth-card p-4 shadow-lg bg-white" style={{ maxWidth: "420px", width: "100%" }}>
        {isLogin && (
          <div className="text-center mb-3">
            <img src={loginImage} alt="Login" className="auth-image-top" />
          </div>
        )}

        <h3 className="text-center mb-3">{isLogin ? "Login" : "Sign Up"}</h3>

        {message && (
          <div className="alert alert-info text-center small py-2 px-3">{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label className="form-label">Name</label>
              <input
                className={`form-control mb-2 ${errors.name ? "is-invalid" : ""}`}
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
            </>
          )}

          <label className="form-label">Email</label>
          <input
            className={`form-control mb-2 ${errors.email ? "is-invalid" : ""}`}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}

          <label className="form-label">Password</label>
          <div className="input-group mb-2">
            <input
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <div className="invalid-feedback d-block">{errors.password[0]}</div>}

          {!isLogin && (
            <>
              <label className="form-label">Confirm Password</label>
              <div className="input-group mb-2">
                <input
                  className={`form-control ${errors.password_confirmation ? "is-invalid" : ""}`}
                  name="password_confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.password_confirmation}
                  onChange={handleChange}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password_confirmation && (
                <div className="invalid-feedback d-block">{errors.password_confirmation[0]}</div>
              )}
            </>
          )}

          <button type="submit" className="btn btn-dark w-100 my-3 shadow-sm">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center">
          <p
            onClick={() => {
              setIsLogin(!isLogin);
              setForm({
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
              });
              setErrors({});
              setMessage("");
            }}
          >
            {isLogin 
            ? <p>Don't have an account? <span className="text-primary">Sign Up</span></p> 
            : <p>Already have an account? <span className="text-primary">Login</span></p>
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;