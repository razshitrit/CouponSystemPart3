// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './AuthSlice';
import type { AuthState } from './AuthSlice';
import { adminReducer, AdminState } from './AdminSlice';
import { customerReducer, CustomerState } from './CustomerSlice';
import { companyReducer, CompanyState } from './CompanySlice';

const rootReducer = {
    auth: authReducer,
    admin: adminReducer,
    company: companyReducer,
    customer: customerReducer
};

const store = configureStore({
    reducer: rootReducer
});

export type RootState = {
    auth: AuthState;
    admin: AdminState;
    company: CompanyState;
    customer: CustomerState;
};

export default store;
