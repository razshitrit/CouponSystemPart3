import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CompanyModel } from "../Models/CompanyModel";
import { CustomerModel } from "../Models/CustomerModel";


  
  interface AdminState {
    companies: CompanyModel[];
    customers: CustomerModel[]
  }
  
  // Initialize user data by calling loadUserFromLocalStorage
  const initialState: AdminState = {
    companies: [],
    customers: []
  };
  
  const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
      getCompanies(state, action: PayloadAction<CompanyModel[]>) {
        state.companies = action.payload;
      },

      addCompany(state, action: PayloadAction<CompanyModel>) {
        state.companies.push(action.payload);
      },

      updateCompany(state, action: PayloadAction<CompanyModel>) {
        const index = state.companies.findIndex(company => company.id === action.payload.id);
        if (index !== -1) {
          state.companies[index] = action.payload;
        }
      },

      deleteCompany(state, action: PayloadAction<number>) {
        state.companies = state.companies.filter(company => company.id !== action.payload);
      },

      getCustomers(state, action: PayloadAction<CustomerModel[]>) {
        state.customers = action.payload;
      },

      addCustomer(state, action: PayloadAction<CustomerModel>) {
        state.customers.push(action.payload);
      },

      updateCustomer(state, action: PayloadAction<CustomerModel>) {
        const index = state.customers.findIndex(customer => customer.id === action.payload.id);
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
      },

      deleteCustomer(state, action: PayloadAction<number>) {
        state.customers = state.customers.filter(customer => customer.id !== action.payload);
      },

      adminClearAll(state) {
        state.customers = [];
        state.companies = [];
      }
    },
  });
  
  export const { getCompanies, addCompany, updateCompany, deleteCompany, getCustomers, addCustomer, updateCustomer, deleteCustomer, adminClearAll } = adminSlice.actions;
  export const adminReducer = adminSlice.reducer;
  export type { AdminState };
