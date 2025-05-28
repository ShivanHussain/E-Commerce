/* eslint-disable no-self-assign */
/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    users: [],
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdated: false,
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.error = null;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.message = null;
      state.error = action.payload;
    },
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
    loadUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    getAllUsersRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAllUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    },
    getAllUsersFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess(state, action) {
      state.loading = false;
      state.users = state.users.filter(user => user._id !== action.payload);
      state.message = "User deleted successfully";
    },
    deleteUserFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getUserByIdRequest(state) {
      state.loading = true;
      state.error = null;
    },

    getUserByIdSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },

    getUserByIdFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearAllErrors(state, action) {
      state.error = null;
      state.message = null;
    },
  },
});

// Register user
export const register = (formData) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const { data } = await axios.post(
      'http://localhost:9000/api/v1/user/register',
      formData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      }
    );

    // Save user and token
    localStorage.setItem("user", JSON.stringify(data.data));
    localStorage.setItem("token", data.token);

    dispatch(userSlice.actions.registerSuccess({
      user: data.data,
      message: data.message,
    }));
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Register failed';
    dispatch(userSlice.actions.registerFailed(message));
  }
};





//login user 
export const login = (email, password) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:9000/api/v1/user/login",
      { email, password },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    // Save user and token in localStorage
    localStorage.setItem("user", JSON.stringify(data.data));
    localStorage.setItem("token", data.token);

    dispatch(userSlice.actions.loginSuccess(data.data)); 
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Login failed';
    dispatch(userSlice.actions.loginFailed(message));
  }
};



// Get user profile
export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.loadUserRequest());
  const token = localStorage.getItem("token");

  try {
    const { data } = await axios.get("http://localhost:9000/api/v1/user/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    dispatch(userSlice.actions.loadUserSuccess(data.data));// Assuming data.data is the user object
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to load user';
    dispatch(userSlice.actions.loadUserFailed(message));
  }
};


// Logout user
export const logout = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.get(
      "http://localhost:9000/api/v1/user/logout",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      }
    );


    //Clear token and user from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(userSlice.actions.logoutSuccess(data.message));
    dispatch(clearAllUserErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.logoutFailed(
        error.response?.data?.message || "Logout failed"
      )
    );
  }
};


//get all users
export const getAllUsers = () => async (dispatch) => {
  dispatch(userSlice.actions.getAllUsersRequest());
  const token = localStorage.getItem("token");

  try {
    const { data } = await axios.get("http://localhost:9000/api/v1/user/admin/getuser", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    dispatch(userSlice.actions.getAllUsersSuccess(data.users));
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to get users";
    dispatch(userSlice.actions.getAllUsersFailed(message));
  }
};

// Delete user by ID
export const deleteUser = (userId) => async (dispatch) => {
  dispatch(userSlice.actions.deleteUserRequest());
  const token = localStorage.getItem("token");

  try {
    const { data } = await axios.delete(
      `http://localhost:9000/api/v1/user/admin/deleteuser/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    dispatch(userSlice.actions.deleteUserSuccess(userId));
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Delete user failed";
    dispatch(userSlice.actions.deleteUserFailed(message));
  }
};


export const getUserById = (userId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch(userSlice.actions.getUserByIdRequest());
  

  try {
    const { data } = await axios.get(
      `http://localhost:9000/api/v1/user/admin/user/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    dispatch(userSlice.actions.getUserByIdSuccess(data.user));
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Failed to get user by ID";
    dispatch(userSlice.actions.getUserByIdFailed(message));
  }
};



export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};


export const {
  registerRequest,
  registerSuccess,
  registerFailed,
  loginRequest,
  loginSuccess,
  loginFailed,
  logoutSuccess,
  logoutFailed,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailed,
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFailed,
  clearAllErrors,
} = userSlice.actions;

export default userSlice.reducer;





