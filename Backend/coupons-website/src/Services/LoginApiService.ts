import axios from 'axios';
import globalUrlService from './GlobalUrlService';
import { LoginRequestModel } from '../Models/LoginRequestModel';
import { LoginReponseModel } from '../Models/LoginResponseModel';
import store from '../Redux/Store';
import { login } from '../Redux/AuthSlice';

const LOGIN_URL = globalUrlService.getBaseUrl() + "api/login";

export const loginApi = async (loginRequest: LoginRequestModel) => {
        const response = await axios.post(`${LOGIN_URL}`, loginRequest);
        const data : LoginReponseModel = response.data;
        store.dispatch(login(data));
        return response;
};