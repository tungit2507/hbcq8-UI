import React from 'react';
import axios from 'axios';

import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { login } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
  


  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
      const { confirmPassword, ...formData } = data;
      try {
        const response = await axios.post('http://localhost:8080/api/v1/register', formData)
        .then(response => {
          console.log(response);
          dispatch(login(response))
          toast.success("Đăng Ký Thành Công");
          setTimeout(1000, navigate('/'));
        })
      } catch (error) {
          const errorCode = error.response.data.errorCode;
          const errorMessage = error.response.data.errorMessage;
          if(errorCode === '409'){
            toast.error(errorMessage);
          }else if(errorCode === '401'){
            toast.error(errorMessage);
          }else{
            toast.error('Có Lỗi Trong Quá Hoạt Động');
          }
      }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-5">Đăng Ký</h2>
          <div className="card my-5">
            <form id='register-form' className="card-body cardbody-color p-lg-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="text-center">
                <img
                  src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                  className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="70px"
                  alt="profile"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  {...register('username', { required: 'Tên người dùng là bắt buộc' })}
                  className="form-control"
                  placeholder="Tên người dùng"
                />
                {errors.username && <span className="error">{errors.username.message}</span>}
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email là bắt buộc', 
                    pattern: { value: /\S+@\S+\.\S+/, message: 'Email không hợp lệ' } 
                  })}
                  className="form-control"
                  placeholder="Địa chỉ email"
                />
                {errors.email && <span className="error">{errors.email.message}</span>}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  {...register('phone', { 
                    required: 'Số điện thoại là bắt buộc', 
                    pattern: { value: /^\d{10}$/, message: 'Số điện thoại phải có 10 chữ số' } 
                  })}
                  className="form-control"
                  placeholder="Số điện thoại"
                />
                {errors.phone && <span className="error">{errors.phone.message}</span>}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  {...register('password', { 
                    required: 'Mật khẩu là bắt buộc', 
                    minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' } 
                  })}
                  className="form-control"
                  placeholder="Mật khẩu"
                />
                {errors.password && <span className="error">{errors.password.message}</span>}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  {...register('confirmPassword', { 
                    validate: value => {
                      if (!value) return true;
                      return value === watch('password') || 'Mật khẩu không khớp';
                    }
                  })}
                  className="form-control"
                  placeholder="Xác nhận mật khẩu"
                />
                {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-color px-5 mb-5 w-100">
                  Đăng Ký
                </button>
              </div>
              <div id="emailHelp" className="form-text text-center mb-5 text-dark">
                Đã có tài khoản? Đăng nhập
                <Link to={'/login'}> tại đây</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored"
      />
    </div>
  );
};

export default RegistrationForm;
