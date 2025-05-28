import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../../redux/slices/productSlice';
import Loader from '../../components/Loader/Loader';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { product, loading: productLoading, error: productError } = useSelector((state) => state.product);


    useEffect(() => {
        dispatch(getProductById(id));
    }, [id, dispatch]);

    if (productLoading) return <Loader />;
    if (productError) return <p className="text-center text-red-600">{productError}</p>;
    if (!product) return null;

    return (
        <div className="mt-8 max-w-6xl mx-auto px-4 py-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-10">
                <div className="md:w-1/2 w-full flex justify-center items-center">
                    <img
                        src={product.image?.url}
                        alt={product.title}
                        className="w-full max-w-[400px] h-[400px] object-contain rounded-md border"
                    />
                </div>

                <div className="md:w-1/2 w-full flex flex-col justify-between space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{product.title}</h1>

                        <p className="text-lg text-gray-600 mb-4 leading-relaxed text-center">{product.description}</p>

                        <div className="flex flex-col items-center space-y-2 mt-6">
                            <span className="text-2xl font-semibold text-green-600">₹{product.price}</span>
                            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">{product.category}</span>
                        </div>

                        <p className="mt-4 text-sm text-gray-600 text-center">
                            Available Stock: <span className="font-medium">{product.stock}</span>
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Link to="/"
                            className={`mt-4 w-full bg-black text-white py-3 rounded-lg text-center 
                                font-medium transition duration-300 hover:bg-gray-800 `}
                        >
                            Back To Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
