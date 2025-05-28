/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    product: null,
    error: null,
    message: null,
  },
  reducers: {
    requestStart(state) {
      state.loading = true;
      state.error = null;
    },
    requestFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addProductSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    getAllProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },
    getProductByIdSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
    },
    deleteProductSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.products = state.products.filter(p => p._id !== action.payload.id);
    },
    searchProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },
    updateProductSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    clearProductMessage(state) {
      state.message = null;
    },
    clearProductError(state) {
      state.error = null;
    },
  },
});


//
export const addProduct = (formData) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.post(
      `http://localhost:9000/api/v1/product/add`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(addProductSuccess(data.message));
  } catch (error) {
    dispatch(requestFail(error.response?.data?.message || "Add product failed"));
  }
};


//
export const getAllProducts = () => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.get(`http://localhost:9000/api/v1/product/getAll`);
    dispatch(getAllProductsSuccess(data.product));
  } catch (error) {
    dispatch(requestFail(error.response?.data?.message || "Fetch failed"));
  }
};


//
export const getProductById = (id) => async (dispatch) => {
 
  dispatch(requestStart());
  try {
    const { data } = await axios.get(`http://localhost:9000/api/v1/product/get/${id}`);
    dispatch(getProductByIdSuccess(data.product));
  } catch (error) {
    dispatch(requestFail(error.response?.data?.message || "Product not found"));
    dispatch(clearProductError());
  }
};



export const deleteProduct = (id) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.delete(`http://localhost:9000/api/v1/product/delete/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(deleteProductSuccess({ id, message: data.message }));
  } catch (error) {
    dispatch(requestFail(error.response?.data?.message || "Delete failed"));
  }
};

export const searchProducts = (searchTerm) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.get(`http://localhost:9000/api/v1/product/?searchTerm=${searchTerm}`);
    dispatch(searchProductsSuccess(data.products));
  } catch (error) {
    dispatch(requestFail(error.response?.data?.message || "Search failed"));
  }
};



//
export const updateProduct = (id, formData) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.put(
      `http://localhost:9000/api/v1/product/update/${id}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(updateProductSuccess(data.message));
  } catch (error) {
    dispatch(requestFail(error.response?.data?.message || "Update failed"));
  }
};


// Clear Errors & Messages
export const clearProductErrors = () => (dispatch) => {
  dispatch(clearProductError());
};
export const clearProductMessages = () => (dispatch) => {
  dispatch(clearProductMessage());
};

export const {
  requestStart,
  requestFail,
  addProductSuccess,
  getAllProductsSuccess,
  getProductByIdSuccess,
  deleteProductSuccess,
  searchProductsSuccess,
  updateProductSuccess,
  clearProductError,
  clearProductMessage,
} = productSlice.actions;

export default productSlice.reducer;
