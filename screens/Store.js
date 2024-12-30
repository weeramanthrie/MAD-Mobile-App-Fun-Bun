import { createSlice, configureStore } from '@reduxjs/toolkit';

// Create a slice for managing the item count
const itemCountSlice = createSlice({
  name: 'itemCount',
  initialState: {
    itemCount: 0,
  },
  reducers: {
    setItemCount: (state, action) => {
      state.itemCount = action.payload;
    },
  },
});

// Create a slice for managing user authentication
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    password: '',
    isAuthenticated: false,
  },
  reducers: {
    setUserCredentials: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    setAuthenticationStatus: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.username = '';
      state.password = '';
      state.isAuthenticated = false;
    },
  },
});

// Export the actions from the slices
export const { setItemCount } = itemCountSlice.actions;
export const { setUserCredentials, setAuthenticationStatus, logout } = authSlice.actions;

// Configure the Redux store
const store = configureStore({
  reducer: {
    itemCount: itemCountSlice.reducer,
    auth: authSlice.reducer, // Add the auth slice to the Redux store
  },
});

export default store;
