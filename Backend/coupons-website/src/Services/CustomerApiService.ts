import axios from 'axios';
import globalUrlService from './GlobalUrlService';
import { CustomerModel } from '../Models/CustomerModel';
import { CouponModel } from '../Models/CouponModel';
import { Category } from '../Models/Category';
import axiosInterceptor from './AxiosInterceptor';

const BASE_URL = globalUrlService.getBaseUrl() + "api/customer/";
const axiosWithToken = axiosInterceptor;

export const purchaseCouponApi = async (couponId: number): Promise<void> => {
           const response = await axiosWithToken.post(`${BASE_URL}purchase/${couponId}`);
    
};

export const getCustomerCouponsApi = async ()=> {
   
        const response = await axiosWithToken.get(`${BASE_URL}coupons`);
        return response;
   
};

export const getCustomerCouponsByCategoryApi = async (category: Category) => {
    
        if (category !== null) {
            const response = await axiosWithToken.get(`${BASE_URL}coupons/${category}`);
            return response.data as CouponModel[];
        } else {
            return await getCustomerCouponsApi(); //to add a token to () -?
        }
    
};

export const getCustomerCouponsByMaxPriceApi = async (maxPrice: number) => {
    try {
        if (maxPrice != null) {
            const response = await axiosWithToken.get(`${BASE_URL}coupons/${maxPrice}`);
            return response.data as CouponModel[];
        } else {
            return await getCustomerCouponsApi(); //to add a token to () -?
        }
    } catch (error) {
        console.error('Error fetching coupons by max price:', error);
        return undefined;
    }
};

export const getCustomerDetails = async () => {
    try {
        const response = await axiosWithToken.get(`${BASE_URL}details`);
        return response.data as CustomerModel;
    } catch (error) {
        console.error('Error fetching customer details:', error);
        return undefined;
    }
};



export const getCustomerNonPurchasedCouponsApi = async () => {
    
        const response = await axiosWithToken.get(`${BASE_URL}all-non-purchased-coupons`);
        return response;

};