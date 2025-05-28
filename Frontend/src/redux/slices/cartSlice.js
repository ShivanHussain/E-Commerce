import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        loading: false,
        items: [],     // Array of full product objects
        error: null,
        message: null,
    },
    reducers: {
        cartRequestStart(state) {
            state.loading = true;
            state.error = null;
        },
        cartRequestFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getCartSuccess(state, action) {
            state.loading = false;
            state.items = action.payload; // full products array from backend
        },
        addToCartSuccess(state, action) {
            state.loading = false;
            state.message = action.payload.message;
            // Ideally, don't mutate items directly.
            // After adding, you should fetch the cart again.
        },
        removeFromCartSuccess(state, action) {
            state.loading = false;
            state.message = action.payload.message;
            // Same: after removing, fetch cart again instead of filtering locally
        },
        incrementQuantity: (state, action) => {
            const item = state.items.find((item) => item._id === action.payload);
            if (item) item.quantity += 1;
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find((item) => item._id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        clearCartError(state) {
            state.error = null;
        },
        clearCartMessage(state) {
            state.message = null;
        },
    },
});

export const {
    cartRequestStart,
    cartRequestFail,
    getCartSuccess,
    addToCartSuccess,
    removeFromCartSuccess,
    clearCartError,
    clearCartMessage,
} = cartSlice.actions;


// Action creators for get cart items
export const getCartItems = (userId) => async (dispatch) => {
    dispatch(cartRequestStart());
    try {
        const { data } = await axios.get("http://localhost:9000/api/v1/cart/", {
            headers: {
                id: userId,
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch(getCartSuccess(data.cart));
    } catch (error) {
        dispatch(cartRequestFail(error.response?.data?.message || "Failed to fetch cart items"));
    }
};

export const addToCart = ({ userId, productID }) => async (dispatch) => {
    dispatch(cartRequestStart());
    try {
        const { data } = await axios.post(
            "http://localhost:9000/api/v1/cart/add",
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    id: userId,
                    productID,
                },
            }
        );
        dispatch(addToCartSuccess({ productID, message: data.message }));
        // After adding, refresh cart
        dispatch(getCartItems(userId));
    } catch (error) {
        dispatch(cartRequestFail(error.response?.data?.message || "Failed to add product to cart"));
    }
};

export const removeFromCart = ({ userId, productID }) => async (dispatch) => {
    dispatch(cartRequestStart());
    try {
        const { data } = await axios.delete(`http://localhost:9000/api/v1/cart/remove/${productID}`, {
            headers: {
                id: userId,
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch(removeFromCartSuccess({ productID, message: data.message }));
        // After removing, refresh cart
        dispatch(getCartItems(userId));
    } catch (error) {
        dispatch(cartRequestFail(error.response?.data?.message || "Failed to remove product from cart"));
    }
};

// Clear error and message
export const clearCartErrors = () => (dispatch) => {
    dispatch(clearCartError());
};

export const clearCartMessages = () => (dispatch) => {
    dispatch(clearCartMessage());
};



export const { incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
