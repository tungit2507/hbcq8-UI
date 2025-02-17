// src/api/axiosConfig.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'https://clbbcduaq8.com',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if(error.response.data.status == 401){
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
