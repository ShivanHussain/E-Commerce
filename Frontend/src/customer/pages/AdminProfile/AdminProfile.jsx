import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages } from '../../../redux/slices/contactSlice';

export default function AdminProfilePreview() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { messages, loading, error } = useSelector((state) => state.contact || {});

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const renderMessages = () => {
    if (loading) return <p className="text-gray-500">Loading messages...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (!Array.isArray(messages) || messages.length === 0)
      return <p className="text-gray-500">No messages found.</p>;

    return (
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {messages.map((msg) => (
          <div key={msg._id} className="border rounded-md p-4 shadow-sm bg-gray-50">
            <p><strong>Name:</strong> {msg.name}</p>
            <p><strong>Email:</strong> {msg.email}</p>
            <p><strong>Message:</strong> {msg.message}</p>
            <p className="text-sm text-gray-500">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-7xl p-10 flex flex-col md:flex-row gap-12">
        
        {/* Admin Profile Section */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-300 shadow-md mb-6">
            <img
              src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full space-y-4">
            <div className="border p-4 rounded-md">
              <label className="text-gray-600 font-medium block mb-1">Name</label>
              <p>{user?.name || "Not available"}</p>
            </div>
            <div className="border p-4 rounded-md">
              <label className="text-gray-600 font-medium block mb-1">Email</label>
              <p>{user?.email || "Not available"}</p>
            </div>
            <div className="border p-4 rounded-md">
              <label className="text-gray-600 font-medium block mb-1">Role</label>
              <p>{user?.role || "Not available"}</p>
            </div>
            <div className="border p-4 rounded-md">
              <label className="text-gray-600 font-medium block mb-1">Created At</label>
              <p>
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : "Not available"}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Messages Section */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Contact Messages</h2>
          {renderMessages()}
        </div>
      </div>
    </div>
  );
}
