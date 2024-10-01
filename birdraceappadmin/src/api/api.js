// src/api/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://103.69.84.147:8080',
  withCredentials: true,
});

export default axiosInstance;
