import React from 'react';
import { useEffect } from 'react';
import { getAllProducts } from '../../../redux/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';



export default function Books() {


  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading === true) {
    return <div className="text-center py-10 text-xl font-semibold"><Loader /></div>;
  }

  return (
    <div className="bg-white min-h-screen text-white mb-8">

      {/* Cards */}
      {loading ? (
        <div className="text-center py-10 text-xl font-semibold"><Loader /></div>
      ) : error ? (
        <div className="text-center py-10 text-red-600 font-semibold">Error: {error}</div>

      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {products
            .filter((product) => product.category === 'Book')
            .map((product) => (
              <Link to={`/product/${product._id}`}
                key={product.id}
                className="bg-[#3E2C50] rounded-lg shadow-md p-4 hover:-translate-y-2 hover:bg-pink-400 hover:text-black transition-transform duration-300"
              >
                <img
                  src={product.image.url}
                  alt={product.title}
                  className="w-[125px] h-[200px] mx-auto rounded-lg mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-100 group-hover:text-black line-clamp-1">{product.title}</h3>
                <p className="text-yellow-400 text-sm mt-1 line-clamp-2">{product.description}</p>
                <p className="text-cyan-300 font-bold mt-2">₹{product.price}</p>
              </Link>
            ))}

        </div>

      )}

    </div>
  );
}
