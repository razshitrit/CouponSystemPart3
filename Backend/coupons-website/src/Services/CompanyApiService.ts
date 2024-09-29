import axios from 'axios';
import { CompanyModel } from '../Models/CompanyModel';
import globalUrlService from './GlobalUrlService';
import { CouponModel } from '../Models/CouponModel';
import { Category } from '../Models/Category';
import axiosInterceptor from './AxiosInterceptor';

const BASE_URL = globalUrlService.getBaseUrl() + "api/company/";
const axiosWithToken = axiosInterceptor;

export const createCouponApi = async (newCoupon: CouponModel) => {
        const response = await axiosWithToken.post(`${BASE_URL}coupon`, newCoupon);
        return response;
};

export const updateCouponApi = async (updatedCoupon: CouponModel) => {
        const response = await axiosWithToken.put(`${BASE_URL}coupon`, updatedCoupon);
        return response;
};  

export const deleteCouponApi = async (couponId: number) => {
        await axiosWithToken.delete(`${BASE_URL}coupon/${couponId}`);

};

export const getCompanyCouponsApi = async () => {
        const response = await axiosWithToken.get(`${BASE_URL}coupons`);
        return response;
};

export const getCompanyCouponsByCategoryApi = async (category: Category) => {
    try {
        if (category !== null) {
            const response = await axiosWithToken.get(`${BASE_URL}coupons/${category}`);
            return response.data as CouponModel[];
        } else {
            return await getCompanyCouponsApi(); //to add a token to ()
        }
    } catch (error) {
        console.error('Error fetching coupons by category:', error);
        return undefined;
    }
};

export const getCompanyCouponsByMaxPriceApi = async (maxPrice: number) => {
    try {
        if (maxPrice != null) {
            const response = await axiosWithToken.get(`${BASE_URL}coupons/${maxPrice}`);
            return response.data as CouponModel[];
        } else {
            return await getCompanyCouponsApi(); //to add a token to ()
        }
    } catch (error) {
        console.error('Error fetching coupons by max price:', error);
        return undefined;
    }
};

export const getCompanyDetailsApi = async () => {
    try {
        const response = await axiosWithToken.get(`${BASE_URL}details`);
        return response.data as CompanyModel;
    } catch (error) {
        console.error('Error fetching company details:', error);
        return undefined;
    }
};
