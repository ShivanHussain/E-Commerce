// orderSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    orders: [],
    order: null,
    message: null,
    error: null,
  },
  reducers: {
    placeOrderRequest(state) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    placeOrderSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    placeOrderFailed(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },
    getOrderHistoryRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getOrderHistorySuccess(state, action) {
      state.loading = false;
      state.orders = action.payload;
      state.error = null;
    },
    getOrderHistoryFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getOrderByIdRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.order = null;
    },
    getOrderByIdSuccess(state, action) {
      state.loading = false;
      state.order = action.payload;
      state.error = null;
    },
    getOrderByIdFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.order = null;
    },
    getAllOrdersRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getAllOrdersSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload;
      state.error = null;
    },
    getAllOrdersFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderStatusRequest(state) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    updateOrderStatusSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;

      // Optionally update the order in orders array if present
      const updatedOrder = action.payload.order;
      if (state.orders.length > 0) {
        const index = state.orders.findIndex(o => o._id === updatedOrder._id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      }

      // Also update the single order if loaded
      if (state.order && state.order._id === updatedOrder._id) {
        state.order = updatedOrder;
      }
    },
    updateOrderStatusFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },



    clearOrderMessages(state) {
      state.message = null;
      state.error = null;
    },
  },
});

// Action creators for placing an order 
export const placeOrder = (orderData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch(placeOrderRequest());
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!userId) {
      throw new Error("User not found in localStorage");
    }

    // Send orderData directly, not as { product: orderData }
    const { data } = await axios.post(
      "http://localhost:9000/api/v1/order/place",
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
          id: userId,
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    dispatch(placeOrderSuccess(data.message));
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to place order";
    dispatch(placeOrderFailed(message));
  }
};


// Action creators for getting order history
export const getOrderHistory = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch(orderSlice.actions.getOrderHistoryRequest());

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!userId) {
      throw new Error("User not found in localStorage");
    }

    const { data } = await axios.get(
      "http://localhost:9000/api/v1/order/get",
      {
        headers: {
          id: userId,
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    dispatch(orderSlice.actions.getOrderHistorySuccess(data.orders));
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to get order history";
    dispatch(orderSlice.actions.getOrderHistoryFailed(message));
  }
};

// Action creators for getting order by ID
export const getOrderById = (orderId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch(orderSlice.actions.getOrderByIdRequest());

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!userId) {
      throw new Error("User not found in localStorage");
    }

    const { data } = await axios.get(
      `http://localhost:9000/api/v1/order/getby/${orderId}`,
      {
        headers: {
          id: userId,
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    dispatch(orderSlice.actions.getOrderByIdSuccess(data.order));
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to fetch order";
    dispatch(orderSlice.actions.getOrderByIdFailed(message));
  }
};




// Action creators for getting all orders
export const getAllOrders = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch(orderSlice.actions.getAllOrdersRequest());

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!userId) {
      throw new Error("User not found in localStorage");
    }

    const { data } = await axios.get(
      "http://localhost:9000/api/v1/order/get/all",
      {
        headers: {
          id: userId,
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    dispatch(orderSlice.actions.getAllOrdersSuccess(data.orders));
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Failed to get all orders";
    dispatch(orderSlice.actions.getAllOrdersFailed(message));
  }
};



export const orderUpdateStatus = (orderId, status) => async (dispatch) => {
  
  const token = localStorage.getItem("token");
  dispatch(orderSlice.actions.updateOrderStatusRequest());

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!userId) {
      throw new Error("User not found in localStorage");
    }

    const { data } = await axios.put(
      `http://localhost:9000/api/v1/order/change-status/${orderId}`, // Update URL as per your backend route
      { status }, // sending new status in body
      {
        headers: {
          id: userId,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(orderSlice.actions.updateOrderStatusSuccess(data));
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Failed to update order status";
    dispatch(orderSlice.actions.updateOrderStatusFailed(message));
  }
};





export const {
  placeOrderRequest,
  placeOrderSuccess,
  placeOrderFailed,
  getOrderHistoryFailed,
  getOrderHistoryRequest,
  getOrderHistorySuccess,
  getOrderByIdFailed,
  getOrderByIdRequest,
  getOrderByIdSuccess,
  clearOrderMessages,
} = orderSlice.actions;

export default orderSlice.reducer;
