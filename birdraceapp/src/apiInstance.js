import axios from "axios";
import { useNavigate } from 'react-router-dom';

const axioInstance = axios.create({
  baseURL: 'http://103.69.84.147:8080/api/v1',
  withCredentials: true,
});

export default axioInstance;
