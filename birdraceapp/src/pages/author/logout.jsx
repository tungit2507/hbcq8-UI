import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('authToken'); 
    navigate('/login');
  };

  return (
    <a onClick={handleLogout}>
      Đăng Xuất
    </a>
  );
};  

export default Logout;
