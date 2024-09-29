import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginReponseModel } from "../Models/LoginResponseModel";

// Function to load user data from local storage
const loadUserFromLocalStorage = () => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : { token: "", id: 0, email: "", name: "",  clientType: "" };
  };
  
  interface AuthState {
    user: LoginReponseModel;
  }
  
  // Initialize user data by calling loadUserFromLocalStorage
  const initialState: AuthState = {
    user: loadUserFromLocalStorage(),

  };
  
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      login(state, action: PayloadAction<LoginReponseModel>) {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // Save user data to local storage
      },
      logout(state) {
        state.user = { token: "", id: 0, email: "", name: "",  clientType: "" };
        localStorage.removeItem("user"); // Remove user data from local storage
      },
    },
  });
  
  export const { login, logout } = authSlice.actions;
  export const authReducer = authSlice.reducer;
  export type { AuthState };
