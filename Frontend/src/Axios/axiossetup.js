import axios from 'axios';
import Cookies from 'js-cookie'; 
import { BASE_URL } from '../Utils/constant';



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