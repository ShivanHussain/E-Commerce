// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// import ProductGrid from '../../components/Products/ProductGrid';
// import { getAllProducts } from '../../../redux/slices/productSlice';

// function HomePage() {
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state) => state.product);

//   useEffect(() => {
//     dispatch(getAllProducts());
//   }, [dispatch]);

//   return (
//     <>
//       {/* Hero Section */}
//       <div
//         className="w-full h-[250px] sm:h-[400px] md:h-[500px] bg-center bg-cover p-6 sm:p-10 md:p-12"
//         style={{ backgroundImage: "url('/homeimage.png')" }}
//       />

//       {/* Product Content */}
//       {loading ? (
//         <div className="text-center py-10 text-xl font-semibold">Loading products...</div>
//       ) : error ? (
//         <div className="text-center py-10 text-red-600 font-semibold">Error: {error}</div>
//       ) : (
//         <ProductGrid products={products} />
//       )}

//       {/* Show Items Button */}
//       <div className="flex justify-center mt-10 mb-12">
//         <Link
//           to="/store"
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
//         >
//           Show All Items
//         </Link>
//       </div>
//     </>
//   );
// }

// export default HomePage;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ProductGrid from '../../components/Products/ProductGrid';
import { getAllProducts } from '../../../redux/slices/productSlice';
import Loader from '../../components/Loader/Loader';

function HomePage() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      {/* Hero Section */}
      <div
        className="w-full h-[250px] sm:h-[400px] md:h-[500px] bg-center bg-cover flex items-center justify-center text-white text-center"
        style={{ backgroundImage: "url('/homeimage.png')" }}
      >
        <div className="bg-black bg-opacity-50 p-4 rounded-md max-w-lg">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2">Welcome to Our Store</h1>
          <p className="text-sm sm:text-lg">
            Your go-to destination for top-notch stationery and printing products.
          </p>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        {loading ? (
        <><Loader/></>
        ) : error ? (
          <div className="text-center text-red-600 font-semibold text-lg py-10">
            Error: {error}
          </div>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center">Featured Products</h2>
            <ProductGrid products={products} />
          </>
        )}

        {/* Show All Items Button */}
        {!loading && !error && (
          <div className="flex justify-center mt-10">
            <Link
              to="/store"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
            >
              Show All Items
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;

