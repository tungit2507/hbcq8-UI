import React, { useState } from 'react';
import axioInstance from '../../apiInstance';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/main.css';
import CSSTransition from 'react-transition-group/CSSTransition';

const ChangePassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // Thêm biến trạng thái

  const onSubmit = async (data) => {
  };

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={300}
      classNames="fade"
    >
      <div id='login' className="container d-flex justify-content-center align-items-center vh-100">
        <div className="row w-100">
          <div className="col-md-6 offset-md-3">
            <div className="card my-5">
              <form id='login-form' onSubmit={handleSubmit(onSubmit)} className="card-body cardbody-color p-lg-5">
                <div className="text-center">
                  <img
                    src="./assets/img/logo/Logo_CLBBCQ8.png"
                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                    width="120px"
                    alt="profile"
                  />
                </div>
                <h2 className="text-center text-dark mt-3">Thay Đổi Mật Khẩu</h2>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="newPassword"
                    aria-describedby="emailHelp"
                    placeholder="Nhập mật khẩu mới của bạn."
                    {...register('newPassword', { required: 'Vui lòng nhập mật khẩu mới.' })}
                  />
                  {errors.newPassword && <p className="error">{errors.newPassword.message}</p>}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="confirmNewPassword"
                    aria-describedby="emailHelp"
                    placeholder="Xác nhận mật khẩu mới."
                    {...register('confirmNewPassword', { required: 'Vui lòng xác nhận lại mật khẩu mới.' })}
                  />
                  {errors.confirmNewPassword && <p className="error">{errors.confirmNewPassword.message}</p>}
                </div>
                
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-color px-5 mb-5 w-100" disabled={isSubmitting}>
                    Xác nhận mật khẩu
                  </button>
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
    </CSSTransition>
  );
};

export default ChangePassword;