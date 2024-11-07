// src/api/axiosConfig.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.log(error.response.data.status == 401);
    if(error.response.data.status == 401){
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
