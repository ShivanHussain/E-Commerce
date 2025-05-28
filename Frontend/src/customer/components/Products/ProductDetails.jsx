import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../../redux/slices/productSlice';
import { toast } from 'react-toastify';
import { addToCart, clearCartErrors, clearCartMessages } from '../../../redux/slices/cartSlice';
import Loader from '../Loader/Loader';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { product, loading: productLoading, error: productError } = useSelector((state) => state.product);
    
    const { user } = useSelector((state) => state.user);

    const { message: cartMessage, error: cartError, loading: cartLoading } = useSelector((state) => state.cart);

    const [hasAdded, setHasAdded] = useState(false);

    useEffect(() => {
        dispatch(getProductById(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (cartMessage && hasAdded) {
            toast.success(cartMessage);
            setHasAdded(false);
            dispatch(clearCartMessages());
            navigate("/store");
        }
    }, [cartMessage, dispatch, navigate, hasAdded]);

    useEffect(() => {
        if (cartError) {
            toast.error(cartError);
            dispatch(clearCartErrors());
            setHasAdded(false);
        }
    }, [cartError, dispatch]);

    const handleAddToCart = () => {
        if (!user?._id) {
            toast.error("Please login to add items to cart");
            return;
        }
        if (product.stock <= 0) {
            toast.error('This product is currently out of stock.');
            return;
        }
        setHasAdded(true);
        dispatch(addToCart({ userId: user._id, productID: product._id }));
    };

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
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0 || cartLoading}
                            className={`mt-4 w-full bg-black text-white py-3 rounded-lg text-center font-medium transition duration-300 hover:bg-gray-800 
                            ${product.stock <= 0 || cartLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {cartLoading ? 'Adding...' : product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
