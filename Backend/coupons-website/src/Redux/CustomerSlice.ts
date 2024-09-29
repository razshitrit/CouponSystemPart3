import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CouponModel } from "../Models/CouponModel";


  
  interface CustomerState {
    allCoupons: CouponModel[];
    myCoupons: CouponModel[];
  }
  
  // Initialize user data by calling loadUserFromLocalStorage
  const initialState: CustomerState = {
    allCoupons: [],
    myCoupons: [],
  };

  
  const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
      getAllCoupons(state, action: PayloadAction<CouponModel[]>) {
        state.allCoupons = action.payload;
      },

      getMyCoupons(state, action: PayloadAction<CouponModel[]>) {
        state.myCoupons = action.payload;
      },

      purchaseCoupon(state, action: PayloadAction<CouponModel>) {
        state.allCoupons = state.allCoupons.filter(
          (coupon) => coupon.id !== action.payload.id
        )
        state.myCoupons.push(action.payload);
      },

      customerClearAll(state) {
        state.allCoupons = [];
        state.myCoupons = [];
      }
    },
  });
  
  export const { getAllCoupons, getMyCoupons, purchaseCoupon, customerClearAll } = customerSlice.actions;
  export const customerReducer = customerSlice.reducer;
  export type { CustomerState };
