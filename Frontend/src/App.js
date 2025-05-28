import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { loginSuccess } from './redux/slices/userSlice';

import Navbar from './customer/components/Navbar/Navbar';
import Footer from './customer/components/Footer/Footer';

// Pages
import UserLayout from './customer/components/Layout/UserLayout';
import CreateAccount from './customer/pages/SignUP/CreateAccount';
import SignIn from './customer/pages/SignIn/SignIn';
import Profile from './customer/pages/Profile/Profile';
import Store from './customer/pages/Store/Store';
import Checkout from './customer/components/Cart/Checkout';
import OrderConfirmation from './customer/pages/OrderConfimation/OrderConfirmation';
import PrintingServices from './customer/pages/PrintingServices.jsx/PrintingServices';
import Stationary from './customer/pages/Stationary/Stationary';
import Books from './customer/pages/Books/Books';
import ProductDetails from './customer/components/Products/ProductDetails';

// Admin
import AdminLayout from './customer/pages/AdminProfile/AdminLayout';
import Users from './customer/pages/AdminProfile/Users';
import Products from './customer/pages/AdminProfile/Products';
import Orders from './customer/pages/AdminProfile/Orders';
import RefundPolicy from './customer/pages/RefundPolicy/RefundPolicy';
import Contact from './customer/pages/Contact/Contact';
import ShippingPolicy from './customer/pages/ShippingPolicy/ShippingPolicy';
import PrivacyPolicy from './customer/pages/PrivacyPolicy/PrivacyPolicy';
import AddProduct from './customer/pages/AdminProfile/AddProduct';
import UpdateProduct from './customer/pages/AdminProfile/UpdateProduct';
import AdminProfile from './customer/pages/AdminProfile/AdminProfile';
import ProductDetail from './customer/pages/AdminProfile/ProductDetail';
import OrderDetails from './customer/pages/OrderDetails/OrderDetails'

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const userData = localStorage.getItem('user');
  const tokenData = localStorage.getItem('token');

  // Safe localStorage parsing
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== "undefined") {
        const parsedUser = JSON.parse(storedUser);
        dispatch(loginSuccess(parsedUser));
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
  }, [dispatch]);

  //Avoid accessing role if user is null
  const isAdmin = user?.role === 'Admin';
  const isCustomer = user?.role === 'User';


  const NotFound = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <h1>Oops! Page not found</h1>
      <p>The page you're looking for doesn't exist. Please check the URL or go back to the home page.</p>
      <Link to="/" className="btn">Go to Home</Link>
    </div>
  </div>
);

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          {/* Public Routes */}
          {!userData && !tokenData && (
            <Route path="/" element={<UserLayout />} />
          )}
          <Route exact path="/" element={<UserLayout />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/login" element={<SignIn />} />

          {/* Protected User Routes */}
          {isAuthenticated && isCustomer && (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/store" element={<Store />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/orderconfirmation" element={<OrderConfirmation />} />
              <Route path="/orderdetails/:id" element={<OrderDetails />} />
              <Route path="/printingservices" element={<PrintingServices />} />
              <Route path="/stationary" element={<Stationary />} />
              <Route path="/books" element={<Books />} />
              <Route path="/shipping" element={<ShippingPolicy />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/refundpolicy" element={<RefundPolicy />} />
            </>
          )}

          {/* Protected Admin Routes */}
          {isAuthenticated && isAdmin && (
            <>
              <Route path="/admin" element={<AdminLayout />} />
              <Route path="/profile" element={<AdminProfile />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/addproduct" element={<AddProduct />} />
              <Route path="/admin/editproduct/:id" element={<UpdateProduct />} />
              <Route path="/product/:id" element={<ProductDetail/>} />
              <Route path="/store" element={<Store />} />
              <Route path="/shipping" element={<ShippingPolicy />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/refundpolicy" element={<RefundPolicy />} />
              
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
         

        <Footer />
      </Router>

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </div>
  );
}

export default App;
