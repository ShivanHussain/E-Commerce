import React from 'react';
import ProductGrid from '../../components/Products/ProductGrid';
import { useEffect } from 'react';
import { getAllProducts } from '../../../redux/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';



function Store() {

    const dispatch = useDispatch();

    const { products, loading, error } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    if(loading === true) {
        return <div className="text-center py-10 text-xl font-semibold"><Loader/></div>;
    }


    return (
        <>
            <div className='p-4 mb-8 min-h-screen'>
                {loading ? (
                    <div className="text-center py-10 text-xl font-semibold"><Loader/></div>
                ) : error ? (
                    <div className="text-center py-10 text-red-600 font-semibold">Error: {error}</div>
                ) : (

                    <ProductGrid products={products} />


                )}

            </div>
        </>
    )
}

export default Store;