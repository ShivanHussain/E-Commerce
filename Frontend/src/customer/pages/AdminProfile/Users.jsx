
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser } from '../../../redux/slices/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                dispatch(deleteUser(id)).unwrap();
                toast.success("User deleted successfully");
            } catch (err) {
                toast.error(err || "Failed to delete user");
            }
        }
    };

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8 mb-8">
                <h1 className="text-3xl font-bold mb-8 text-left">User Management</h1>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">All Users</h2>

                    {loading && <p className="text-blue-500">Loading users...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}

                    {/* Desktop Table */}
                    <div className="hidden md:block">
                        <table className="w-full table-auto border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Role</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user) => (
                                    <tr key={user._id} className="border-t text-left">
                                        <td className="px-4 py-4">{user._id}</td>
                                        <td className="px-4 py-4">{user.name}</td>
                                        <td className="px-4 py-4">{user.email}</td>
                                        <td className="px-4 py-4 capitalize">{user.role}</td>
                                        <td className="px-4 py-4">
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="text-red-600 hover:text-red-800 font-medium"
                                            >
                                                DELETE
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden space-y-4">
                        {users?.map((user) => (
                            <div key={user._id} className="border rounded-lg p-4 space-y-2 shadow-sm bg-gray-50">
                                <div><span className="font-semibold">ID:</span> {user._id}</div>
                                <div><span className="font-semibold">Name:</span> {user.name}</div>
                                <div><span className="font-semibold">Email:</span> {user.email}</div>
                                <div><span className="font-semibold">Role:</span> <span className="capitalize">{user.role}</span></div>
                                <div>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="text-red-600 hover:text-red-800 font-medium"
                                    >
                                        DELETE
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Users;

