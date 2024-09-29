import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CompanyModel } from "../Models/CompanyModel";
import { CustomerModel } from "../Models/CustomerModel";
import { CouponModel } from "../Models/CouponModel";


  
  interface CompanyState {
    coupons: CouponModel[];
  }
  
  // Initialize user data by calling loadUserFromLocalStorage
  const initialState: CompanyState = {
    coupons: [],
  };
  
  const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
      getCoupons(state, action: PayloadAction<CouponModel[]>) {
        state.coupons = action.payload;
      },

      addCoupon(state, action: PayloadAction<CouponModel>) {
        state.coupons.push(action.payload);
      },

      updateCoupon(state, action: PayloadAction<CouponModel>) {
        const index = state.coupons.findIndex(company => company.id === action.payload.id);
        if (index !== -1) {
          state.coupons[index] = action.payload;
        }
      },

      deleteCoupon(state, action: PayloadAction<number>) {
        state.coupons = state.coupons.filter(company => company.id !== action.payload);
      },

      companyClearAll(state) {
        state.coupons = [];
      }
    },
  });
  
  export const { getCoupons, addCoupon, updateCoupon, deleteCoupon, companyClearAll } = companySlice.actions;
  export const companyReducer = companySlice.reducer;
  export type { CompanyState };
