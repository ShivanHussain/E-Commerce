import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomPayPalButton from "./CustomPayPalButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getCartItems } from "../../../redux/slices/cartSlice"; // adjust path as needed
import { getUser } from "../../../redux/slices/userSlice"; // adjust path as needed
import { clearOrderMessages, placeOrder } from "../../../redux/slices/orderSlice";
import Loader from "../Loader/Loader";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated, loading: userLoading } = useSelector((state) => state.user);
  const { items: cartItems, loading: cartLoading } = useSelector((state) => state.cart);
  const { message: orderMessage, error: orderError } = useSelector((state) => state.order);


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const [showPayment, setShowPayment] = useState(false);

  const INR_TO_USD_RATE = 0.011623;
  const shippingCost = 5;

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const finalAmount = totalPrice + shippingCost;
  const convertInrToUsd = (inrAmount, rate = INR_TO_USD_RATE) => (inrAmount * rate).toFixed(2);

  // Fetch user if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(getUser());
    }
  }, [isAuthenticated, dispatch]);

  // Pre-fill form from user
  useEffect(() => {
    if (user?.name && user?.email) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  // Load cart
  useEffect(() => {
    if (user?._id) {
      dispatch(getCartItems(user._id));
    }
  }, [user, dispatch]);

  // Toast messages
  useEffect(() => {
    if (orderMessage) {
      toast.success(orderMessage);
      dispatch(clearOrderMessages());
      navigate("/orderconfirmation");
    }

    if (orderError) {
      toast.error(orderError);
      dispatch(clearOrderMessages());
    }
  }, [orderMessage, orderError, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (paypalDetails) => {
    const shipping = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      country: formData.country,
      city: formData.city,
      zipcode: formData.zipCode,
    };

    const items = cartItems.map((item) => ({
      productId: item._id,
      image: item.image.url,
      title: item.title,
      price: item.price,
      category: item.category,
    }));

    const payment = {
      id: paypalDetails.id,
      transactionId: paypalDetails.id,
      status: paypalDetails.status,
      amountInINR: finalAmount.toFixed(2),
      amountInUSD: convertInrToUsd(finalAmount),
      create_time: paypalDetails.create_time,
      items, // You may or may not include this in payment, depending on your backend model
    };

    const payload = {
      paymentDetails: payment,
      shippingAddress: shipping,
      items: cartItems.map((item) => ({
        productId: item._id,
      })),
    };

    dispatch(placeOrder(payload));
  };


  if (userLoading || cartLoading) return <Loader />;

  return (
    <div className="p-4 lg:p-16 bg-gray-100 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
          <form className="space-y-4 text-left" onSubmit={handleSubmit}>
            {/* Form Inputs */}
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md"
                name="fullName"
                value={formData.fullName}
                disabled
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-2 border rounded-md"
                name="email"
                value={formData.email}
                disabled
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="tel"
                className="w-full mt-1 p-2 border rounded-md"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Country</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Address</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium">City</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded-md"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium">Zip Code</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded-md"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {!showPayment ? (
              cartItems.length > 0 ? (
                <button
                  type="submit"
                  className="w-full text-white py-2 rounded-md font-medium bg-black hover:bg-gray-800 transition"
                >
                  Continue to Payment
                </button>
              ) : null
            ) : (
              <div className="mt-8">
                <h3 className="text-xl font-medium text-center mb-4">
                  Select Payment Method
                </h3>
                <div className="space-y-3">
                  <CustomPayPalButton
                    amount={convertInrToUsd(finalAmount)}
                    formData={formData} // 👈 Send form data to PayPal
                    onSuccess={handlePaymentSuccess}
                    onError={() =>
                      toast.error("Payment Failed. Try again")
                    }
                  />

                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-2xl shadow-lg max-h-screen overflow-y-auto">
          <h2 className="text-xl font-semibold mb-6 border-b pb-3">Order Summary</h2>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            <div className="pr-2">
              {cartItems.map((product, index) => (
                <React.Fragment key={index}>
                  <div className="grid grid-cols-12 items-center gap-4 mb-6">
                    {/* Image Column */}
                    <div className="col-span-3">
                      <div className="w-full aspect-square bg-white border rounded-xl overflow-hidden">
                        <img
                          src={product.image?.url}
                          alt={product.title}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>

                    {/* Title + Category + Quantity Column */}
                    <div className="col-span-6 flex flex-col justify-center">
                      <span className="font-medium text-lg">{product.title}</span>
                      {product.category && (
                        <span className="text-sm text-gray-500">
                          Category: {product.category}
                        </span>
                      )}
                      {product.quantity && (
                        <span className="text-sm text-gray-500">Qty: {product.quantity}</span>
                      )}
                    </div>

                    {/* Price Column */}
                    <div className="col-span-3 text-right">
                      <span className="text-sm font-semibold text-blue-600">
                        &#8377;{(product.price * (product.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  {index !== cartItems.length - 1 && <hr className="border-gray-300 mb-6" />}
                </React.Fragment>
              ))}
            </div>
          )}

          <div className="mt-4 bg-gray-50 p-4 rounded-xl space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>&#8377;{totalPrice.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span>&#8377;{shippingCost.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>&#8377;{finalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
