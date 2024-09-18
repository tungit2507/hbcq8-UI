import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../redux/authSlice';



const LoginForm = () => {
 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/login', data)
      .then(response => {
        // save user to local storage
        let user = response.data;
        localStorage.setItem("currentUser", JSON.stringify(user) );
        localStorage.setItem("isLoggedIn", true); 
        // notify and navigate   
        toast.success("Đăng Nhập Thành Công");
        navigate('/')
      })
    } catch (error) {
      if (error.response && error.response.data) {
        const errorCode = error.response.data.errorCode;
        const errorMessage = error.response.data.errorMessage;
        if (errorCode === "401") {
          toast.error(errorMessage);
        }
      } else {
        const errorMessage = error.response.data.errorMessage;
        toast.error(errorMessage);
      }
    }
  };



  
  return (
    <div id='login' className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-5">Đăng Nhập</h2>
          <div className="card my-5">

            <form id='login-form' onSubmit={handleSubmit(onSubmit)} className="card-body cardbody-color p-lg-5">
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
                  className="form-control"
                  id="username"
                  aria-describedby="emailHelp"
                  placeholder="Tài Khoản"
                  {...register('username', { required: 'Tên đăng nhập là bắt buộc' })}
                />
                {errors.username && <p className="error">{errors.username.message}</p>}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Mật Khẩu"
                  {...register('password', 
                    { required: 'Mật khẩu là bắt buộc',
                      minLength: {
                        value: 5,
                        message: 'Mật khẩu phải có ít nhất 6 ký tự'
                      } 
                    }
                  )}
                />
                {errors.password && <p className="error">{errors.password.message}</p>}
              </div>
              <div className="text-center">
                <button  type="submit" className="btn btn-primary btn-color px-5 mb-5 w-100">
                  Đăng Nhập
                </button>
              </div>
              <div id="emailHelp" className="form-text text-center mb-5 text-dark">
                Chưa có tài khoản? Đăng ký
                <Link to={'/register'} className=''> tại đây</Link>
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

export default LoginForm;
