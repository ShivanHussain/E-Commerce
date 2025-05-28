import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllOrders,
    orderUpdateStatus,
    clearOrderMessages,
} from "../../../redux/slices/orderSlice";
import { toast } from "react-toastify";

const Orders = () => {
    const dispatch = useDispatch();
    const { orders, loading, error, message } = useSelector((state) => state.order);

    const statusOptions = ["Processing", "Delivered", "Shipped", "Cancelled"];

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

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
        dispatch(getAllOrders());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearOrderMessages());
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(clearOrderMessages());
        }
    }, [message, dispatch]);

    const handleStatusChange = (orderId, newStatus) => {
        dispatch(orderUpdateStatus(orderId, newStatus));
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-gray-50 shadow-md rounded-xl mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6">Order Management</h2>

            {loading ? (
                <p className="text-blue-600 text-center font-semibold">Loading orders...</p>
            ) : orders?.length === 0 ? (
                <p className="text-gray-600 text-center">No orders found.</p>
            ) : (
                <>
                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto rounded-lg shadow">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-200 text-gray-900 font-semibold">
                                <tr>
                                    <th className="py-4 px-6 text-center border-b">Order ID</th>
                                    <th className="py-4 px-6 text-center border-b">Customer</th>
                                    <th className="py-4 px-6 text-center border-b">Total</th>
                                    <th className="py-4 px-6 text-center border-b">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50">
                                        <td className="py-4 px-6 text-center border-b text-sm font-mono">{order._id}</td>
                                        <td className="py-4 px-6 text-center border-b">{order.shippingAddress?.fullName || "N/A"}</td>
                                        <td className="py-4 px-6 text-center border-b font-semibold">₹{order.paymentDetails?.amountInINR?.toFixed(2) || "0.00"}</td>
                                        <td className="py-4 px-6 text-center border-b">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                className={`px-3 py-1 rounded-md text-sm font-medium focus:outline-none focus:ring-2 ${getStatusColor(order.status)}`}
                                                disabled={loading}
                                            >
                                                {statusOptions.map((status) => (
                                                    <option key={status} value={status}>{capitalize(status)}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white p-4 rounded-lg shadow space-y-4 border border-gray-200">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="text-xs font-mono text-gray-600 break-all">
                                        <span className="block font-semibold text-gray-800">Order ID:</span>
                                        {order._id}
                                    </div>
                                    <div className="text-xs text-right text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="text-sm space-y-1">
                                    <p><strong>Customer:</strong> {order.shippingAddress?.fullName || "N/A"}</p>
                                    <p><strong>Total:</strong> ₹{order.paymentDetails?.amountInINR?.toFixed(2) || "0.00"}</p>
                                    <div className="mt-3">
                                        <label className="text-sm font-medium text-gray-700 block mb-1">Status</label>
                                        <select
                                            value={order.status}
                                            className={`w-full px-3 py-2 rounded-md font-medium text-sm focus:outline-none focus:ring-2 ${getStatusColor(order.status)}`}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            disabled={loading}
                                        >
                                            {statusOptions.map((status) => (
                                                <option key={status} value={status}>{capitalize(status)}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Orders;
