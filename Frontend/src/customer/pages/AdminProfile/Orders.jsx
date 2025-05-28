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

    // Status options in lowercase to match backend enum values
    const statusOptions = ["Processing", "Delivered", "Shipped", "Cancelled"];

    // Capitalize first letter for display
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    // Background color classes based on status
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

    // Fetch all orders on mount
    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    // Show error toast
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearOrderMessages());
        }
    }, [error, dispatch]);

    // Show success toast on status update success
    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(clearOrderMessages());
        }
    }, [message, dispatch]);

    // Handle status change
    const handleStatusChange = (orderId, newStatus) => {
        dispatch(orderUpdateStatus(orderId, newStatus));
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-100 shadow-xl mb-12 rounded-lg mt-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Order Management</h2>

            {loading ? (
                <p className="text-blue-600 text-center font-semibold">Loading orders...</p>
            ) : orders?.length === 0 ? (
                <p className="text-gray-600 text-center">No orders found.</p>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-md">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-200 text-gray-900 font-semibold">
                            <tr>
                                <th className="py-4 px-6 text-center border-b border-gray-300 w-1/4">
                                    Order ID
                                </th>
                                <th className="py-4 px-6 text-center border-b border-gray-300 w-1/4">
                                    Customer Name
                                </th>
                                <th className="py-4 px-6 text-center border-b border-gray-300 w-1/4">
                                    Total Price
                                </th>
                                <th className="py-4 px-6 text-center border-b border-gray-300 w-1/4">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <React.Fragment key={order._id}>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-4 px-6 text-center border-b border-gray-200 font-mono text-sm text-gray-700">
                                            {order._id}
                                        </td>
                                        <td className="py-4 px-6 text-center border-b border-gray-200 text-gray-800">
                                            {order.shippingAddress?.fullName || "N/A"}
                                        </td>
                                        <td className="py-4 px-6 text-center border-b border-gray-200 font-semibold text-gray-900">
                                            ₹{order.paymentDetails?.amountInINR?.toFixed(2) || "0.00"}
                                        </td>
                                        <td className="py-4 px-6 text-center border-b border-gray-200">
                                            <select
                                                value={order.status}
                                                className={`px-3 py-1 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${getStatusColor(
                                                    order.status
                                                )}`}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                disabled={loading}
                                            >
                                                {statusOptions.map((status) => (
                                                    <option key={status} value={status}>
                                                        {capitalize(status)}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>

                    </table>
                </div>
            )}
        </div>
    );
};

export default Orders;
