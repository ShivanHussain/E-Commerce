import React from 'react';
import { Link } from 'react-router-dom';

function ProductGrid({ products }) {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 md:px-10">
      {products.map((product, index) => (
        <Link to={`/product/${product._id}`} key={product._id} className="bg-white rounded-lg shadow-md hover:-translate-y-6 overflow-hidden transition-transform p-4  hover:bg-green-200 text-center border border-black">
          <img src={product.image.url} alt={product.title} className="h-48 w-full object-cover rounded-md mb-4" />
          <h3 className="text-lg font-semibold mb-2 line-clamp-1">{product.title}</h3>
          <p className="text-pink-600 font-bold mt-2">₹{product.price}</p>
        </Link>
      ))}
    </div>
  );
}

export default ProductGrid;
