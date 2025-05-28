import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../redux/slices/orderSlice";
import Loader from "../../components/Loader/Loader";

const OrderHistory = () => {
    const dispatch = useDispatch();
    const { loading, orders, error } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getOrderHistory());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48 text-xl text-gray-600">
                <><Loader/></>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 mt-10 min-h-screen text-3xl">
                 {error}
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="text-center text-gray-700 mt-10 text-lg">
                No orders found.
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-emerald-700 mb-10">
                Your Order History
            </h1>

            {orders.map((order) => (
                <div
                    key={order._id}
                    className="bg-white p-6 md:p-8 mb-8 rounded-lg shadow-xl hover:shadow-md transition-shadow"
                >
                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
                        <div>
                            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                                Order ID: {order._id}
                            </h2>
                            <p className="text-gray-500 text-sm text-left">
                                Order Date: {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="text-sm text-gray-700">
                            <p className="text-emerald-700 font-medium">
                                Estimated Delivery:{" "}
                                {new Date(
                                    new Date(order.createdAt).setDate(
                                        new Date(order.createdAt).getDate() + 10
                                    )
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-6 mb-8">
                        {order.items.map((item) => (
                            <div
                                key={item.productId}
                                className="flex flex-col sm:flex-row items-center border-b pb-4 last:border-b-0 last:pb-0"
                            >
                                {/* Column 1: Image */}
                                <div className="w-full sm:w-1/4 flex justify-center sm:justify-start mb-4 sm:mb-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-md"
                                    />
                                </div>

                                {/* Column 2: Title */}
                                <div className="w-full sm:w-2/4 flex items-center justify-center sm:justify-start text-center sm:text-left px-4">
                                    <h4 className="text-md font-semibold text-gray-800">
                                        {item.title || "Unknown Product"}
                                    </h4>
                                </div>

                                {/* Column 3: Price and Qty */}
                                <div className="w-full sm:w-1/4 flex flex-col items-center sm:items-end text-right">
                                    <p className="text-md font-semibold text-gray-900">
                                        ₹ {item.price ? item.price.toFixed(2) : "0.00"}
                                    </p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                            </div>


                        ))}
                    </div>

                    {/* Payment & Address Info */}
                    <div className="flex flex-col md:flex-row md:justify-between md:space-x-8 border-t pt-6">
                        {/* Column 1: Payment Info */}
                        <div className="w-full md:w-1/3 mb-6 md:mb-0 text-left">
                            <h4 className="text-lg font-semibold mb-3 text-gray-800">Payment</h4>
                            <p className="text-gray-700">Type: {order.paymentDetails.type || "N/A"}</p>
                            <p className="text-gray-700">Status: {order.paymentDetails.status}</p>
                            <p className="text-gray-700 font-semibold mt-2">
                                Amount: ₹ {order.paymentDetails.amountInINR?.toFixed(2) || "0.00"}
                            </p>
                        </div>

                        {/* Column 2: Empty Placeholder (hidden on small screens) */}
                        <div className="hidden md:block md:w-1/3"></div>

                        {/* Column 3: Delivery Address */}
                        <div className="w-full md:w-1/3 text-left md:text-right">
                            <h4 className="text-lg font-semibold mb-3 text-gray-800">Delivery Address</h4>
                            <p className="text-gray-700">{order.shippingAddress.address}</p>
                            <p className="text-gray-700">
                                {order.shippingAddress.city}, {order.shippingAddress.country}
                            </p>
                            <p className="text-gray-700">Phone: {order.shippingAddress.phone}</p>
                            <p className="text-gray-700">Zipcode: {order.shippingAddress.zipcode}</p>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default OrderHistory;


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getOrderHistory } from "../../../redux/slices/orderSlice";
// import Loader from "../../components/Loader/Loader";

// const OrderHistory = () => {
//   const dispatch = useDispatch();
//   const { loading, orders, error } = useSelector((state) => state.order);

//   useEffect(() => {
//     dispatch(getOrderHistory());
//   }, [dispatch]);

//   // Get today’s date in YYYY-MM-DD format
//   const today = new Date().toISOString().split("T")[0];

//   // Filter orders to only include today's
//   const todayOrders = orders?.filter((order) => {
//     const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
//     return orderDate === today;
//   });

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-48 text-xl text-gray-600">
//         <Loader />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-600 mt-10 min-h-screen text-3xl">
//         {error}
//       </div>
//     );
//   }

//   if (!todayOrders || todayOrders.length === 0) {
//     return (
//       <div className="text-center text-gray-700 mt-10 text-lg min-h-screen">
//         No orders found for today.
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-12">
//       <h1 className="text-3xl md:text-4xl font-bold text-center text-emerald-700 mb-10">
//         Orders Placed Today
//       </h1>

//       {todayOrders.map((order) => (
//         <div
//           key={order._id}
//           className="bg-white p-6 md:p-8 mb-8 rounded-lg shadow-xl hover:shadow-md transition-shadow"
//         >
//           {/* Order Header */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
//             <div>
//               <h2 className="text-lg md:text-xl font-semibold text-gray-800">
//                 Order ID: {order._id}
//               </h2>
//               <p className="text-gray-500 text-sm">
//                 Order Date: {new Date(order.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//             <div className="text-sm text-gray-700">
//               <p className="text-emerald-700 font-medium">
//                 Estimated Delivery:{" "}
//                 {new Date(
//                   new Date(order.createdAt).setDate(
//                     new Date(order.createdAt).getDate() + 10
//                   )
//                 ).toLocaleDateString()}
//               </p>
//             </div>
//           </div>

//           {/* Items List */}
//           <div className="space-y-6 mb-8">
//             {order.items.map((item) => (
//               <div
//                 key={item.productId}
//                 className="flex flex-col sm:flex-row items-center border-b pb-4 last:border-b-0 last:pb-0"
//               >
//                 <div className="w-full sm:w-1/4 flex justify-center sm:justify-start mb-4 sm:mb-0">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-md"
//                   />
//                 </div>
//                 <div className="w-full sm:w-2/4 px-4 text-center sm:text-left">
//                   <h4 className="text-md font-semibold text-gray-800">
//                     {item.title || "Unknown Product"}
//                   </h4>
//                 </div>
//                 <div className="w-full sm:w-1/4 text-right">
//                   <p className="text-md font-semibold text-gray-900">
//                     ₹ {item.price?.toFixed(2) || "0.00"}
//                   </p>
//                   <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Payment & Address Info */}
//           <div className="flex flex-col md:flex-row justify-between border-t pt-6 gap-6">
//             {/* Payment Info */}
//             <div className="md:w-1/3 text-left">
//               <h4 className="text-lg font-semibold mb-3 text-gray-800">Payment</h4>
//               <p className="text-gray-700">Type: {order.paymentDetails?.type || "N/A"}</p>
//               <p className="text-gray-700">Status: {order.paymentDetails?.status || "N/A"}</p>
//               <p className="text-gray-700 font-semibold mt-2">
//                 Amount: ₹ {order.paymentDetails?.amountInINR?.toFixed(2) || "0.00"}
//               </p>
//             </div>

//             {/* Empty spacer */}
//             <div className="hidden md:block md:w-1/3" />

//             {/* Delivery Address */}
//             <div className="md:w-1/3 text-left md:text-right">
//               <h4 className="text-lg font-semibold mb-3 text-gray-800">Delivery Address</h4>
//               <p className="text-gray-700">{order.shippingAddress?.address}</p>
//               <p className="text-gray-700">
//                 {order.shippingAddress?.city}, {order.shippingAddress?.country}
//               </p>
//               <p className="text-gray-700">Phone: {order.shippingAddress?.phone}</p>
//               <p className="text-gray-700">Zipcode: {order.shippingAddress?.zipcode}</p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrderHistory;
