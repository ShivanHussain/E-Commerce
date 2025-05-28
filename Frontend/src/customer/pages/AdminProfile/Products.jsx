import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, deleteProduct } from '../../../redux/slices/productSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products = [], loading, error } = useSelector((state) => state.product || {});

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
         dispatch(deleteProduct(id));
        toast.success('Product deleted successfully');
        dispatch(getAllProducts()); // Refresh list after delete
      } catch {
        toast.error('Failed to delete product');
      }
    }
  };


  const handleEdit = (id) => {
    navigate(`/admin/editproduct/${id}`);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Product Management</h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-center font-medium">{error}</p>
        )}

        {/* Product Table for Desktop */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse table-fixed">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="w-20 px-6 py-4 text-left text-sm font-semibold text-gray-700">Image</th>
                    <th className="w-1/3 px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="w-24 px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                    <th className="w-1/4 px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="w-32 px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(({ _id, image, title, price, category }) => (
                    <tr
                      key={_id}
                      className="border-b hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 text-left">
                        <img
                          src={image?.url || '/default.jpg'}
                          alt={title}
                          className="w-16 h-16 object-cover rounded-md shadow-sm"
                        />
                      </td>
                      <td className="px-6 py-4 text-left font-medium text-gray-900">{title}</td>
                      <td className="px-6 py-4 text-left text-gray-700">₹{price}</td>
                      <td className="px-6 py-4 text-left text-gray-700">{category}</td>
                      <td className="px-6 py-4 text-left space-x-2">
                        <button
                          onClick={() => handleEdit(_id)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded shadow-sm transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(_id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded shadow-sm transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Product Cards for Mobile */}
            <div className="md:hidden space-y-6 mt-6">
              {products.map(({ _id, image, title, price, category }) => (
                <div
                  key={_id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <img
                    src={image?.url || '/default.jpg'}
                    alt={title}
                    className="w-28 h-28 object-cover rounded-md mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-700 mb-1">
                    Price: <span className="font-medium">₹{price}</span>
                  </p>
                  <p className="text-gray-700 mb-3">
                    Category: <span className="font-medium">{category}</span>
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(_id )}
                      className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded py-2 shadow-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(_id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded py-2 shadow-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* No Products Found */}
        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-600 py-12">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
