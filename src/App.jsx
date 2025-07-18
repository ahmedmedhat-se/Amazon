import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importing Layouts
import MainLayout from "./components/layout/MainLayout.jsx";
import ProductProvider from "./components/store/context/ProductsContext.jsx";

// Importing Auth Components
import AuthForm from "./components/auth/AuthForm.jsx";
import AdminDashboard from "./components/auth/AdminDashboard.jsx";
import UserDashboard from "./components/auth/UserDashboard.jsx";

// Importing Main Website Views
import Homepage from "./components/views/Homepage.jsx";
import Polices from "./components/views/Polices.jsx";

// Importing Store Components
import Products from "./components/store/pages/Products.jsx";
import Clothes from "./components/store/pages/Clothes.jsx";
import Electronics from "./components/store/pages/Electronics.jsx";
import Sports from "./components/store/pages/Sports.jsx";

const routes = createBrowserRouter([{
  path: "/amazon/",
  element: <MainLayout />,
  children: [
    { index: true, element: <Homepage /> },
    { path: "polices", element: <Polices /> },
    { path: "products", element: <Products /> },
    {
      path: "category", children: [
        { path: "clothes", element: <Clothes /> },
        { path: "electronics", element: <Electronics /> },
        { path: "sports", element: <Sports /> }
      ]
    },
    { path: "auth", element: <AuthForm /> },
    { path: "admin-dashboard", element: <AdminDashboard /> },
    { path: "user-dashboard", element: <UserDashboard /> }
  ]
}]);

function App() {
  return (
    <ProductProvider>
      <RouterProvider router={routes} />
    </ProductProvider>
  )
}

export default App;