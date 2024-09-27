import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Logout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (isLoggingOut) return; // Ngăn chặn spam logout
    setIsLoggingOut(true);
    try {
      await axios.get('http://localhost:8080/api/v1/logout', { withCredentials: true }); // Thêm withCredentials
      sessionStorage.setItem("isLoggedIn", false);
      sessionStorage.removeItem("currentUser");
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <a onClick={handleLogout} disabled={isLoggingOut}>
      {isLoggingOut ? 'Đang đăng xuất...' : 'Đăng Xuất'}
      <ToastContainer />
    </a>
  );
};

export default Logout;