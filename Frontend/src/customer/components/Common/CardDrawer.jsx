import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Divider } from '@mui/material';
import CartContent from '../Cart/CartContent';
import { useNavigate } from 'react-router-dom';

function CardDrawer({ drawOpen , handleToggleCardDrawer }) {

    const navigate = useNavigate();

    const handleCheckout = () =>{
        handleToggleCardDrawer();
        navigate("/checkout");
    }

  
    return (
        <>
            <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] min-h-screen bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50
         ${drawOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className='flex justify-end p-4'>
                    <button onClick={handleToggleCardDrawer}>
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                </div>
                {/* Card content */}

                <div className='flex-grow p-4 overflow-y-auto'>
                    <h2 className='text-[20px] font-bold mb-4'>Your Cart</h2>
                    <Divider sx={{ bgcolor: 'black', my: 2 }} />
                    {/*work on card content */}
                    <CartContent/>

                </div>
                {/* checkout button */}
                <div className='p-4 bg-white sticky bottom-0'>
                    <button onClick={handleCheckout} className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'>Checkout</button>
                    <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>Shipping, Taxes, and discount codes calculated at Checkout.</p>

                </div>

            </div>
        </>
    )
}

export default CardDrawer;