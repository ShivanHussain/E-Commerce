import React from 'react';

const recentOrders = [
    { orderId: 'ORD1234561', user: 'John Doe', totalPrice: 1500, status: 'Delivered' },
    { orderId: 'ORD1234562', user: 'Jane Smith', totalPrice: 999, status: 'Pending' },
    { orderId: 'ORD1234563', user: 'Alice Brown', totalPrice: 1250, status: 'Shipped' },
];

function AdminLayout() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
           

            {/* Main Content */}
            <main className="flex-1 p-6 space-y-8">
                {/* Metrics */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow text-center">
                        <h3 className="text-lg font-semibold">Revenue</h3>
                        <p className="text-2xl font-bold">₹50,000</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow text-center">
                        <h3 className="text-lg font-semibold">Total Orders</h3>
                        <p className="text-2xl font-bold">123</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow text-center">
                        <h3 className="text-lg font-semibold">Total Products</h3>
                        <p className="text-2xl font-bold">87</p>
                    </div>
                </section>

                {/* Recent Orders */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="min-w-full text-sm text-left text-gray-700">
                            <thead className="bg-gray-200 text-gray-800">
                                <tr>
                                    <th className="py-3 px-4">Order ID</th>
                                    <th className="py-3 px-4">User</th>
                                    <th className="py-3 px-4">Total Price</th>
                                    <th className="py-3 px-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.orderId} className="border-t">
                                        <td className="py-3 px-4 font-medium">{order.orderId}</td>
                                        <td className="py-3 px-4">{order.user}</td>
                                        <td className="py-3 px-4">₹{order.totalPrice}</td>
                                        <td className="py-3 px-4">
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default AdminLayout;
