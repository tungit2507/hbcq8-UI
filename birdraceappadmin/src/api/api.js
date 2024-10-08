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
    if (error.response) {
      if (error.response.status === 401) {
        const navigate = useNavigate();
        navigate('/login');
      } else if (error.response.status === 500) {
        alert('Server đang lỗi hoặc không hoạt động, vui lòng thử lại trong ít phút');
      }
    } else if (error.message === 'Network Error' && error.code === 'ERR_CONNECTION_REFUSED') {
      alert('Không thể kết nối đến server, vui lòng kiểm tra kết nối mạng của bạn');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
