import axios from 'axios';
import { CompanyModel } from '../Models/CompanyModel';
import { CustomerModel } from '../Models/CustomerModel';
import globalUrlService from './GlobalUrlService';
import axiosInterceptor from './AxiosInterceptor';

const BASE_URL = globalUrlService.getBaseUrl() + "api/admin/";
const axiosWithToken = axiosInterceptor;

export const createCompanyApi = async (newCompany: CompanyModel) => {
  try {
    const response = await axiosWithToken.post(`${BASE_URL}company`, newCompany);
    return response;
  } catch (error) {
    console.error('Error adding company:', error);
  }
};

export const updateCompanyApi = async (updatedCompany: CompanyModel) => {
  try {
    console.log(updatedCompany);
    const response = await axiosWithToken.put(`${BASE_URL}company`, updatedCompany);
  } catch (error) {
    console.error('Error updating company:', error);
  }
};

export const deleteCompanyApi = async (companyId: number) => {
  try {
    await axiosWithToken.delete(`${BASE_URL}company/${companyId}`);
  } catch (error) {
    console.error('Error delete company:', error);
  }
};

export const getCompaniesApi = async () => {
    const response = await axiosWithToken.get(`${BASE_URL}companies`);
    return response;
};


export const getSingleCompanyApi = async (companyId: number) => {
  try {
    const response = await axiosWithToken.get(`${BASE_URL}company/${companyId}`);
    return response.data as CompanyModel;
  } catch (error) {
    console.error('Error fetching single company:', error);
    return undefined;
  }
};


export const createCustomerApi = async (newCustomer: CustomerModel) => {
  try {
    const response = await axiosWithToken.post(`${BASE_URL}customer`, newCustomer);
    return response;
  } catch (error) {
    console.error('Error adding customer:', error);
  }
};

export const updateCustomerApi = async (updatedCustomer: CustomerModel) => {
  try {
    const response = await axiosWithToken.put(`${BASE_URL}customer`, updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
  }
};

export const deleteCustomerApi = async (customerId: number) => {
  try {
    await axiosWithToken.delete(`${BASE_URL}customer/${customerId}`);
  } catch (error) {
    console.error('Error delete customer:', error);
  }
};

export const getCustomersApi = async () =>{

    const response = await axiosWithToken.get(`${BASE_URL}customers`);
    return response;
 
  }
;

export const getSingleCustomerApi = async (customerId: number) => {
  try {
    const response = await axiosWithToken.get(`${BASE_URL}customer/${customerId}`);
    return response.data as CustomerModel;
  } catch (error) {
    console.error('Error fetching single customer:', error);
    return undefined;
  }
};



