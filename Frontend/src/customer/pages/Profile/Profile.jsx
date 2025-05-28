import React, { useEffect } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { getOrderHistory } from '../../../redux/slices/orderSlice';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message, user } = useSelector((state) => state.user);
  const { orders, error } = useSelector((state) => state.order);

  const getStatusColor = (status) => {
        switch (status) {
            case "Processing":
                return "bg-gray-300 text-gray-800";
            case "Delivered":
                return "bg-green-500 text-white";
            case "Shipped":
                return "bg-blue-500 text-white";
            case "Cancelled":
                return "bg-red-500 text-white";
            default:
                return "bg-gray-200 text-gray-700";
        }
    };
  


  useEffect(() => {
    dispatch(getOrderHistory());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success(message || 'Logged out successfully');
    navigate("/");
  };

  const handleOrderHistory = () => {
    navigate("/orderconfirmation");
  };

  const formatAddress = (addr) => {
    if (!addr) return "N/A";
    const { address, city, zipcode, country } = addr;
    return `${address}, ${city}, ${zipcode}, ${country}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row gap-6 h-full">

        {/* Left: User Info */}
        <div className="w-full md:w-1/5 bg-white shadow rounded-lg p-6 flex flex-col md:h-auto">
          <div className="flex justify-center mb-4">
            <AccountCircle className="text-gray-500" style={{ fontSize: '80px' }} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">My Profile</h2>
          <div className="flex flex-col justify-center items-start flex-grow text-gray-700 text-sm space-y-3">
            <div><strong>Name:</strong> {user?.name || "Not available"}</div>
            <div><strong>Email:</strong> {user?.email || "Not available"}</div>
            <div><strong>Phone:</strong> {user?.phone || "Not available"}</div>
            <div><strong>Joined:</strong> {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
              : "Not available"}</div>
          </div>

          <button
            onClick={handleOrderHistory}
            className="w-full mt-8 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-black text-white font-semibold hover:bg-gray-800 transition"
          >
            Order History
          </button>

          <button
            onClick={handleLogout}
            className="w-full mt-4 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-black text-white font-semibold hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>

        {/* Right: Order History */}
        <div className="w-full md:w-3/4 bg-white shadow rounded-lg p-6 flex flex-col h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">My Orders</h2>
          <div className="space-y-4">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-800 sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Shipping Address</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id} className="border-t">
                      {/* First item image preview */}
                      <td className="py-3 px-4">
                        <img
                          src={order.items?.[0]?.image}
                          alt="Product"
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </td>

                      <td className="py-3 px-4 font-medium hover:underline">
                        <Link to={`/orderdetails/${order._id}`}>{order._id}</Link>
                      </td>

                      <td className="py-3 px-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3 px-4">
                        {order.items.length}
                      </td>

                      <td className="py-3 px-4">
                        ₹{order.paymentDetails?.amount || order.paymentDetails?.amountInINR || 0}
                      </td>

                      <td className="py-3 px-4">{formatAddress(order.shippingAddress)}</td>

                      <td className="py-3 px-4">
                        <span className={`bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-500 text-sm">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="block md:hidden space-y-6">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-lg p-4 shadow-sm bg-white space-y-4"
                >
                  {/* Top row: image + ID + date */}
                  <div className="flex justify-between items-start gap-4">
                    {/* Image on left */}
                    <img
                      src={order.items?.[0]?.image}
                      alt="Product"
                      className="w-20 h-20 object-cover rounded-md"
                    />

                    {/* ID + Date on right */}
                    <div className="flex flex-col items-end text-right text-sm">
                      <Link
                        to={`/orderdetails/${order._id}`}
                        className="font-semibold text-blue-600 hover:underline break-all"
                      >
                        #{order._id.slice(-6)}
                      </Link>
                      <span className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Order Info Below */}
                  <div className="flex flex-col text-sm space-y-2">
                    <p><strong>Items:</strong> {order.items.length}</p>
                    <p><strong>Total:</strong> ₹{order.paymentDetails?.amount || order.paymentDetails?.amountInINR || 0}</p>
                    <p><strong>Address:</strong> {formatAddress(order.shippingAddress)}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-sm">No orders found.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
