import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  messages: [],
  error: null,
  success: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    requestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    requestSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    requestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { requestStart, requestSuccess, requestFail, setMessages } = contactSlice.actions;

export const submitContactForm = (formData) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const response = await axios.post("http://localhost:9000/api/v1/contact/send", formData);
    dispatch(requestSuccess(response.data.message));
  } catch (error) {
    dispatch(requestFail(error.response?.data?.message || "Submission failed"));
  }
};

export const fetchMessages = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:9000/api/v1/contact/messages",{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    dispatch(setMessages(response.data.data));
  } catch (error) {
    dispatch(requestFail(error.response?.data?.message || "Failed to fetch messages"));
  }
};

export default contactSlice.reducer;
