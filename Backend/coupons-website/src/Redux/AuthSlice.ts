import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginReponseModel } from "../Models/LoginResponseModel";

const loadUserFromLocalStorage = () => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : { token: "", id: 0, email: "", name: "",  clientType: "" };
  };
  
  interface AuthState {
    user: LoginReponseModel;
  }

  const initialState: AuthState = {
    user: loadUserFromLocalStorage(),

  };
  
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      login(state, action: PayloadAction<LoginReponseModel>) {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      },
      logout(state) {
        state.user = { token: "", id: 0, email: "", name: "",  clientType: "" };
        localStorage.removeItem("user");
      },
    },
  });
  
  export const { login, logout } = authSlice.actions;
  export const authReducer = authSlice.reducer;
  export type { AuthState };
