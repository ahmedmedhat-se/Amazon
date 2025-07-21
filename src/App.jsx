import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importing Layouts
import MainLayout from "./components/layout/MainLayout.jsx";

// Importing Error Element
import NotFound from "./components/main/NotFound.jsx";

// Importing Our Store Provider
import ProductProvider from "./components/store/context/ProductsContext.jsx";

// Importing Auth Components
import AuthForm from "./components/auth/AuthForm.jsx";
import AdminDashboard from "./components/auth/AdminDashboard.jsx";
import UserDashboard from "./components/auth/UserDashboard.jsx";

// Importing Main Website Views
import Homepage from "./components/views/Homepage.jsx";
import Policies from "./components/views/Policies.jsx";
import AboutUs from "./components/views/AboutUs.jsx";

// Importing Store Components
import Products from "./components/store/pages/Products.jsx";
import Clothes from "./components/store/pages/Clothes.jsx";
import MenClothes from "./components/store/pages/MenClothes.jsx";
import WomenClothes from "./components/store/pages/WomenClothes.jsx";
import KidsClothes from "./components/store/pages/KidsClothes.jsx";
import Electronics from "./components/store/pages/Electronics.jsx";
import Sports from "./components/store/pages/Sports.jsx";
import Cart from "./components/store/pages/Cart.jsx";

// Importing Guards
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

const routes = createBrowserRouter([{
  path: "/amazon/",
  element: <MainLayout />,
  errorElement: <NotFound />,
  children: [
    { index: true, element: <Homepage /> },
    { path: "policies", element: <Policies /> },
    { path: "about-us", element: <AboutUs /> },
    { path: "products", element: <Products /> },
    { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
    {
      path: "category", children: [
        { path: "clothes", element: <Clothes />},
        { path: "clothes/men", element: <MenClothes />},
        { path: "clothes/women", element: <WomenClothes />},
        { path: "clothes/kids", element: <KidsClothes />},
        { path: "electronics", element: <Electronics /> },
        { path: "sports", element: <Sports /> }
      ]
    },
    { path: "auth", element: <AuthForm /> },
    {
      path: "user-dashboard",
      element: (
        <ProtectedRoute>
          <UserDashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "admin-dashboard",
      element: (
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      ),
    },
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