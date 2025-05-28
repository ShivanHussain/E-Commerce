import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, clearOrderMessages } from "../../../redux/slices/orderSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";

function OrderDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { order, loading, error, message } = useSelector((state) => state.order);


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
        if (id) {
            dispatch(getOrderById(id));
        }
    }, [dispatch, id]);

    // Show toast messages for error/success
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearOrderMessages());
        }
        if (message) {
            toast.success(message);
            dispatch(clearOrderMessages());
        }
    }, [error, message, dispatch]);

    const formatAddress = (addr) => {
        if (!addr) return "N/A";
        const { address, city, zipcode, country } = addr;
        return `${address}, ${city}, ${zipcode}, ${country}`;
    };

    if (loading) {
        return <div className="text-center py-20 "><Loader/></div>;
    }

    if (!order) {
        
        return <div className="text-center py-20">No order found with this ID.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <h2 className="text-left text-2xl md:text-3xl font-bold mb-6">Order Details</h2>

            <div className="p-4 sm:p-6 rounded-lg border bg-white shadow-md">
                {/* Order Info */}
                <div className="flex flex-col sm:flex-row justify-between mb-8">
                    <div>
                        <h3 className="text-lg md:text-xl font-semibold">
                            Order ID: #{order._id}
                        </h3>
                        <p className="text-gray-600 text-left">
                            Order Date:{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${getStatusColor(order.status)}`}
                        >{order.status}
                        </span>
                    </div>
                </div>

                {/* Customer, Payment, Shipping Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
                    {/* Payment Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
                        <p>Payment Method: {order.paymentDetails?.type || "N/A"}</p>
                        <p>Status: {order.paymentDetails?.status === "Completed" ? "Paid" : "Unpaid"}</p>
                    </div>

                    {/* Empty Column (center placeholder) */}
                    <div className="hidden md:block"></div>

                    {/* Shipping Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
                        <p>Shipping Method: {order.shippingMethod || "Standard"}</p>
                        <p>
                            Address: {order.shippingAddress ? formatAddress(order.shippingAddress) : "N/A"}
                        </p>
                    </div>
                </div>



                {/* Product List */}
                <div className="overflow-x-auto">
                    <h4 className="text-left text-lg font-semibold mb-4">Products</h4>
                    <table className="min-w-full text-sm text-left text-gray-700 border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4">Product</th>
                                <th className="py-2 px-4">Unit Price</th>
                                <th className="py-2 px-4">Quantity</th>
                                <th className="py-2 px-4">Category</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item) => (
                                <tr key={item._id || item.productId} className="border-t">
                                    <td className="py-2 px-4 flex items-center gap-3">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-12 object-cover rounded-md"
                                        />
                                        <Link
                                            to={`/product/${item.productId}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {item.name}
                                        </Link>
                                    </td>
                                    <td className="py-2 px-4">&#8377; {item.price}</td>
                                    <td className="py-2 px-4">{item.quantity}</td>
                                    <td className="py-2 px-4 capitalize">
                                        {item.category}
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     <div className="mt-6 flex justify-between items-center border-t-2 pt-4 text-semibold mb-4">
                        <div className="font-bold">Total Amount</div>
                        <div className="text-lg font-semibold">
                            ₹ {order.paymentDetails.amountInINR?.toFixed(2) || "0.00"}
                        </div>

                    </div>
                </div>

                {/* Back to Orders link */}
                <Link
                    to="/profile"
                    className="block  text-blue-600 hover:underline text-left border-t-2"
                >
                    ← Back To My Orders
                </Link>
            </div>
        </div>
    );
}

export default OrderDetails;
