import axios from "axios";
import { useNavigate } from 'react-router-dom';

const axioInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  withCredentials: true,
});

export default axioInstance;
