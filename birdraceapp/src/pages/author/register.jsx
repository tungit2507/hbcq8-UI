import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-5">Đăng Ký</h2>
          <div className="card my-5">

            <form className="card-body cardbody-color p-lg-5">
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
                  id="Username"
                  aria-describedby="emailHelp"
                  placeholder="User Name"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Địa Chỉ Email"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Mật Khẩu"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Điền Lại Mật Khẩu"
                />
              </div>
              <div className="text-center">
                <button  type="submit" className="btn btn-primary btn-color px-5 mb-5 w-100">
                  Đăng Nhập
                </button>
              </div>
              <div id="emailHelp" className="form-text text-center mb-5 text-dark">
                Đã Có Tài Khoản? Đăng Nhập
                <Link to={'/login'} className=''> Tại Đây</Link>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
