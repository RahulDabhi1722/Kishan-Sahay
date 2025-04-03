import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./authContext";

// Auth Pages
import LoginPage from "./components/LoginPage/Login";
import SignUpPage from "./components/SignUp/SignUp";

// Landing Page and Public Pages
import LandingPage from "./LandingPage";
import FarmerGuide from "./InitialDashBoard/Farmer Guide/FarmerGuide";
import CustomerGuide from "./InitialDashBoard/Customer Guide/CustomerGuide";
import AboutSection from "./components/Common/AboutSection/About";

// Farmer Dashboard and Pages
import FarmerDashboard from "./FarmerDashBoard/FarmerDashboard";
import MarketPrice from "./FarmerDashBoard/MarketPrice/MarketPriceComponent";
import WeatherDetails from "./FarmerDashBoard/WeatherDetails/WeatherPreview";


// Customer Dashboard and Pages
import CustomerDashboard from "./CustomerDashboard/CustomerDashboard";
import Marketplace from "./CustomerDashboard/MarketPlace/MarketPlace";
import Farmers from "./CustomerDashboard/Farmers/Farmers";
import CustomerInfo from "./CustomerDashboard/CustomerInfo/CustomerInfo";
import FarmerInfo from "./CustomerDashboard/FarmerInfo/FarmerInfo";
import Seasonal from "./CustomerDashboard/Seasonal Products/SeasonalProductPage";

// Admin Dashboard
import AdminDashboard from "./AdminDashBoard/AdminDashboard";
import Dashboardhome from "./AdminDashBoard/DashBoard/DashBoard";
import UFarmers from "./AdminDashBoard/Farmers/Farmers";
import UCustomers from "./AdminDashBoard/Customers/Customers";
import Products from "./AdminDashBoard/Products/Products";

// Other components

import CartPage from "./CustomerDashboard/Cart/Cart";
import Analytics from "./AdminDashBoard/Analytics/Analytics";
import SellGoodsContainer from "./FarmerDashBoard/SellGoods/MainPage/SellGoodsContainer";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Redirect based on user role
    if (currentUser.role === "farmer") {
      return <Navigate to="/farmer-dashboard" />;
    } else if (currentUser.role === "customer") {
      return <Navigate to="/customer-dashboard" />;
    } else if (currentUser.role === "admin") {
      return <Navigate to="/admin-dashboard" />;
    }

    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/farmerguide" element={<FarmerGuide />} />
          <Route path="/customerguide" element={<CustomerGuide />} />
          <Route path="/about" element={<AboutSection />} />
          
          <Route
            path="/customer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/marketplace"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Marketplace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/farmers"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Farmers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/info"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/farmerinfo/:id"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <FarmerInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/seasonal"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Seasonal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/cart"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CartPage />
              </ProtectedRoute>
            }
          />
          {/* Protected Farmer Routes */}
          <Route
            path="/farmer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer/marketprize"
            element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <MarketPrice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer/weather"
            element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <WeatherDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer/sell"
            element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <SellGoodsContainer />
              </ProtectedRoute>
            }
          />
          {/* Protected Admin Routes */}
          // In App.jsx, update the admin routes:
          <Route
            path="/admin-dashboard/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboardhome />} />
            <Route path="farmers" element={<UFarmers />} />
            <Route path="customers" element={<UCustomers />} />
            <Route path="products" element={<Products />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
