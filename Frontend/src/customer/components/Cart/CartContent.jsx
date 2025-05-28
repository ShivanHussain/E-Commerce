import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCartItems, removeFromCart } from '../../../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

function CartContent() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { items, loading, error } = useSelector(state => state.cart);

  useEffect(() => {
    if (user?._id) {
      dispatch(getCartItems(user._id));
    }
  }, [dispatch, user?._id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleRemove = (productID) => {
    if (!user?._id) {
      toast.error("User not logged in");
      return;
    }
    dispatch(removeFromCart({ userId: user._id, productID }))
      .then(() => toast.success("Item removed from cart"))
      .catch(() => toast.error("Failed to remove item from cart"));
  };

  // Calculate total price
  const totalPrice = (items ?? []).reduce(
  (acc, item) => acc + item.price * (item.quantity || 1),
  0
);


  if (loading) return <><Loader/></>;
  if (!items?.length) return <p className="text-center mt-10">Your cart is empty.</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Cart items container with scroll */}
      <main className="flex-grow overflow-y-auto max-h-[75vh] p-6">
        {items.map(item => (
          <div key={item._id} className="flex items-center justify-between py-4 border-b border-gray-600">
            
            {/* Image */}
            <div className="w-24 flex-shrink-0">
              <img 
                src={item.image.url} 
                alt={item.title} 
                className="w-full h-24 object-cover rounded"
              />
            </div>

            {/* Title + Category */}
            <div className="flex-grow px-6 flex flex-col justify-center">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="mt-2 text-gray-600 italic">Category: {item.category || 'N/A'}</p>
            </div>

            {/* Price + Delete */}
            <div className="w-32 flex flex-col items-end justify-center space-y-3">
              <p className="font-semibold text-lg text-gray-900">
                &#8377; {(item.price * (item.quantity || 1)).toLocaleString()}
              </p>
              <button
                onClick={() => handleRemove(item._id)}
                title="Remove from cart"
                className="text-red-600 hover:text-red-800"
              >
                <DeleteIcon className="h-6 w-6" />
              </button>
            </div>

          </div>
        ))}
      </main>

      {/* Footer with total and checkout */}
      <footer className="bg-white shadow p-6 flex justify-between items-center">
        <div>
          <span className="text-xl font-semibold">Total: </span>
          <span className="text-xl font-bold">&#8377; {totalPrice.toLocaleString()}</span>
        </div>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
          onClick={() => toast.info('Checkout not implemented yet')}
        >
          Checkout
        </button>
      </footer>
    </div>
  );
}

export default CartContent;
