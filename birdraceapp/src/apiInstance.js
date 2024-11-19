import axios from "axios";

const axioInstance = axios.create({
  baseURL: 'http://103.69.84.147:8080/api/v1',
  withCredentials: true,
});

axioInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.data?.status == 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axioInstance;
