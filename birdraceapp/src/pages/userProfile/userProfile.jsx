import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';

const Profile = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState('/assets/img/no-person-placeholder.webp');
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState(null); // Khởi tạo user là null

  const onSubmit = async (data) => {
    console.log(data);
    // Tạo một đối tượng FormData mới
    const formUserData = new FormData();
    
    // Thêm các trường dữ liệu vào formUserData, trừ trường image
    for (const key in data) {
      if (key !== 'image') {
        formUserData.append(key, data[key]);
      }
    }
    formUserData.append('image', "none");
    
    
    try {
      // Gửi dữ liệu đến server
      const response = await axios.post('http://localhost:8080/api/v1/user/update', formUserData);
      
      // Xử lý phản hồi từ server
      if (response.data) {
        toast.success('Cập nhật thông tin thành công');
        // Cập nhật thông tin người dùng trong localStorage
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        setUser(response.data);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin:', error);
      toast.error('Có lỗi xảy ra khi cập nhật thông tin');
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        console.log(user);
        setUser(user); // Lưu dữ liệu người dùng vào state
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('/assets/img/no-person-placeholder.webp');
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Hiển thị loading khi dữ liệu chưa được tải
  }

  return (
    <div className="container-xl px-4 mt-4 py-4">
      <hr className="mt-0 mb-4" />
      <div className="row">
        <div className="col-xl-4">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header text-center">Ảnh Đại Diện</div>
            <div className="card-body text-center">
              <label htmlFor="user-image" style={{ cursor: 'pointer' }}>
                <img 
                  className="img-account-profile rounded-circle mb-2"
                  src={imagePreview} 
                  alt="Profile" 
                  style={{ 
                    maxWidth: '150px', 
                    maxHeight: '150px', 
                    width: '100%', 
                    height: 'auto', 
                    objectFit: 'cover' 
                  }} 
                />
              </label>
              <input 
                type="file" 
                accept="image/*" 
                hidden 
                id="user-image"
                onChange={handleImageChange}
                {...register('image', { required: 'Vui Lòng Chọn Hình Ảnh' })}
              />
              <div className="small font-italic text-muted mb-4">
                {errors.image && <p className="text-danger">{errors.image.message}</p>}
              </div>
              <label className="btn btn-primary" htmlFor="user-image">Tải Ảnh Lên</label>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Thông Tin Chi Tiết</div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row gx-3 mb-3">
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                    <input 
                      className="form-control" 
                      id="inputEmailAddress" 
                      type="email" 
                      placeholder="" 
                      readOnly 
                      defaultValue={user.email} // Sử dụng defaultValue
                      {...register('email')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputPhonenumber">Số Điện Thoại</label>
                    <input 
                      className="form-control" 
                      id="inputPhonenumber" 
                      type="text" 
                      placeholder="Enter your phone number" 
                      defaultValue={user.phone} // Sử dụng defaultValue
                      {...register('phone', { 
                        required: 'Vui Lòng Nhập Số điện thoại', 
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Số điện thoại phải đủ 10 số'
                        }
                      })}
                    />
                    {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputBirthday">Ngày Sinh</label>
                    <input 
                      className="form-control" 
                      id="inputBirthday" 
                      type="date" 
                      name="birthday" 
                      defaultValue={user.birthday ? moment(user.birthday, 'DD-MM-YYYY').format('YYYY-MM-DD') : ''} // Sử dụng defaultValue và kiểm tra null
                      {...register('birthday', { required: 'Ngày sinh là bắt buộc' })}
                    />
                    {errors.birthday && <p className="text-danger">{errors.birthday.message}</p>}
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputLocation">Địa Chỉ</label>
                    <input 
                      className="form-control" 
                      id="inputLocation" 
                      type="text" 
                      placeholder="Enter your location" 
                      defaultValue={user.address} // Sử dụng defaultValue
                      {...register('address', { required: 'Địa chỉ là bắt buộc' })}
                    />
                    {errors.address && <p className="text-danger">{errors.address.message}</p>}
                  </div>
                </div>
                <button className="btn btn-primary" type="submit">Lưu Thông Tin</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' />
    </div>
  );
};

export default Profile;