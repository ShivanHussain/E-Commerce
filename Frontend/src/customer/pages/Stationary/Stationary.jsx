import React from 'react';
import { useEffect } from 'react';
import { getAllProducts } from '../../../redux/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';

export default function Stationary() {


  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading === true) {
    return <div className="text-center py-10 text-xl font-semibold"><Loader /></div>;
  }
  return (
    <div className="bg-white min-h-screen mb-8">
      {/* Cards Grid */}
      {loading ? (
        <div className="text-center py-10 text-xl font-semibold"><Loader /></div>
      ) : error ? (
        <div className="text-center py-10 text-red-600 font-semibold">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 ">
          {products
            .filter((item) => item.category === 'Art' || item.category === 'Stationary')
            .map((item) => (


              <Link to={`/product/${item._id}`} key={item._id} className="bg-white rounded-lg shadow-md hover:-translate-y-6 overflow-hidden transition-transform p-4  hover:bg-green-200 text-center border border-black">
                <img src={item.image.url} alt={item.title} className="h-48 w-full object-cover rounded-md mb-4" />
                <h3 className="text-lg font-semibold mb-2 line-clamp-1">{item.title}</h3>
                <p className="text-pink-600 font-bold mt-2">₹{item.price}</p>
              </Link>
            ))}
        </div>

      )}

    </div>
  );
}
