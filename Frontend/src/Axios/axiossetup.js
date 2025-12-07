import axios from 'axios';
import Cookies from 'js-cookie'; 
import { BASE_URL } from '../Utils/constant';

// const myBaseUrl='http://127.0.0.1:8000/api/';
const isDevelopment= import.meta.env.MODE === 'development'
const myBaseUrl = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY

const axiosAPI=axios.create({
  baseURL: BASE_URL,
  withCredentials:true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosAPI.interceptors.response.use(
  (response) => {
   
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    
    // Only refresh if 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
       

        const refreshResponse = await axiosAPI.post(
          "user/token/refresh",
          {}, // backend should read refresh from cookie
          { withCredentials: true }
        );

       
        return axiosAPI(originalRequest);
      } catch (refreshError) {
       
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);











export default axiosAPI;