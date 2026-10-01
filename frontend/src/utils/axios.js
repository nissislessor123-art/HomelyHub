//centeralized API setup

import axios from 'axios';
import qs from 'qs';//query skill

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,// 1 api configuration can be used through the application
    withCredentials: true,
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),//creats url friendly string
})

